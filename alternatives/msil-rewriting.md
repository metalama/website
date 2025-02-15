---
title: "MSIL Rewriting"
keywords: 
- MSIL rewriting
summary: "MSIL Rewriting modifies binary assemblies post-C# compilation. Tools like PostSharp, Mono.Cecil, Fody, AspectInjector, and Rougamo use this approach."
toc: false
---

{: .intro }
_MSIL Rewriting_ is the process of modifying the binary assembly during the build process. An additional rewriting step
is added to this process just after the C# compiler. These tools can add MSIL instructions, as well as new types and
members, during the build.

The following tools are based on MSIL rewriting:

* [PostSharp](/il) implements its own MSIL rewriting stack.
* [Mono.Cecil](https://github.com/jbevain/cecil) is a standalone library that can be used to modify .NET assemblies.
* [Fody](fody) is based on `Mono.Cecil`. It integrates with MSBuild and implements a plug-in system so that MSIL
  transformations can be easily packaged and combined.
* [AspectInjector](https://github.com/pamidur/aspect-injector)
  and [Rougamo](https://github.com/inversionhourglass/Rougamo) are AOP frameworks based on `Mono.Cecil`.
