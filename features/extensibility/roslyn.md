---
title: Extensible with Roslyn
---

{: .intro }
Metalama is a simplified and productive API built on top of Roslyn. When the need arises, you can use the `Metalama.Framework.Sdk` package to access the low-level API and overcome any limitations of Metalama. Disclaimer: this breaks the warranty.

You can use `Metalama.Framework.Sdk` in the following scenarios:

1. **Analyze method bodies.** Metalama's object model does not allow you to analyze method bodies, expressions, or field/property initializers. To perform advanced analysis, such as analyzing the property dependency graph to implement the `INotifyPropertyChanged` interface, you can use Roslyn.
2. **Implement arbitrary code transformations.** You can implement aspects at Roslyn's syntax level by authoring custom aspect weavers. However, this approach is not generally recommended due to its high complexity and performance overhead.
3. **Develop custom metrics.**

## Resources

* Reference documentation: [Extending Metalama](https://doc.metalama.net/conceptual/sdk)
