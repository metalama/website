---
keywords: "architecture validation, architecture erosion"
summary: ""
---

# Architecture validation

## Stopping architecture erosion

### What is architecture erosion?

"*Software architecture erosion refers to the gap between the planned and actual architecture of a software system as
observed in its implementation... [It] can result in lower quality, increased complexity, and harder-to-maintain
software. As these changes happen, it becomes more and more difficult to understand the originally planned software
architecture*", Sean Barow.

Architecture erosion occurs when the planned architecture of a software system does not align with its actual
architecture during its implementation. Although the code can look clean at first sight, it is more complex than it
should be. This discrepancy may arise due to a lack of automatic validation of source code against architecture, design,
and pattern guidelines. Architecture erosion occurs when architecture is expressed in a non-executable form, such as
documentation.

As erosion intensifies, the architectural qualities of the codebase deteriorate, which can result in brittle code that
is challenging to repair or enhance. The **broken window syndrome** may also occur, which is the idea that visible signs
of neglect, unaddressed warnings, or other violations can encourage further neglect or disrepair. This can ultimately
lead to a further decline in overall code quality and an increase in technical debt.

### What does it cost to you?

Architecture erosion can have significant consequences on the quality and complexity of the software system, resulting
in increased costs and reduced productivity.

- **Increasing complexity.** As the architecture erodes, the codebase becomes more complex and less organized. This
  makes it increasingly difficult for developers to understand and modify the code. Keeping complexity down is the holy
  grail of any sizable software project. High complexity is a frequent source of bugs.

- **Cumulative technical debt:** Architecture erosion often leads to the accumulation of technical debt. This debt
  represents the cost of addressing issues that have been deferred or ignored due to time constraints or complexity.
  Over time, technical debt can compound, resulting in higher maintenance costs to address it.

- **Higher maintenance costs.** With time, the architecture no longer fulfills its role. A decrease in modularity and
  separation of concerns will cause a decrease in the ability of the architecture to respond to changes in requirements,
  increasing maintenance costs.

- **Failure to meet new requirements.** Ultimately, architecture decay may lead to the inability to implement new
  features in the codebase.

### What causes architecture erosion?

Researchers and practitioners have identified the following causes of architecture erosion:

- **Architecture design defects.** The architecture designed in the first phase of the project might be incorrect,
  forcing developers to work around it.
- **Inappropriate architecture changes.** When the project is in maintenance, new requirements may not be compatible
  with the original architecture. Unless the design is updated, developers will be forced to depart from the original
  architectural design.
- **Disconnection between architects and developers.** Developers may not be aware of the intended architecture,
  especially if they were not involved in the architecture team, if the architecture was incompletely documented, or
  simply not communicated to them.
- **Knowledge vaporization.** The initial developers may leave the team, taking their architectural knowledge with them.
  This cause is even more acute if the architecture is not properly documented.
- **Documentation decay.** Over time, as the codebase evolves, the existing architectural documentation may no longer
  accurately reflect the current state of the system. This discrepancy makes it harder for developers to rely on
  documentation for understanding and modifying the code.

### Learn more

To learn more about architecture erosion, check the following references:

