---
title: Dependency Injection
summary: "Metalama integrates dependency injection with aspect-oriented programming, enhancing testability and supporting multiple frameworks like `Microsoft.Extensions.DependencyInjection`."
---

{: .intro }
Metalama offers built-in support for dependency injection. Aspects can introduce dependencies, which are automatically injected into the class where the aspect is applied. Many frameworks are supported.

There's a common misconception that aspect-oriented programming and dependency injection are competing paradigms. In reality, they complement each other. While these concepts were formalized in the early 2000s and weren't initially designed to work together, Metalama, redesigned in the 2020s, seamlessly integrates both ideas.

## Benefits

* **Enhanced testability.** One of the primary benefits of dependency injection is improved testability. It allows you to provide different service implementations for testing and production environments. Unlike other aspect frameworks, Metalama fully supports this approach, enabling you to make your code as testable as needed.

* **Support for multiple DI frameworks.** Metalama natively supports the `Microsoft.Extensions.DependencyInjection` namespace and the _service locator_ pattern. Additionally, you can implement support for other frameworks. Thanks to an abstraction layer, your aspects don't need to be tightly coupled to a specific dependency injection framework.

## Example

Suppose our source code looks like this. We are adding a `[Log]` attribute to the `ExecuteAsync` method.

```csharp
class Worker : BackgroundService
{
    [Log]
    protected override Task ExecuteAsync( CancellationToken stoppingToken )
    {
        Console.WriteLine( "Hello, world." );

        return Task.CompletedTask;
    }
}
```

The `Worker` class would be transformed into the following code:

```csharp
class Worker : BackgroundService
{
    ILogger _logger;

    public Worker( ILogger<Worker> logger )
    {
        this._logger = logger;
    }

    [Log]
    protected override Task ExecuteAsync( CancellationToken stoppingToken )
    {
        this._logger.LogDebug( "Executing Worker.ExecuteAsync" );

        Console.WriteLine( "Hello, world." );

        return Task.CompletedTask;
    }
}
```

## Resources

* Reference documentation: [Injecting dependencies into aspects](https://doc.metalama.net/conceptual/aspects/dependency-injection)
* Commented example: [Logging with DI](https://doc.metalama.net/examples/log/log-4)

