---
title: "Code Generation for C#"
summary: "This article presents different code generation techniques for C# and compares them to Metalama."
keywords:
- c# code generator
- c# code generation
- c# generate code
---

{: .intro }
Metalama is the only tool that can simultaneously _override_ source code with generated code and allow source code to
reference generated code. Other approaches either only allow you to generate new files to your project or run _after_
the build. Additionally, Metalama features a unique, strongly-typed template technology, allowing you to author C#
templates easily with any C#-compatible code editor.

## Benefits

Here are four reasons why you _must_ consider suppressing repetitive code with a code generation tool:

* **Boost development productivity.** Using Metalama can reduce hand-written code by 10–50%, enabling developers to
  focus on meaningful tasks. Architects and senior developers act as productivity _multipliers_ by reducing repetitive
  and error-prone work for the rest of the team.

* **Reduce code complexity.** The separation of technical details from business logic results in cleaner, more readable
  code. New team members can contribute effectively without being overwhelmed by low-level technical details.

* **Improve reliability.** Fewer lines of code mean fewer defects. Lower complexity also contributes. Plus, using
  Metalama makes it easier to implement resilience features, further improving your app's productivity.

* **Reduce maintenance costs.** Metalama's ultimate advantage lies in reducing maintenance costs and extending the
  lifespan of the codebase. Given that maintenance accounts for 55%–95% of a software system's costs, keeping complexity
  low is crucial for post-release team member productivity.

## Key Features

### Override hand-written code

Most code generation techniques allow you to _add new classes_ to a project or to _extend partial classes_. However,
they don't let you inject new behaviors into existing methods, properties, or fields.

Metalama is the only on-the-fly tool that also allows you to add behaviors to existing hand-written code.

This ability is essential to implement features like instrumentation (logging, metrics), exception handling (retry,
throttling), observability (`INotifyPropertyChanged`), thread synchronization (locking), and so on.

{: .show-more }
Show me an example.

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

### Reference generated code from source code

With Metalama, your source code can reference generated code as if it were itself source code.

For instance, if an aspect implements the Memento pattern for the `Fish` class, source code will "see" that the class
implements the `IMementoable` interface and will be able to invoke the generated `SaveToMemento` and `RestoreMemento`
methods. Intellisense and design-time code verification will work normally.

This is a significant advancement from the previous MSIL-based generation, whose code additions were not visible from
source code.

{: .show-more }
Show me an example.

Suppose we have the following class in source code:

```cs
[Memento]
public sealed partial class Fish
{
    public string? Name { get; set; }
    public string? Species { get; set; }
    public DateTime DateAdded { get; set; }
}
```

The `[Memento]` aspect automatically implements the `IMementoable` interface, defined as follows:

```cs
public interface IMementoable
{
  IMemento SaveToMemento();
  void RestoreMemento( IMemento memento );
}
```

Another part of the source code can use the `IMementoable` interface and its two methods as if they were defined in
source code:

```cs
var fish = new Fish() { Name = "Hannibal", Species = "Tilapia" };

// Save by using the generated SaveToMemento method.
var memento = fish.SaveToMemento();

// Change
fish.Tilapia = "Shark";

// Undo change by using the generated RestoreMemento method.
fish.RestoreMemento(memento);
```

### Simple, strongly-typed template language

T# is a unique C#-to-C# template language. T# templates are pure C# methods and expressions and are 100% compatible with
any C# editor. T# templates only differ from normal C# methods in the way that they are compiled.

Thanks to T#, you can blend generated code with hand-written code.

Benefits of T# include:

- Keep your template code readable and get Intellisense assistance when coding.
- Generate high-performance code without any run-time overhead.
- Compatible with any C# editor.
- Additional syntax highlighting is available as a Visual Studio extension.

{: .show-more }
Show me an example.

For instance, let's consider this aspect:

```csharp
public class RetryAttribute : OverrideMethodAspect
{
    public override dynamic? OverrideMethod()
    {
        for ( var i = 0;; i++ )
        {
            try
            {
                return meta.Proceed();
            }
            catch ( Exception e ) when ( i < 3 )
            {
                Console.WriteLine( $"{meta.Target.Method} failed: {e.Message}" );
                Thread.Sleep( 100 );
            }
        }
    }
}
```

