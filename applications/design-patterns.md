---
title: "Design Patterns"
summary: "This article details how Metalama can help implementing design patterns in C# including the Memento, Singleton, Factory, Builder, Decorator, and Proxy patterns."
keywords:
- c# design patterns
- c# memento pattern
- c# singleton pattern
- c# factory pattern
- c# builder pattern
- c# decorator pattern
- c# proxy pattern
---

{: .intro }
Design patterns are repetitive _by design_. The more your pattern implementations are regular and predictable, the more
you can reduce the cognitive complexity of your codebase. If it's repetitive, it can be automated! Metalama can help
implement design patterns in two ways:

* **Code generation.** Sometimes patterns require so much repetitive code, with almost no creativity required, that it's
  possible to algorithmically generate the required code. Good examples of this are the Memento or Builder patterns.

* **Code verification.** For some other patterns, there are fewer opportunities to generate code. However, we still want
  to verify that handwritten code complies with the design pattern rules. And we can also use Metalama for this. See,
  for instance, the modern Singleton and Abstract Factory patterns.

{ #memento }

## Memento pattern

The Memento pattern is the classic behavioral design pattern to use when you want to capture the internal state of an
object without violating its encapsulation. It allows you to save the state of an object and later restore it. The
Memento pattern is useful in many scenarios, such as implementing undo/redo functionality, saving and restoring the
state of an object, or saving the state of an object to a file.

As the Memento pattern has a lot of boilerplate code, it is a good candidate for being created automatically by
Metalama.

### Example

In the following example, the `[Memento]` custom attribute is all you need to implement the Memento pattern on the
`Fish` class.

```cs
[Memento]
public sealed partial class Fish
{
    public string? Name { get; set; }
    public string? Species { get; set; }
    public DateTime DateAdded { get; set; }
}
```

The aspect implements the `IMementoable` interface, including its `SaveToMemento` and `RestoreMemento` methods.

```cs
var fish = new Fish() { Name = "Hannibal", Species = "Tilapia" };

// Save
var memento = fish.SaveToMemento();

// Change
fish.Tilapia = "Shark";

// Undo change
fish.RestoreMemento(memento);
```

{: .show-more }
Show me how it works!

The aspect, once applied, will create an internal `Memento` class to capture the state of the `Fish` class. The `Fish`
class will also have a `SaveToMemento` method and a `RestoreMemento` to save and restore the state of the `Fish` object.

```cs
public partial class Fish : IMementoable
{
  public void RestoreMemento(IMemento memento)
  {
    var typedMemento = (Memento) memento;
    this.Name = typedMemento.Name;
    this.Species = typedMemento.Species;
    this.DateAdded = typedMemento.DateAdded;
  }

  public IMemento SaveToMemento()
   => new Memento(this);

  private class Memento: IMemento
  {
    public Memento(Fish originator)
    {
      this.Originator = originator;
      this.Name = originator.Name;
      this.Species = originator.Species;
      this.DateAdded = originator.DateAdded;
    }

    public string? Name { get; }
    public string? Species { get; }
    public DateTime DateAdded { get; }
    public IMementoable? Originator { get; }
  }
}
```

You can find the complete `Memento` aspect source
code [here](https://doc.postsharp.net/metalama/preview/examples/memento/memento-1#complete-aspect).

### Metalama benefits

* **Increase your productivity**: The pattern requires a lot of boilerplate code. Instead of writing it manually, an
  aspect can handle it for you so you can focus exclusively on your business logic.
* **Keep your code consistent**: The generated code is always consistent with the pattern rules.
* **Enhance maintainability**: The generated code will always be up-to-date; you'll never forget to update the Memento
  class when you add a new property to the *Mementoable* class.

### Resources

* Blog post: [The Memento Design Pattern in C#, Practically With Examples [2024]](https://blog.postsharp.net/memento)
* Example: [Implementing the Memento pattern without boilerplate](https://doc.postsharp.net/metalama/examples/memento)

---

## Classic Singleton pattern

It's arguably one of the most famous creational design patterns. It focuses on ensuring that a class has only one
instance and provides a global point of access to that instance.

### Example

The following `PerformanceCounterManager` class is a classic Singleton example; it should consistently gather
performance counters across an entire application. The `[Singleton]` class attribute that indicates it's a Singleton
also is an aspect that can
be [developed using Metalama](https://doc.postsharp.net/metalama/examples/singleton/singleton-1#aspect-implementation).
It generates a static `Instance` property and reports an error if there is a public constructor. If needed, it also
creates a private constructor.

```cs
[Singleton]
public partial class PerformanceCounterManager
{
    private readonly ConcurrentDictionary<string, int> _counters = new();

    public void IncrementCounter(string name)
        => this._counters.AddOrUpdate(name, 1, (_, value) => value + 1);
}
```

We can now use the `Instance` property from anywhere.

{: .show-more }
Show me how it works!

The `[Singleton]` aspect generates the following code:

```cs
public partial class PerformanceCounterManager
{
    public static PerformanceCounterManager Instance { get; } = new();
    private PerformanceCounterManager() {}
}
```

### Metalama benefits

* **Better expressiveness**. The `[Singleton]` attribute makes the intent of the class clear and explicit. It's easier
  to understand the code and to maintain it.
* **Code consistency**. The generated code is always consistent with the pattern rules. Although the Singleton pattern
  has very little repetitive code, it is easy to forget to make the constructor private or call the Instance method in
  the same way.
* **Less code**. You're just saving two lines of code thanks to this aspect, so boilerplate reduction will not be your
  main motivation.

### Resources

* Example: [Classic Singleton](https://doc.postsharp.net/metalama/examples/singleton/singleton-1)

---

## Modern Singleton pattern

The Classic Singleton pattern didn't age well. Indeed, it's considered an anti-pattern because it's hard to test and
incompatible with the whole Dependency Injection paradigm.

A modern approach to the Singleton pattern is to use a Dependency Injection container to manage the lifecycle of the
singleton instance (e.g. `IServiceCollection.AddSingleton`).

The main problem with the modern Singleton is that it's hard to enforce that the constructor is used only in the right
context, typically from the `Startup` code and from unit tests. Metalama can help
you [enforce architectural constraints](https://doc.postsharp.net/metalama/conceptual/architecture) and report
violations right in the code editor as warnings.

### Example

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

### Metalama benefits

* **Reduce human errors**. You can be confident that no improper code is calling the constructor directly instead of
  getting an instance from the DI container.

### Resources

* Blog post: [The Singleton Pattern in C# Today Is Not Your Dad's One!](https://blog.postsharp.net/singleton)
* Example: [Validating the modern Singleton](https://doc.postsharp.net/metalama/examples/singleton/singleton-2)

---

## Factory patterns

The Factory and Abstract Factory are creational design patterns used to create objects without exposing the creation
logic to the client. The main difference between the Factory and Abstract Factory is that the Factory pattern is a
single method that creates objects, while the Abstract Factory is a super-factory that creates other factories.

Although Metalama can be used to create a Factory aspect that generates a factory method for a class (or even an
Abstract Factory class), it's generally not worth the effort unless you have a large number of highly trivial factories
that just call the constructor.

Instead, you can use [Metalama Architecture Verification](https://doc.postsharp.net/metalama/conceptual/architecture) to
verify that no code except the factories directly calls the constructor. By doing this, you're making the design intent
_explicit_ and _executable_, reporting warnings in real-time in case of violation.

### Example

Suppose we have a base interface `IShape` and want to verify that only the `ShapeFactory` class can create instances of
the interface. We can add a `[UseFactory]` aspect to it.

```cs
[UseFactory( typeof(ShapeFactory) )]
public interface IShape
{
    public Color Color { get; }
}
```

It automatically applies to derived types:

```csharp
public class Circle : IShape
{
    public Circle( double radius, Color color )
    {
        Radius = radius;
        Color = color;
    }

    public double Radius { get; }
    public Color Color { get; }
}
```

We now get a warning whenever we try to directly use the constructor:

```csharp
Drawing CreateDrawing()
{
    // WARNING! Use ShapeFactory to get an instance of this class.
    var circle = new Circle( 1.1, Color.Red );

    return new Drawing { circle };
}
```

{: .show-more }
Show me how it works!

The `UseFactoryAttribute` class is an inheritable aspect that verifies that constructors of derived types are used only
from a given type or from a unit test.

```cs
[Inheritable]
internal class UseFactoryAttribute : TypeAspect
{
   private readonly Type _factoryType;

   public UseFactoryAttribute( Type factoryType )
   {
      this._factoryType = factoryType;
   }

    public override void BuildAspect( IAspectBuilder<INamedType> builder )
        => builder.Outbound.SelectMany( t => t.Constructors )
            .CanOnlyBeUsedFrom(
                scope => scope.Namespace( "**.Tests" )
                    .Or()
                    .Type( this._factoryType ),
                $"Use '{this._factoryType.Name}' to get an instance of this class." );
}
```

### Metalama benefits

* **Reduce human errors**. You can be confident that no rogue code is calling the constructor directly instead of
  getting an instance from the DI container.

![](images/factory-validation.png)

### Resources

* Blog post: [The Factory design pattern in C#](https://blog.postsharp.net/factory-pattern)

---

## Builder pattern

The Builder pattern is a creational design pattern that allows you to construct complex objects step by step. It is
especially useful when you need to create an immutable object with many optional parameters or properties. A variant of
this pattern, the Abstract Builder, allows adding abstraction to the construction process.

The inconvenience of the Builder pattern is the sheer amount of repetitive code required to implement it. This can be
all but eliminated thanks to a Metalama aspect.

### Example

In the following example, we will use the `Song` class for the Builder pattern. The `Song` class has two required
properties (`Artist` and `Title`) and two optional properties (`Duration` and `Genre`).

```cs
[GenerateBuilder]
public partial class Song
{
    [Required] public string Artist { get; }
    [Required] public string Title { get; }
    public TimeSpan? Duration { get; }
    public string Genre { get; } = "General";
}
```

The `GenerateBuilder` aspect generates all the necessary code on the fly. We can use the `Song` class as follows:

```cs
var songBuilder = new Song.Builder( "Joseph Kabasele", "Indépendance Cha Cha" );
songBuilder.Genre = "Congolese rumba";
var song = songBuilder.Build();
```

{: .show-more }
Show me how it works!

The [GenerateBuilder](https://doc.postsharp.net/metalama/examples/builder) aspect generates a `Builder` class nested
inside the `Song` class and a `ToBuilder` method to create a new `Builder` object.

```cs
public partial class Song
{

  public Builder ToBuilder() => new Builder(this);

  public class Builder
  {
    public Builder(string artist, string title)
    {
      Artist = artist;
      Title = title;
    }

    internal Builder(Song source)
    {
      Artist = source.Artist;
      Title = source.Title;
      Duration = source.Duration;
      Genre = source.Genre;
    }

    public string Artist { get; set; }
    public TimeSpan ? Duration { get; set; }
    public string Genre { get; set; } = "General";
    public string Title { get; set; }

    public Song Build()
    {
      var instance = new Song(Artist, Title, Duration, Genre) !;
      return instance;
    }
  }
}
```

That's a lot of boilerplate you want to avoid!

### Metalama benefits

* **Improve productivity**: Any generated code is code you don't have to write and maintain.
* **Reduce human errors**: Whenever you have to add new optional (or required) properties to the `Song` class, the
  aspect will take care of it. It's the best way to avoid having to remember to update the Builder class (manually
  adding new fields, properties, and the necessary mappings to move the value of that new Builder property to the Song
  class).

### Resources

* Blog post: [Implementing the Builder pattern with Metalama](https://blog.postsharp.net/builder-pattern-with-metalama)
* Example: [Implementing the Builder pattern without boilerplate](https://doc.postsharp.net/metalama/examples/builder)

---

## Decorator pattern

The Decorator pattern is a structural design pattern that allows you to add new behaviors to objects. It is a good
alternative to subclassing because it allows you to add new functionalities to objects without changing their structure.

Metalama seems like it was _invented_ to easily implement decorators. If you want to apply decorators _statically_ to
your code, just use
the [OverrideMethodAspect](https://doc.postsharp.net/metalama/api/metalama-framework-aspects-overridemethodaspect), [OverrideFieldOrPropertyAspect](https://doc.postsharp.net/metalama/api/metalama-framework-aspects-overridefieldorpropertyaspect),
or [OverrideEventAspect](https://doc.postsharp.net/metalama/api/metalama-framework-aspects-overrideeventaspect)
according to what you want to decorate.

If you want to _dynamically_ apply decorators at runtime, see the Proxy pattern.

### Example

The `Retry` aspect can be applied to a method as a custom attribute:

```cs
[Retry]
public void Send( Message message )
{
    Console.WriteLine( "Sending message..." );

    // Simulate unreliable message sending
    if ( ++this._sendCount % 3 == 0 )
    {
        Console.WriteLine( "Message sent successfully." );
    }
    else
    {
        throw new IOException( "Failed to send message." );
    }
}
```

Thanks to the `[Retry]` aspect, this method never fails!

{: .show-more }
Show me how it works!

The `[Retry]` aspect implements a decorator that retries the execution of a method upon exception:

```cs
internal class RetryAttribute : OverrideMethodAspect
{
    public int Attempts { get; set; } = 5;
    public double Delay { get; set; } = 1000;

    public override dynamic? OverrideMethod()
    {
        for ( var i = 0;; i++ )
        {
            try
            {
                return meta.Proceed();
            }
            catch ( Exception e ) when ( i < this.Attempts )
            {
                var delay = this.Delay * Math.Pow( 2, i + 1 );

                Console.WriteLine(
                    $"Method {meta.Target.Method.DeclaringType.Name}.{meta.Target.Method} has failed " +
                    $" on {e.GetType().Name}. Retrying in {delay / 1000} seconds... ({i + 1}/{this.Attempts})" );

                Thread.Sleep( (int) delay );
            }
        }
    }
}
```

### Metalama benefits

* **Use decorators everywhere**: With Metalama, we’re not limited to virtual or interface methods (such as with the
  Proxy pattern); we can intercept anything, even static private fields. This allows you to use the Decorator pattern
  throughout your code.
* **Keep your code clean**: It's a great way to add new functionalities to objects without changing their structure. It
  allows you to keep your code clean and maintainable.
* **Improve your code quality**: The generated code is always consistent with the design pattern rules. Every time you
  apply the aspect, you can be sure that the code is compliant with the Decorator pattern.

### Resources

* Blog post: [The Decorator Pattern in Modern C#](https://blog.postsharp.net/decorator-pattern)

---

## Proxy pattern

The Proxy pattern is a structural design pattern that lets you provide a substitute or placeholder for another object,
typically to add new behavior. In C#, the proxied object is generally represented by an interface, although it's also
possible to implement the pattern with virtual methods.

Implementing the Proxy pattern involves duplicating all interface members, which requires a lot of boilerplate code. The
proxy's added behavior can either be implemented separately in each of these members or can be abstracted. In this case,
the abstraction is called an _interceptor_.

There are three ways to generate proxy classes:

* By hand, which is affordable only with a low number of interfaces and members.
* Dynamically at runtime using libraries
  like [Castle DynamicProxy](https://github.com/castleproject/Core/blob/master/docs/dynamicproxy.md), which increases
  startup time and is not compatible with ahead-of-time compilation.
* Statically at build time using Roslyn source generators or Metalama.

### Example

Let's see how a proxy aspect could work in practice. This example is a slightly simplified version
of [this sample aspect](https://github.com/postsharp/Metalama.Samples/tree/release/2025.0/examples/Metalama.Samples.Proxy).

Suppose we have an implementation class `OrderService` that we cannot modify, but we want to add logging to it.

The `OrderService` implements the following interface:

```csharp
public interface IOrderService
{
   OrderId PlaceOrder(Order order);
   void CancelOrder(OrderId orderId);
}
```

We generate a static proxy using the following code:

```csharp
public class Fabric : ProjectFabric
{
    public override void AmendProject(IProjectAmender amender)
    {
        amender.SelectReflectionType(typeof(IOrderService)).GenerateStaticProxy();
    }
}
```

We can now use the proxy class as follows:

```csharp
var orderServiceProxy = new OrderServiceProxy(
    new OrderService(),
    new LoggingInterceptor());

orderServiceProxy.PlaceOrder(order);
```

{: .show-more }
Show me how it works!

Metalama generates the following code:

```csharp
public class OrderServiceProxy : IOrderService
{
    private IOrderService _intercepted;
    private IInterceptor _interceptor;

    public SomeProxy(IInterceptor interceptor, IOrderService intercepted)
    {
        _interceptor = interceptor;
        _intercepted = intercepted;
    }

    public OrderId PlaceOrder(Order order)
    {
        var args = Tuple.Create(order);
        return _interceptor.Invoke(ref args, Invoke, nameof(PlaceOrder));

        int Invoke(ref Tuple<Order> receivedArgs)
        {
            return _intercepted.PlaceOrder(receivedArgs.Item1);
        }
    }

    public void CancelOrder(OrderId orderId)
    {
        var args = Tuple.Create(orderId);
        _interceptor.Invoke(ref args, Invoke, nameof(CancelOrder));
        return;

        void Invoke(ref Tuple<Order> receivedArgs)
        {
            _intercepted.CancelOrder(receivedArgs.Item1, receivedArgs.Item2);
            return default;
        }
    }
}
```

An interceptor is a class implementing the following interface:

```csharp
public interface IInterceptor
{
    public TResult Invoke<TArgs, TResult>(
        ref TArgs args,
        InterceptorDelegate<TArgs, TResult> proceed,
        string methodName) where TArgs : struct, ITuple;
}
```

For logging, we might use this code:

```csharp
public interface LoggingInterceptor : IInterceptor
{
    public TResult Invoke<TArgs, TResult>(
        ref TArgs args,
        InterceptorDelegate<TArgs, TResult> proceed,
        string methodName) where TArgs : struct, ITuple
    {
        Console.WriteLine(
          $"Executing {methodName}({string.Join(", ", args.ToArray())})");
        return proceed(ref args);
    }
}
```

### Metalama benefits

* **Fast application startup.** Static proxies are generated at compile time instead of at runtime, so your application
  starts faster.
* **Compatible with AoT compilation.** No reflection is necessary at runtime.
* **No boilerplate code.** Unlike with the handwritten approach, you just have to write a single line of code.

### Resources

* Source
  code: [Metalama.Samples.Proxy](https://github.com/postsharp/Metalama.Samples/tree/release/2025.0/examples/Metalama.Samples.Proxy)
