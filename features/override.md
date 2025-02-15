---
title: Add Behaviors to Hand-Written Code
toc: false
---

Most code generation techniques allow you to _add new classes_ to a project or to _extend partial classes_. However,
they don't let you inject new behaviors into existing methods, properties, or fields.

Metalama is the only on-the-fly tool that also allows you to add behaviors to existing hand-written code.

This ability is essential to implement features like instrumentation (logging, metrics), exception handling (retry,
throttling), observability (`INotifyPropertyChanged`), thread synchronization (locking), and so on.

## Example

Suppose you have this source code:

```cs
public class HatShop
{
    private int _executionCount;

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

We want to measure the number of executions of all public methods in our project, so we add this fabric:

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

The `[MeasureExecutionCount]` will transform the `HatShop` class into this:

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
    this._hatShopMetrics?.PlaceOrderExecutionCount.Add(1);

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
```

As you can see, not only does it add new members like the `HatShopMetrics` class and field, but it also has to inject
logic into the `PlaceOrder` method.