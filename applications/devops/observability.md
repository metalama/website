---
title: "Intrumentation & Observability"
summary: "This article details how Metalama can help instrument C# applications to make them more observable in production by adding logging, tracing, exception handling, and metrics"
keywords:
- .net instrumentation
- .net core instrumentation
- c# exception handling
- c# metrics
---

{: .intro }
*Observability* is the ability to monitor the internal state of a system by looking at its outputs, metrics, traces, and
logs. Implementing observability manually requires a lot of redundant code, making the business code less readable.
Metalama helps keep the observability logic separate from your business code without redundancy.

The most common instrumentation is [logging and tracing](logging), covered in a [separate article](logging). In this
article, we cover two more techniques: enriching exception stacks with parameter values (very useful to reproduce bugs)
and adding performance metrics.

## Enriching exception stacks

In diagnosing software problems, context is everything. Exception call stacks are a good example of this context, but
they are not enough: they lack parameter values that give you an idea of the application state.

You can use an aspect to **append the parameter values** to any `Exception` flying through your method. When reporting
the exception, you can add the parameter values to the call stack.

### Example

Suppose we have the following exception:

```text
System.NullReferenceException: Object reference not set to an instance of an object
   at CustomerService.GetCustomerCreationDate(Int32)
   at HomeController.Index()
   ...
```

To continue your investigation, you would need to know for which value of `customerId` the `GetCustomer` method returns
`null`.

