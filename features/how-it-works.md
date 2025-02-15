---
title: How does it work?
toc: false
---


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