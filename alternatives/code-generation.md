---
title: "Alternatives for Code Generation"
toc: true
summary: "This document discusses various approaches for code generation in .NET, highlighting benefits, inconveniences, and use cases for each method."
keywords: "code generation in .NET, Metalama, pre-build scripts, T4 templates, MSIL Rewriting, Roslyn Code Generators, source code access, generated code access, real-time feedback, override handwritten code"
---

There are many approaches to code generation in .NET, and Metalama is not necessarily the best choice for all use cases. In particular, Metalama should _not_ be used to generate code based on a _slow_ source like a database or a web API.

## Pre-build scripts, programs, or tasks

When your code generation logic does not depend on the source code itself, it is convenient to write this as a script-like C# program that simply writes its output with a `TextWriter`.

You can choose to execute the program upon different triggering events:

- On demand, if the input data does not change often. In this case, you should store the output in source control.
- As a [pre-build event](https://learn.microsoft.com/en-us/visualstudio/ide/how-to-specify-build-events-csharp).

<div class="row benefits"><div class="col" markdown="block">

### Benefits

- **Simple and familiar**. After all, it's just C#.
- **Very simple to debug**.
- When executed on demand, it can handle a slow generation process (such as generating code from a database schema) without affecting the build time.

</div><div class="col" markdown="block">

### Inconveniences

- **No source code access**. The control logic cannot rely on your C# source code to generate code.
- **Cannot override handwritten code.** You can generate new files, but you cannot inject new logic into existing source code.
- **Purely text-based**. No error checking, syntax coloring, or syntax completion for generated code.
- **Not real-time**. You need to rebuild after modifying the source files to see new errors or use newly generated methods.

</div><div class="col" markdown="block">

### Use cases

- Generate data objects from databases, XML schemas, or UML models.
- Generate service proxies for REST, SOAP, gRPC, or Web APIs.
- Generate C# wrappers for non-.NET libraries.

</div></div>

{: .info }
In theory, your script could also access the source code by loading it using a [Roslyn workspace](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/work-with-workspace). However, in this case, you might want to consider using Metalama or Roslyn code generators instead.

## T4 (Text Template Transformation Toolkit)

[T4](https://learn.microsoft.com/en-us/visualstudio/modeling/code-generation-and-t4-text-templates) is a Microsoft technology for the generation of text files based on templates. T4 templates are a mixture of text blocks and control logic that can generate a text file. The control logic is written as fragments of program code in C#. The generated file can be text, such as a web page, a resource file, or program source code in any language. T4 uses a similar syntax as ASP.NET WebForms, with control blocks delimited by `<%` and `%>`.

T4 templates can be executed as a pre-build event or on demand.

They are a special case of pre-build scripts and share the same benefits and inconveniences.

Writing a T4 template is more convenient than writing a pure C# program when there is relatively little control logic. When the template is dominated by control logic, writing C# code is often more productive.

<div class="row benefits"><div class="col" markdown="block">

### Benefits

- **Simple**. The control logic is C#, with the familiar `<%` and `%>` delimiters.
- **Real-time feedback.** With an optional Visual Studio extension, templates can be automatically executed when the input file is modified.
- When executed on demand, it can handle a slow generation process (such as generating code from a database schema) without affecting the build time.

</div><div class="col" markdown="block">

### Inconveniences

- **No source code access**. The control logic cannot rely on your C# source code to generate code.
- **Cannot override handwritten code.** You can generate new files, but you cannot inject new logic into existing source code.
- **Purely text-based**. No error checking, syntax coloring, or syntax completion for the non-control part of the code.

</div><div class="col" markdown="block">

#### Use cases

The same use cases as for pre-build scripts.

</div></div>

## MSIL Rewriting

Tools based on MSIL Rewriting run after the C# compiler. They decompile assembly written by the compiler, run it through some plug-ins that generate new code into it, and compile it back to a binary assembly.

Examples of such tools include PostSharp and Fody.

MSIL rewriting was the only possible approach that allowed mixing generated logic with handwritten logic back in the days when the C# compiler was a black box. We now consider MSIL Rewriting obsolete.

<div class="row benefits"><div class="col" markdown="block">

### Benefits

- **Code model access**. The generator can reflect the source code through decompilation.
- **Can override handwritten code.** Ability to add new behaviors to existing methods.

</div><div class="col" markdown="block">

### Inconveniences

- **No generated code access.** Source code cannot reference generated classes or members.
- **No real-time feedback.** You need to rebuild after modifying the source files to see new errors.
- **Complex.** Unless a general-purpose AOP framework like PostSharp is used, it's difficult to implement generators using MSIL.

</div><div class="col" markdown="block">

### Use cases

- General aspect-oriented programming (all aspects) with PostSharp.
- Limited aspect-oriented programming (decorators, interceptors, mixins) with Fody.
- INotifyPropertyChanged, contracts.

</div></div>

## Run-time generation

Instead of generating code at build time, you can do it at run time, typically during application start-up, using the `System.Reflection.Emit` namespace.

Many well-known libraries, including different serializers and the `Regex` class, use this approach instead of using `System.Reflection` alone to improve performance.

<div class="row benefits"><div class="col" markdown="block">

### Benefits

- **Partial code model access.** Control logic has partial access to the code model using `System.Reflection`. However, it cannot access the method bodies, but only the metadata.

</div><div class="col" markdown="block">

### Inconveniences

- **Cannot override handwritten code.** Generators can only create new types.
- **AoT Incompatible.** Ahead-of-time (AoT) compilation, required by .NET Native, does not support `System.Reflection.Emit`.
- **Slower startup.** Emitting code at run time causes a performance overhead at each application startup.
- **Complex.** Must emit IL code.
- **No generated code access.** Source code cannot reference generated types.

</div><div class="col" markdown="block">

### Use cases

- Generate dynamic proxies (Castle.DynamicProxy).
- Generate object mappers (AutoMapper).
- Generate serializers/deserializers.
- Generate `Regex` implementations.

</div></div>

## Roslyn Code Generators

Roslyn generators are plug-ins of the C# compiler that generate code based on the source code or other files in the project. They are executed in real-time as you type code in the IDE, and at build time.

Before Roslyn generators existed, `System.Reflection.Emit` was the only "official" way to generate code based on source code. The main problem was that this approach is not compatible with .NET Native and AoT. When Microsoft decided to improve support for AoT in .NET, they had to improve the code generation scenario, and came up with Roslyn Code Generators.

<div class="row benefits"><div class="col" markdown="block">

### Benefits

- **Full source code access.** The generator logic can inspect the whole source code.
- **Real-time feedback.** The new code is generated immediately as you type.
- **Generated code access.** Source code can reference generated classes or members, with full support for IntelliSense.

</div><div class="col" markdown="block">

### Inconveniences

- **Cannot override handwritten code.** Generators can only create new types or extend existing `partial` ones.
- **Cannot report errors or warnings.** Roslyn code generators have no mechanism to report errors or warnings. A separate Roslyn analyzer must be created.
- **Complex.** The Roslyn code generator is a low-level one optimized for performance. Implementing complex generation logic with this API can be tricky.
- **Purely text-based.** No error checking, syntax coloring, or syntax completion for generated code.

</div><div class="col" markdown="block">

### Use cases

- Native AoT readiness: Regex, ASP.NET request handlers, serialization/deserialization, ...
- Generate C# code from other source languages (XAML, Blazor/CSHTML).

</div></div>

## Comparison

Let's now summarize the abilities and limitations of the different approaches to code generation for C#:

| Feature | Metalama | Pre-build script, T4 | MSIL Rewriting | Run-time | Roslyn generators |
|---------|----------|----------------------|----------------|----------|-------------------|
| Can reference source code from the generator | Yes | No | Yes | Yes | Yes |
| Can reference generated code from source code | Yes | Yes | No | No | Yes |
| Gives immediate feedback as you type | Yes | No | No | No | Yes |
| Can override handwritten code | Yes | No | Yes | No | No |
| Offers simple, strongly-typed template language | Yes | No | No | No | No |
| Can report errors and warnings to source code | Yes | No | Yes | No | No |

## And generative AI?

Generative AI (GenAI) is often cited as a code generation technology, but it plays a completely different role.

The most significant difference between GenAI and the code generation tools discussed in this article is that **code generated by GenAI must be maintained as source code**. In this article, we are talking about techniques that generate throwaway code—code that never needs to be maintained.

Since most of the total cost of ownership of a codebase comes from maintenance and not its initial writing, GenAI is not a replacement for code generation tools but rather for handwritten code.

GenAI is a wonderful way to get a quick and dirty solution in a language or area you don't master, but it is not a replacement for code generation tools.