You create an `EnrichExceptionAttribute` aspect that automatically wraps the whole method body in a try-catch block and
enriches the exception with the parameter values. You
can [see the full code of that aspect here](https://doc.postsharp.net/metalama/examples/exception-handling/enrich-exception#aspect-code).

However, solely defining an aspect is not enough. You need to apply it to all your methods, so you add this class to
your project:

```csharp
internal class Fabric : ProjectFabric
{
    public override void AmendProject(IProjectAmender amender) =>
        amender
            .SelectTypes()
            .SelectMany(type => type.Methods)
            .AddAspectIfEligible<EnrichExceptionAttribute>();
}
```

Now, instead of just reporting `exception.ToString()`, you can append the result of `exception.GetContextInfo()` to get
the following exception stack:

```text
System.NullReferenceException: Object reference not set to an instance of an object
   at CustomerService.GetCustomerCreationDate(Int32)
   at HomeController.Index()
   ...
with
  CustomerService.GetCustomerCreationDate(123)
```

Now you see (at the bottom of the block) for which value of `customerId` your code fails.

{: .show-more }
Show me how it works!

The problematic code is the following:

```csharp
public string GetCustomerCreationDate( int customerId )
    => _customerDb.GetCustomer( customerId ).CreationData;
```

When you build the project, the fabric added
the [EnrichException](https://doc.postsharp.net/metalama/examples/exception-handling/enrich-exception#aspect-code)
aspect to any public method, including this one. Therefore, instead of your source code, the following code is executed:

```cs
public string GetCustomerCreationDate( int customerId )
{
  try
  {
    return _customerService.GetCustomer( customerId ).CreationData;
  }
  catch (Exception e)
  {
    e.AppendContextFrame($"CustomerService.GetCustomerCreationDate({customerId})");
    throw;
  }
}
```

In this example, the `AppendContextFrame` is just a method that appends the parameter values to the exception message,
providing additional context information that can help developers quickly identify the cause of the error.

### Metalama benefits

- **You can just do it!** You would probably not be willing to implement this trick if it were not _free_. With
  Metalama, you can just do it.
- **Clean code.** The exception handling code is generated on-the-fly during compilation, so your code remains crystal
  clear and is easier to maintain.
- **Easily add or remove.** You can add or remove the feature at any time. You can also enable logging only in select
  build configurations.

### Resources

*
Example: [Enriching exceptions with parameter values](https://doc.postsharp.net/metalama/examples/exception-handling/enrich-exception)

---

## Metrics

.NET applications can be instrumented using the `System.Diagnostics.Metrics` APIs to track important metrics. Some
metrics are included in standard .NET libraries, but you may want to add new custom metrics that are relevant for your
applications and libraries.

You can use a Metalama aspect to add metrics that are relevant to the execution of a method, for instance:

- number of executions,
- number of failures,
- total execution time

### Example

You can add metrics to code using custom attributes:

```cs
public class HatShop
{
    private int _executionCount;

    [MeasureExecutionCount]
    [MeasureExecutionTime]
    [MeasureExceptionCount]
    public void PlaceOrder()
    {
        this._executionCount++;

        if ( this._executionCount % 10 == 0 )
        {
            throw new Exception();
        }
        else
        {
            Console.WriteLine( "Ordering a hat." );
        }
    }
}
```

Alternatively, if you want to add metrics to several methods (for instance, all public methods) but don't want to add a
custom attribute to each of them, you can also add the metrics using a fabric:

```csharp
internal class Fabric : ProjectFabric
{
    public override void AmendProject(IProjectAmender amender) =>
        amender
            .SelectTypes()
            .Where(type => type.Accessibility == Accessibility.Public)
            .SelectMany(type => type.Methods)
            .Where(method => method.Accessibility == Accessibility.Public)
            .AddAspectIfEligible<MeasureExecutionCountAttribute>();
}
```

The metric aspects will generate new classes that define the metrics. For instance, for `HatShop`, it will generate
`HatShopMetrics`. It will also generate an `IServiceCollection` extension method to add these metrics to your apps:

```csharp
services.AddMetrics();
services.AddAutoGeneratedMetrics();
```

{: .show-more }
Show me how it works!

The aspects first generate the `HatShopMetrics` class:

```csharp
public class HatShopMetrics
{
    internal readonly Counter<long> PlaceOrderExceptionCount;
    internal readonly Counter<long> PlaceOrderExecutionCount;
    internal readonly Counter<long> PlaceOrderExecutionTime;
    private IMeterFactory _meterFactory;
    private IMetricHost _metricHost;
    public HatShopMetrics(IMeterFactory meterFactory, IMetricHost metricHost )
    {
        this._meterFactory = meterFactory ?? throw new System.ArgumentNullException(nameof(meterFactory));
        this._metricHost = metricHost ?? throw new System.ArgumentNullException(nameof(metricHost));

        var meter = _meterFactory.Create(_metricHost.ApplicationName, _metricHost.ApplicationVersion, _metricHost.Tags);
        this.PlaceOrderExceptionCount = meter.CreateCounter<long>("PlaceOrder.ExceptionCount");
        this.PlaceOrderExecutionCount = meter.CreateCounter<long>("PlaceOrder.ExecutionCount");
        this.PlaceOrderExecutionTime = meter.CreateCounter<long>("PlaceOrder.ExecutionTime");
    }
}
 ```

It then modifies the `HatShop` class in two ways:

1. It pulls the `HatShopMetrics` dependency, and
2. It instruments the target methods.

```csharp
public class HatShop
{
  private HatShopMetrics _hatShopMetrics;
  private int _executionCount;

  public HatShop(HatShopMetrics hatShopMetrics = null)
  {
    this._hatShopMetrics = hatShopMetrics;
  }

  public void PlaceOrder()
  {
    var timestamp = Stopwatch.GetTimestamp();

    try
    {
      this._hatShopMetrics?.PlaceOrderExecutionCount.Add(1);

      try
      {
          this._executionCount++;
          if (this._executionCount % 10 == 0)
          {
             throw new Exception();
          }
          else
          {
             Console.WriteLine("Ordering a hat.");
          }
      }
      catch
      {
        this._hatShopMetrics?.PlaceOrderExceptionCount.Add(1);
        throw;
      }
      return;
    }
    finally
    {
      this._hatShopMetrics?.PlaceOrderExecutionTime.Add(Stopwatch.GetTimestamp() - timestamp);
    }
  }
}
```

We have a lot of additional code here because there are three metrics.

It also generates the `IServiceCollection` extension method:

```csharp
public static class MetricRegistrations
{
    public static void AddAutoGeneratedMetrics(this ServiceCollection serviceCollection)
    {
        serviceCollection.AddSingleton(typeof(HatShopMetrics));
    }
}
```

### Resources

- Example: [Metalama.Samples.Metrics](https://github.com/postsharp/Metalama.Samples/tree/develop/2025.0/examples/metrics)
