---
title: Alternatives for Architecture Verification
summary: "The document discusses various methods for architecture verification, including code style analyzers, architectural unit tests, custom Roslyn analyzers, and custom scripts."
keywords: "architecture verification, code style analyzers, architectural unit tests, Roslyn analyzers, custom scripts, .NET, custom architecture rules, native warnings, real-time code analysis, alternatives"
toc: true
---

## Code style analyzers and linters

One of the most common ways to improve your code quality is to add code linters (called _analyzers_ in .NET) to your projects. However, they can't help you validate your architecture.

.NET comes with a [large set of analyzers](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview) that analyze code style, portability issues, performance pitfalls, and even detect some security problems in your code.

Third-party libraries like xUnit include their own analyzers, and code quality companies like Sonar release [even more linters](https://www.nuget.org/packages/SonarAnalyzer.CSharp/).

These analyzers are very good, and you should probably use some of them in any project.

However, they only enforce _pre-made_ rules. Sometimes, you can configure some parameters of these rules using `.editorconfig`. For instance, you can configure your code style preferences, such as choosing `var` over explicit types or specifying your preferred casing.

_You cannot verify architecture_ with these rules. Code quality is a complex topic, and you need more than one tool in your kit.

<div class="row benefits">
<div class="col" markdown="block">

### Benefits

- **Simple.** There is nothing to code. Just customize the rules to your code style.
- **Behaves like native C# warnings.** You can suppress them or escalate them using `#pragma warning`, `.editorconfig`, `WarnAsError`, etc.
- **Immediate feedback as you type.** There's no need to build the project to refresh the warnings.

</div>
<div class="col"  markdown="block">

### Inconveniences

- **Cannot enforce custom rules.** They are limited to predefined rules, sometimes with parameters that can be configured through `.editorconfig`.

</div>
<div class="col"  markdown="block">

### Use cases

- Check code style and standards.
- Verify pitfalls, best practices, and security violations.

</div>
</div>

## Architectural unit tests

Probably the easiest way to get started with architectural verification is to use [ArchUnitNET](https://github.com/TNG/ArchUnitNET), an architecture verification _unit test_ framework.

As its name suggests, this framework allows you to write unit tests (using a framework like xUnit) that verify your architecture. You can create one test method per rule, which can either succeed or fail, like a test. The framework decompiles your assemblies using [Cecil](https://github.com/jbevain/cecil) and lets you define architectural rules using a fluent API.

The principal benefit of this approach is that it feels very familiar thanks to its integration with the practice of unit testing.

However, it does not report errors and warnings in a way that feels "native." Defects do not appear directly in the code editor as squiggles but in the test runner. An unfortunate side effect is that you cannot easily manage them using `#pragma warning disable` and `.editorconfig`. Therefore, this approach is only viable if you go for a zero-warning quality strategy.

<div class="row benefits">
<div class="col"  markdown="block">

### Benefits

- **Can enforce custom architecture rules.** ArchUnitNET is designed for architectural verification. You can write your own rules using a C# fluent API.
- **Familiar unit testing experience.** Developers on your team already understand and use unit tests.

</div>
<div class="col"  markdown="block">

### Inconveniences

- **Failed tests instead of warnings.** Developers are used to squiggles in case of structural errors in code, and instead, they will get a failed test.
- **No link to source code.** Although error messages are well-written, you cannot simply navigate from the unit test to the suspect code declaration.
- **Cannot manage warnings.** There are no warnings but failed tests, so you cannot easily manage them using `#pragma warning disable`, `.editorconfig`, or server-side tools like Sonar or Qodana.

</div>
<div class="col"  markdown="block">

### Use cases

- Zero warning strategy.

</div>
</div>

## Custom Roslyn analyzers

If you value real-time code analysis and native warnings that can be managed using `#pragma warning disable`, `.editorconfig`, and code quality services such as Sonar or Qodana, your only alternative to Metalama is to build a set of custom analyzers.

Indeed, Metalama Architecture Verification is itself built on top of Roslyn analyzers.

Without the Metalama layer, you will have to code directly against the Roslyn API. It's going to be much more complex.

<div class="row benefits">
<div class="col" markdown="block">

### Benefits

- **Behaves like native C# warnings.** Developers get the same look and feel with architecture verification warnings as with any other compiler or analyzer warnings.
- **Immediate feedback as you type.** No need to run a build or a test. You get feedback within seconds.
- **Easy distribution.** You can easily include your analyzers in your NuGet packages. An advantage compared to Metalama is that you don't need a reference to a third-party package.

</div>
<div class="col"  markdown="block">

### Inconveniences

- **Complex.** Implementing simple rules is relatively straightforward, but building more complex architecture rules can quickly become much more intricate and require you to build a framework on top of the Roslyn API.

</div>
<div class="col"  markdown="block">

### Use cases

- Validation of API usage for packages with a large distribution.

</div>
</div>

## Custom scripts

Heading in a completely different direction, you can create custom scripts that query your code for specific patterns you don't want to see.

You can run these scripts in a small console app or use an interactive tool like LINQPad.

The `System.Reflection` namespace is not sufficient to navigate through the code references.

A good option is to use [Metalama's introspection API](https://doc.metalama.net/preview/conceptual/introspection/linqpad) through the [Metalama.Framework.Workspaces]() namespace.

<div class="row benefits">
<div class="col"  markdown="block">

### Benefits

- **Maximum freedom.** It's your process. You have complete control over the execution, inputs, and outputs of the program.
- **Rich architecture validation API** using `Metalama.Framework.Workspaces`.
- **Interactive queries** with tools like LINQPad.

</div>
<div class="col"  markdown="block">

### Inconveniences

- **Not native C# warnings.** No integration with `.editorconfig`, `#pragma warning`, `WarnAsError`, etc.

</div>
<div class="col"  markdown="block">

### Use cases

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