The `OverrideMethod` is a T# template:

- `meta.Proceed()` is replaced by the implementation of the method being overridden.
- `meta.Target.Method` is the object model of the method being overridden. In this case, we are calling the `ToString`
  method.

Now let's apply this template to a method:

```cs
[Retry]
public decimal GetExchangeRate()
{
    using var client = new HttpClient();
    var url = $"https://api.example.com/exchange?base=CZK&target=USD";

    var response = await client.GetAsync(url);
    response.EnsureSuccessStatusCode();

    var responseString = await response.Content.ReadAsStringAsync();
    return decimal.Parse(responseString);
}
```

During compilation, Metalama will apply the `[Retry]` template to the `GetExchangeRate` method and generate the
following code:

```cs
[Retry]
public decimal GetExchangeRate()
{
    for ( var i = 0;; i++ )
    {
       try
       {
            using var client = new HttpClient();
            var url = $"https://api.example.com/exchange?base=CZK&target=USD";

            var response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            return decimal.Parse(responseString);
        }
        catch ( Exception e ) when ( i < 3 )
        {
           Console.WriteLine( $"CurrencyService.GetExchangeRate() failed: {e.Message}" );
           Thread.Sleep( 100 );
        }
    }
}
```

### Report warnings and errors

Metalama is not just a code generation tool. It is a comprehensive meta-programming framework where units of behavior
are called _aspects_. Examples of aspects are `[Retry]`, `[Memento]`, or `[MeasureExecutionCount]`. Aspects don't only
encapsulate code generation but also code _validation_. For instance, the `[MeasureExecutionCount]` aspect relies on
dependency injection to pull the metrics object. Therefore, it can only be applied to non-static methods. Aspects in
Metalama also have the ability to validate code and report errors and warnings.

There are two validation mechanisms in Metalama. You can:

- _Define eligibility conditions_ on which declarations the aspect can be applied. When eligibility conditions are
  violated, an error is reported, and the aspect is not applied. Also, the refactoring menu in the IDE would only
  suggest adding eligible aspects.
- _Programmatically report warnings and errors_ when any situation occurs.

Both approaches can report warnings and errors immediately as you type or at the build.

{: .show-more }
Show me an example.

The following aspect makes two assumptions about the method to which it is applied:

- It assumes the method to be non-static, which is an eligibility condition.
- It requires the class to contain a field named `_logger` and will report an error if it does not.

```cs
internal class LogAttribute : OverrideMethodAspect
{
    private static readonly DiagnosticDefinition<INamedType> _error = new(
        "MY001",
        Severity.Error,
        "The type {0} must have a field named '_logger'." );

    public override void BuildEligibility( IEligibilityBuilder<IMethod> builder )
    {
        base.BuildEligibility( builder );

        builder.MustNotBeStatic();
    }

    public override void BuildAspect( IAspectBuilder<IMethod> builder )
    {
        base.BuildAspect( builder );

        if ( !builder.Target.DeclaringType.Fields.OfName( "_logger" ).Any() )
        {
            builder.Diagnostics.Report(
              _error.WithArguments( builder.Target.DeclaringType ) );
        }
    }

    public override dynamic? OverrideMethod()
    {
        meta.This._logger.WriteLine( $"Executing {meta.Target.Method}." );

        return meta.Proceed();
    }
}
```

### Immediate feedback as you type

Metalama executes both within the compiler process and the IDE. Your aspects are executed whenever a relevant change is
detected in the code. Therefore, you don't need to build your project to see warnings and errors or to reference
generated artifacts in your source code.

## How does it work?

