---
summary: "Metalama is a tool for architecture verification, ensuring that your C# codebase complies to the intended software architecture."
keywords:
- architecture verification
- software architecture verification
- ArchUnitNET
---

# Architecture Verification for .NET

{: .intro }
Metalama is the only code verification tool for C# that can enforce _custom_ rules in real time, providing feedback as
you type.

Architecture is often defined in non-executable forms, such as text and diagrams. Since it cannot be automatically
enforced, it is verified during _code reviews_, which can be slow and frustrating for both sides.

As a result, the _real_ architecture of the code departs from the _intended_ one, a phenomenon known as _architecture
erosion_.

Expressing architecture in an _executable_ way allows you to validate the codebase in real time. Most issues can be
identified and resolved immediately, making code reviews smoother and less focused on mundane issues.

Typically, the following rules can be automatically enforced in a codebase:

- Restrict dependencies between classes, class families, and namespaces.
- Verify naming conventions based on the base class or implemented interface.
- Ensure that code is implemented according to pattern guidelines.

## Benefits

Here are four reasons why you _must_ consider automatically verifying your codebase against your design:

- **Stop architecture decay.** The code remains aligned with the defined blueprints. Your codebase retains its initial
  architectural qualities, allowing for low maintenance costs and the ability to implement new requirements. The _broken
  window_ syndrome stops and reverses.

- **Reduce codebase complexity.** By validating not only the high-level architecture but also implementation patterns
  and other coding conventions, you further reduce the complexity of your codebase, making it easier for software
  developers to understand.

- **Get immediate feedback.** Developers receive real-time notifications of issues while typing, eliminating the need to
  wait for the next build or code review.

- **Streamline code reviews.** With fewer trivial violations to address, code reviews become more efficient and less
  frustrating. By addressing most minor issues in real time, code reviews can focus on essential aspects.

## Key features

### Simple and extensible architecture verification API

Metalama includes a highly usable API to help you verify your code against your architectural rules.

There are two ways to define rules:

- Declaratively using custom attributes, and
- Programmatically using fabrics.

Both the declarative and the programmatic API can be extended to enforce virtually any rule.

#### Custom attributes: hand-pick declarations

Here is how to enforce a naming convention where all classes implementing `IDocumentFactory` must be suffixed `Factory`:

```csharp
[DerivedTypesMustRespectNamingConvention( "*Factory" )]
public interface IDocumentFactory
{
    IDocument CreateDocument( DocumentId documentId );
}
```

In the following snippet, we prevent the constructor of the `Invoice` class from being used from a different type than
`InvoiceFactory`, enforcing the Factory pattern.

```csharp
public class Invoice
{
    [CanOnlyBeUsedFrom( Types = [ typeof(InvoiceFactory) ] ) ]
    public Invoice( DocumentId documentId ) { }
}
```

#### Fabrics: select in bulk

The following code enforces that `internal` members of the current namespace are not used by a different namespace.

```csharp
namespace MyNamespace;

internal class Fabric : NamespaceFabric
{
    public override void AmendNamespace( INamespaceAmender amender )
    {
        amender.InternalsCanOnlyBeUsedFrom( r => r.CurrentNamespace() );
    }
}
```

Here we are using a project fabric to check that floating-point numbers are not used in the Invoicing namespace.

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

### Behaves like native C# warnings

Warnings reported by Metalama behave like native C# warnings.

This has several benefits:

- They are represented by the familiar squiggles directly in the code editor.
- They can be suppressed or escalated using `#pragma warning`, `.editorconfig`, or `WarnAsError`.
- They can be managed by tools like Sonar or Qodana.

### Immediate feedback while editing

Metalama runs within the IDE and verifies your code as you type.

You receive feedback in seconds. No need to wait for a build or the CI/CD pipeline to complete.

### Understand aspects

Other verification tools may fail to understand the code after it has been enhanced by aspects. Metalama Architecture
Validation is, of course, fully integrated with the Metalama Aspect Framework.

## Alternatives

### Code style analyzers and linters

One of the most common ways to improve your code quality is to add code linters (called _analyzers_ in .NET) to your
projects. However, they can't help you validate your architecture.

.NET comes with a [large set of analyzers](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview)
that analyze code style, portability issues, performance pitfalls, and even detect some security problems in your code.

