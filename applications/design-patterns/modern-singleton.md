---
title: "Modern Singleton Pattern"
---

The Classic Singleton pattern didn't age well. Indeed, it's considered an anti-pattern because it's hard to test and
incompatible with the whole Dependency Injection paradigm.

A modern approach to the Singleton pattern is to use a Dependency Injection container to manage the lifecycle of the
singleton instance (e.g. `IServiceCollection.AddSingleton`).

The main problem with the modern Singleton is that it's hard to enforce that the constructor is used only in the right
context, typically from the `Startup` code and from unit tests. Metalama can help
you [enforce architectural constraints](https://doc.postsharp.net/metalama/conceptual/architecture) and report
violations right in the code editor as warnings.

## Example

The following `PerformanceCounterManager` class is a modern Singleton example. It has a public constructor, but it's
registered as a Singleton in the DI container.

```cs
[Singleton]
public class PerformanceCounterManager : IPerformanceCounterManager
{
    private readonly ConcurrentDictionary<string, int> _counters = new();
    private readonly IPerformanceCounterUploader _uploader;

    public PerformanceCounterManager( IPerformanceCounterUploader uploader )
    {
        this._uploader = uploader;
    }

    public void IncrementCounter( string name )
        => this._counters.AddOrUpdate( name, 1, ( _, value ) => value + 1 );
}
```

The `[Singleton]` aspect reports warnings when any class other than `Startup` or a unit test attempts to call the
constructor.

```cs
class MetricsCollection( IPerformanceCounterUploader uploader )
{
    // WARNING! The class is a [Singleton].
    PerformanceCounterManager _performanceManager = new( uploader );
}
```

{: .show-more }
Show me how it works!

Here is the code of the `[Singleton]` aspect:

```cs
public class SingletonAttribute : TypeAspect
{
    public override void BuildAspect( IAspectBuilder<INamedType> builder )
    {
        builder.Outbound
            .SelectMany( t => t.Constructors )
            .CanOnlyBeUsedFrom(
                scope => scope.Type( typeof(Startup) ).Or().Namespace( "**.Tests.**" ),
                description: "The class is a [Singleton]." );
    }
}
```

## Metalama benefits

* **Reduce human errors**. You can be confident that no improper code is calling the constructor directly instead of
  getting an instance from the DI container.

## Resources

* Blog post: [The Singleton Pattern in C# Today Is Not Your Dad's One!](https://blog.postsharp.net/singleton)
* Example: [Validating the modern Singleton](https://doc.postsharp.net/metalama/examples/singleton/singleton-2)