Metalama ships as a [set of NuGet packages](https://www.nuget.org/packages?q=metalama).

The way the core technology integrates with the compiler differs between the design time and build time scenarios:

* At _design time_, i.e., when it runs within the IDE, Metalama works as a Roslyn plug-in and implements its standard
  extension points:
    - code generators,
    - analyzers,
    - diagnostic suppressors,
    - code fix and refactoring providers.

* At _compile time_, Metalama _replaces_ the Roslyn compiler with its own fork. This fork keeps 99.99% of the Roslyn
  code safe and intact. It only adds an extension point that allows replacing a syntax tree with another.

* Most of the Metalama logic is implemented using the standard public Roslyn API.

This architecture guarantees that Metalama remains compatible with all C# editors.

## Alternatives

There are many approaches to code generation in .NET, and Metalama is not necessarily the best choice for all use cases.
In particular, Metalama should _not_ be used to generate code based on a _slow_ source like a database or a web API.

### Pre-build scripts, programs, or tasks

When your code generation logic does not depend on the source code itself, it is convenient to write this as a
script-like C# program that simply writes its output with a `TextWriter`.

You can choose to execute the program upon different triggering events:

- On demand, if the input data does not change often. In this case, you should store the output in source control.
- As a [pre-build event](https://learn.microsoft.com/en-us/visualstudio/ide/how-to-specify-build-events-csharp).

<div class="row benefits">
<div class="col">

#### Benefits

- **Simple and familiar**. After all, it's just C#.
- **Very simple to debug**.
- When executed on demand, it can handle a slow generation process (such as generating code from a database schema)
  without affecting the build time.

</div>
<div class="col">

#### Inconveniences

- **No source code access**. The control logic cannot rely on your C# source code to generate code.
- **Cannot override hand-written code.** You can generate new files, but you cannot inject new logic into existing
  source code.
- **Purely text-based**. No error checking, syntax coloring, or syntax completion for generated code.
- **Not real-time**. You need to rebuild after modifying the source files to see new errors or use newly generated
  methods.

</div>
<div class="col">

#### Use cases

- Generate data objects from databases, XML schemas, or UML models.
- Generate service proxies for REST, SOAP, gRPC, or Web APIs.
- Generate C# wrappers for non-.NET libraries.

</div>
</div>

{: .info }
In theory, your script could also access the source code by loading it using
a [Roslyn workspace](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-workspace). However, in this
case, you might want to consider using Metalama or Roslyn code generators instead.

### T4 (Text Template Transformation Toolkit)

[T4](https://learn.microsoft.com/en-us/visualstudio/modeling/code-generation-and-t4-text-templates) is a Microsoft
technology for the generation of text files based on templates. T4 templates are a mixture of text blocks and control
logic that can generate a text file. The control logic is written as fragments of program code in C#. The generated file
can be text, such as a web page, a resource file, or program source code in any language. T4 uses a similar syntax as
ASP.NET WebForms, with control blocks delimited by `<%` and `%>`.

T4 templates can be executed as a pre-build event or on demand.

They are a special case of pre-build scripts and share the same benefits and inconveniences.

Writing a T4 template is more convenient than writing a pure C# program when there is relatively little control logic.
When the template is dominated by control logic, writing C# code is often more productive.

<div class="row benefits">
<div class="col">

#### Benefits

- **Simple**. The control logic is C#, with the familiar `<%` and `%>` delimiters.
- **Real-time feedback.** With an optional Visual Studio extension, templates can be automatically executed when the
  input file is modified.
- When executed on demand, it can handle a slow generation process (such as generating code from a database schema)
  without affecting the build time.

</div>
<div class="col">

#### Inconveniences

- **No source code access**. The control logic cannot rely on your C# source code to generate code.
- **Cannot override hand-written code.** You can generate new files, but you cannot inject new logic into existing
  source code.
- **Purely text-based**. No error checking, syntax coloring, or syntax completion for the non-control part of the code.

</div>
<div class="col">

#### Use cases

The same use cases as for pre-build scripts.

</div>
</div>

### MSIL Rewriting

Tools based on MSIL Rewriting run after the C# compiler. They decompile assembly written by the compiler, run it through
some plug-ins that generate new code into it, and compile it back to a binary assembly.

Examples of such tools include PostSharp and Fody.

MSIL rewriting was the only possible approach that allowed mixing generated logic with hand-written logic back in the
days when the C# compiler was a black box. We now consider MSIL Rewriting obsolete.

<div class="row benefits">
<div class="col">

#### Benefits

- **Code model access**. The generator can reflect the source code through decompilation.
- **Can override hand-written code.** Ability to add new behaviors to existing methods.

</div>
<div class="col">

#### Inconveniences

- **No generated code access.** Source code cannot reference generated classes or members.
- **No real-time feedback.** You need to rebuild after modifying the source files to see new errors.
- **Complex.** Unless a general-purpose AOP framework like PostSharp is used, it's difficult to implement generators
  using MSIL.

</div>
<div class="col">

#### Use cases

- General aspect-oriented programming (all aspects) with PostSharp.
- Limited aspect-oriented programming (decorators, interceptors, mixins) with Fody.
- INotifyPropertyChanged, contracts.

</div>
</div>

### Run-time generation

Instead of generating code at build time, you can do it at run time, typically during application start-up, using the
`System.Reflection.Emit` namespace.

Many well-known libraries, including different serializers and the `Regex` class, use this approach instead of using
`System.Reflection` alone to improve performance.

<div class="row benefits">
<div class="col">

#### Benefits

- **Partial code model access.** Control logic has partial access to the code model using `System.Reflection`. However,
  it cannot access the method bodies, but only the metadata.

</div>
<div class="col">

#### Inconveniences

- **Cannot override handwritten code.** Generators can only create new types.
- **AoT Incompatible.** Ahead-of-time (AoT) compilation, required by .NET Native, does not support
  `System.Reflection.Emit`.
- **Slower startup.** Emitting code at run time causes a performance overhead at each application startup.
- **Complex.** Must emit IL code.
- **No generated code access.** Source code cannot reference generated types.

</div>
<div class="col">

#### Use cases

- Generate dynamic proxies (Castle.DynamicProxy).
- Generate object mappers (AutoMapper).
- Generate serializers/deserializers.
- Generate `Regex` implementations.

</div>
</div>

### Roslyn Code Generators

Roslyn generators are plug-ins of the C# compiler that generate code based on the source code or other files in the
project. They are executed in real-time as you type code in the IDE, and at build time.

Before Roslyn generators existed, `System.Reflection.Emit` was the only "official" way to generate code based on source
code. The main problem was that this approach is not compatible with .NET Native and AoT. When Microsoft decided to
improve support for AoT in .NET, they had to improve the code generation scenario, and came up with Roslyn Code
Generators.


<div class="row benefits">
<div class="col">

#### Benefits

- **Full source code access.** The generator logic can inspect the whole source code.
- **Real-time feedback.** The new code is generated immediately as you type.
- **Generated code access.** Source code can reference generated classes or members, with full support for IntelliSense.

</div>
<div class="col">

#### Inconveniences

- **Cannot override handwritten code.** Generators can only create new types or extend existing `partial` ones.
- **Cannot report errors or warnings.** Roslyn code generators have no mechanism to report errors or warnings. A
  separate Roslyn analyzer must be created.
- **Complex.** The Roslyn code generator is a low-level one optimized for performance. Implementing complex generation
  logic with this API can be tricky.
- **Purely text-based.** No error checking, syntax coloring, or syntax completion for generated code.

</div>
<div class="col">

#### Use cases

- Native AoT readiness: Regex, ASP.NET request handlers, serialization/deserialization, ...
- Generate C# code from other source languages (XAML, Blazor/CSHTML).

</div>
</div> 

## Comparison

Let's now summarize the abilities and limitations of the different approaches to code generation for C#:

| Feature | Metalama | Pre-build script, T4 | MSIL Rewriting | Run-time | Roslyn generators |
|-----------|---------------|---|
| Can reference source code from the generator | Yes | No | Yes | Yes | Yes |
| Can reference generated code from source code | Yes | Yes | No | No | Yes |
| Gives immediate feedback as you type | Yes | No | No | No | Yes |
| Can override handwritten code | Yes | No | Yes | No | No |
| Offers simple, strongly-typed template language | Yes | No | No | No | No |
| Can report errors and warnings to source code | Yes | No | Yes | No | No |

## And generative AI?

Generative AI (GenAI) is often cited as a code generation technology, but it plays a totally different role.

The most significant difference between GenAI and the code generation tools we are discussing in this article is that *
*code generated by GenAI must be maintained as source code**. In this article, we are talking about techniques that
generate throw-away code--code that never needs to be maintained.

Since most of the total cost of ownership of a codebase comes from maintenance and not its initial writing, GenAI is not
a replacement for code generation tools, but rather for handwriting code.

GenAI is a wonderful way to get a quick and dirty solution in a language or area you don't master, but it is not a
replacement for code generation tools.