Third-party libraries like xUnit include their own analyzers, and code quality companies like Sonar
release [even more linters](https://www.nuget.org/packages/SonarAnalyzer.CSharp/).

These analyzers are very good, and you should probably use some of them in any project.

However, they only enforce _pre-made_ rules. Sometimes, you can configure some parameters of these rules using
`.editorconfig`. For instance, you can configure your code style: if you prefer `var` over explicit types or which
casing you prefer.

_You cannot verify architecture_ with these rules. Code quality is a complex topic, and you need more than one tool in
your kit.

<div class="row benefits">
<div class="col">

#### Benefits

- **Simple.** There is nothing to code. Just customize the rules to your code style.
- **Behaves like native C# warnings.** You can suppress them or escalate them using `#pragma warning`, `.editorconfig`,
  `WarnAsError`, etc.
- **Immediate feedback as you type.** There's no need to build the project to refresh the warnings.

</div>
<div class="col">

#### Inconveniences

- **Cannot enforce custom rules.** They are limited to predefined rules, sometimes with parameters that can be
  configured through `.editorconfig`.

</div>
<div class="col">

#### Use cases

- Check code style and standards.
- Verify pitfalls, best practices, and security violations.

</div>
</div>

### Architectural unit tests

Probably the easiest way to get started with architectural verification is to
use [ArchUnitNET](https://github.com/TNG/ArchUnitNET), an architecture verification _unit test_ framework.

As its name suggests, this framework allows you to write unit tests (using a framework like xUnit) that verify your
architecture. You can create one test method per rule, which can either succeed or fail, like a test. The framework
decompiles your assemblies using [Cecil](https://github.com/jbevain/cecil) and lets you define architectural rules using
a fluent API.

The principal benefit of this approach is that it feels very familiar thanks to its integration with the practice of
unit testing.

However, it does not report errors and warnings in a way that feels "native." Defects do not appear directly in the code
editor as squiggles but in the test runner. An unfortunate side effect is that you cannot easily manage them using
`#pragma warning disable` and `.editorconfig`. Therefore, this approach is only viable if you go for a zero-warning
quality strategy.

<div class="row benefits">
<div class="col">

#### Benefits

- **Can enforce custom architecture rules.** ArchUnitNET is designed for architectural verification. You can write your
  own rules using a C# fluent API.
- **Familiar unit testing experience.** Developers on your team already understand and use unit tests.

</div>
<div class="col">

#### Inconveniences

- **Failed tests instead of warnings.** Developers are used to squiggles in case of structural errors in code, and
  instead, they will get a failed test.
- **No link to source code.** Although error messages are well-written, you cannot simply navigate from the unit test to
  the suspect code declaration.
- **Cannot manage warnings.** There are no warnings but failed tests, so you cannot easily manage them using
  `#pragma warning disable`, `.editorconfig`, or server-side tools like Sonar or Qodana.

</div>
<div class="col">

#### Use cases

- Zero warning strategy.

</div>
</div>

### Custom Roslyn analyzers

If you value real-time code analysis and native warnings that can be managed using `#pragma warning disable`,
`.editorconfig`, and code quality services such as Sonar or Qodana, your only alternative to Metalama is to build a set
of custom analyzers.

Indeed, Metalama Architecture Verification is itself built on top of Roslyn analyzers.

Without the Metalama layer, you will have to code directly against the Roslyn API. It's going to be much more complex.

<div class="row benefits">
<div class="col">

#### Benefits

- **Behaves like native C# warnings.** Developers get the same look and feel with architecture verification warnings as
  with any other compiler or analyzer warnings.
- **Immediate feedback as you type.** No need to run a build or a test. You get feedback within seconds.
- **Easy distribution.** You can easily include your analyzers in your NuGet packages. An advantage compared to Metalama
  is that you don't need a reference to a third-party package.

</div>
<div class="col">

#### Inconveniences

- **Complex.** Implementing simple rules is relatively straightforward, but building more complex architecture rules can
  quickly become much more intricate and require you to build a framework on top of the Roslyn API.

</div>
<div class="col">

#### Use cases

- Validation of API usage for packages with a large distribution.

</div>
</div>

### Custom scripts

Heading in a completely different direction, you can create custom scripts that query your code for specific patterns
you don't want to see.

You can run these scripts in a small console app or use an interactive tool like LINQPad.

The `System.Reflection` namespace is not sufficient to navigate through the code references.

A good option is to
use [Metalama's introspection API](https://doc.postsharp.net/metalama/preview/conceptual/introspection/linqpad) through
the [Metalama.Framework.Workspaces]() namespace.

<div class="row benefits">
<div class="col">

#### Benefits

- **Maximum freedom.** It's your process. You have complete control over the execution, inputs, and outputs of the
  program.
- **Rich architecture validation API** using `Metalama.Framework.Workspaces`.
- **Interactive queries** with tools like LINQPad.

</div>
<div class="col">

#### Inconveniences

- **Not native C# warnings.** No integration with `.editorconfig`, `#pragma warning`, `WarnAsError`, etc.

</div>
<div class="col">

#### Use cases

- Interactive queries
- Experiments
- Custom workflows

</div>
</div>

## Comparison

{: .feature-table }
| Feature | Metalama | Standard linters | Custom analyzers | Architectural unit tests | Custom build scripts
|---------|----------|-------------------|-------------------|--------------------------|---------------------
| Can enforce custom rules | Yes | No | Yes | Yes | Yes
| Behaves like native C# warnings. | Yes | Yes | Yes | No | No
| Simple and powerful API suitable for architecture verification | Yes | No | No | Yes | Yes[^1]
| Understands aspects | Yes | No | No | No | Yes[^1]

[^1]: Possible using `Metalama.Framework.Workspaces`.
