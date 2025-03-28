---
title: Enhance Hand-Written Code
toc: false
---

{: .intro }
Metalama is the only C# generator that also allows you to add behaviors to existing hand-written code. Other tools allow you to _add new classes_ to a project or to _extend partial classes_, but don't let you inject new behaviors into existing methods, properties, or fields. 

## Benefits

* It's the only way to implement features like instrumentation (logging, metrics), exception handling (retry, throttling), observability (`INotifyPropertyChanged`), thread synchronization (locking), and so on.
* Transparent. No need for the `partial` keyword.

## Example

Suppose you have this source code:

```cs
public class HatShop
{
    public void PlaceOrder()
    {
        Console.WriteLine( "Ordering a hat." );
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
  // This field is added by the aspect.
  private HatShopMetrics _hatShopMetrics;

  // This constructor is added by the aspect. It pulls the dependency.
  public HatShop(HatShopMetrics hatShopMetrics = null)
  {
    this._hatShopMetrics = hatShopMetrics;
  }

  public void PlaceOrder()
  {
    // This line of code is added by the aspect.
    this._hatShopMetrics?.PlaceOrderExecutionCount.Add(1);

    // This is the original source code.
    Console.WriteLine("Ordering a hat.");
  }
}
```

As you can see, not only does it add new members like the `HatShopMetrics` class and field, but it also has to inject
logic into the `PlaceOrder` method.

## Resources

* Reference documentation: [Creating simple aspects](https://doc.metalama.net/conceptual/aspects/simple-aspects)