* [Understanding architecture erosion: the practitioners’ perspective](https://arxiv.org/pdf/2103.11392)
* [Understanding software architecture erosion: A systematic mapping study](https://arxiv.org/pdf/2112.10934)

## Validating architecture with Metalama

Looking at the list above from some distance, we can see that **most of these causes would vanish if architecture were
delivered in executable form**.

If architecture were validated in real-time in the IDE, either the source code would be corrected or the architecture
adjusted, and the architecture would not degrade.

Thanks to Metalama, you can express architecture directly in C# and have it validated as you type in any C# editor. Your
rules will also be enforced at build time and in your CI/CD pipeline.

### Validating with custom attributes

With Metalama, you can communicate your architectural intent using custom attributes. Violations will be reported in
real-time straight in the IDE or at build time in your CI pipeline.

For instance, you
can [enforce a naming convention](https://doc.postsharp.net/metalama/conceptual/architecture/naming-conventions). In
this example, we require that any class implementing `IQuery` has a name that ends with `Query`:

```csharp
[DerivedTypesMustRespectNamingConvention( "*Query" )]
public interface IQuery
{
     IEnumerable<Item> Execute( QueryContext context );
}
```

You can also [define
_who_ is allowed to use your API](https://doc.postsharp.net/metalama/conceptual/architecture/usage). In this example,
anybody can use public members of `TextQuery`, but only the current namespace can use its internal members. And only the
`QueryFactory` class can call the constructor.

```csharp
[InternalsCanOnlyBeUsedFrom( CurrentNamespace = true )]
public class TextQuery : IQuery
{
    [CanOnlyBeUsedFrom( Types = [typeof(QueryFactory)] )]
    internal TextQuery( string query ) {}

    public IEnumerable<Item> Execute( QueryContext context ) { }

    internal void Print( StringBuilder stringBuilder ) { }
}
```

If anybody violates these rules, warnings will be immediately reported.

### Validating with fabrics

It's often more practical to express architecture rules with the full power of C# instead of using custom attributes.
Enter fabrics, code that executes within your IDE or compiler.

Use a _namespace fabric_ to validate the current namespace.

```csharp
namespace VerifiedNamespace
{
    internal class Fabric : NamespaceFabric
    {
        public override void AmendNamespace( INamespaceAmender amender )
        {
            amender.CanOnlyBeUsedFrom( r => r.Namespace( "Some.Other.Namespace" ) );
        }
    }
}
```

Here we are using a _project fabric_ to check that floating-point numbers are not used in the Invoicing namespace.

```csharp
internal class Fabric : ProjectFabric
{
    public override void AmendProject( IProjectAmender amender )
    {
        amender
            .SelectReflectionTypes( typeof(float), typeof(double) )
            .CannotBeUsedFrom(
                r => r.Namespace( "**.Invoicing" ),
                "Use decimal numbers instead." );
    }
}
```

## Benefits

Incorporating coded architecture verification into your development pipeline offers several benefits:

- **Stop architecture decay.** The code remains aligned with the defined blueprints. Your codebase keeps its initial
  architectural qualities, allowing for low maintenance costs and the ability to implement new requirements.

- **Reduce codebase complexity.** By validating not only the high-level architecture but also implementation patterns
  and other coding conventions, you further reduce the complexity of your codebase, making it easier to understand by
  software developers.

- **Immediate feedback.** Developers receive real-time notifications of issues while typing, eliminating the need to
  wait for the next build or code review.

- **Streamlined code reviews.** With fewer petty violations to address, code reviews become more efficient and less
  frustrating. By addressing most minor issues in real-time, code reviews can focus on essential aspects.

## Features

- **Custom attributes.** Express architecture rules using custom attributes when it makes sense to hand-pick the
  constrained declarations.
- **Constraint inheritance.** Architecture rules can be automatically inherited to derived classes or overriding
  members.
- **Fabrics.** Run validation rules using a fluent C# API in bulk without hand-picking individual declarations.
- **Simple high-level API.** No need to learn MSIL or the Roslyn code model. Metalama APIs are simple and tailored for
  architecture verification.
- **Extensible.** Easily extend the high-level API to implement rules unique to your project. You can create your own
  validation custom attributes or extend the fabric APIs.
- **High-performance.** Run dozens of rules with low performance overhead.
- **Aspect framework integration.** Metalama architecture verification understands aspects in your code.
- **Open-source.** The `Metalama.Extensions.Architecture` namespace is released under the MIT license.

## Resources

- Reference documentation: [Validating architecture](https://doc.postsharp.net/metalama/conceptual/architecture).
- Source
  code: [Metalama.Extensions.Architecture](https://github.com/postsharp/Metalama.Extensions/tree/release/2024.2/src/Metalama.Extensions.Architecture)
- NuGet package: [Metalama.Extensions.Architecture](https://www.nuget.org/packages/Metalama.Extensions.Architecture)

## Alternatives

Before committing to Metalama, you might consider the following alternative approaches:

### Code reviews

Code reviews are, and will remain, a crucial aspect of software development. They should primarily focus on evaluating
aspects of code quality that cannot be automatically reviewed. It's no secret that code reviews can be time-consuming
and involve providing criticism, which can sometimes lead to frustration or conflict. Therefore, to maintain positive
relationships and minimize frustration, it is essential to address as many issues as possible before the code review
process, either during the coding phase or, at the very least, in the CI pipeline.

### Standard code analyzers

Code analyzers (also called linters) are often used to validate code against code style (such as formatting or the use
of `var` vs. an explicit type), pitfalls, or security gaps, but ready-made analyzers cannot be used to validate
architecture.

### Custom analyzers

To alleviate the limitations of standard code analyzers, you can build custom Roslyn analyzers to verify your own rules.
These analyzers run continuously and report errors directly in the source code. However, this approach is low-level and
requires expert skills in compiler programming. It is possible, but it may not be worth it for smaller projects.

### Architecture unit tests

Projects such as [ArchUnitNET](https://github.com/TNG/ArchUnitNET) allow you to run architectural verification as unit
tests. This approach involves loading an object model of the source (typically from the compiled binary) in a unit test
framework and running assertions.

This approach is simple and efficient but has the following limitations:

- Verifications do not execute in real-time in the IDE. They only run on demand or from the CI pipeline.
- It is difficult to navigate from the error message in the test runner to its location in the source code.
- All violations are reported as errors, and it is difficult to ignore them using a syntax like
  `#pragma warning disable`.

Synonyms/keywords: degradation, decay, deteriorate, entropy, aging
