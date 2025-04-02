---
title: Code Fix Toolkit
---

{: .intro }
With Metalama, coding architects and senior developers can create custom code fixes and refactorings tailored to your business domain, surface them through warnings or the IDE’s lightbulb/screwdriver menu, and boost team productivity at scale.

## Benefits

* **Accelerate development**: Developers can fix issues with a single click, instead of manually figuring out how to resolve a warning or apply a pattern.

* **Improve API discoverability** Make it easier for new developers to discover less common members of your API.

* **Reduce load on senior developers**: Frequent questions like “how do I fix this?” or “what’s the right pattern here?” are answered automatically—with working, production-grade code.

* **Empower developers**: Junior developers get guardrails and guidance without constant hand-holding, reducing errors and boosting confidence.

* **Reduce errors**: Automated fixes reduce the chance of human error when applying repetitive or complex changes.

## Features

* Attach a code fix to any warning or error reported by your aspects or fabrics.
* Suggest a code fix without reporting warnings or errors (also called code refactorings).
* Leverage the full power of the code generation framework to code fixes.
* Looks and feels like native code fixes.
* Works in any IDE.

## Example

Suppose that we built a `[ToString]` aspect, which generates the `ToString()` method from all properties. We defined an attribute `[NotToString]` to exclude a property from the generated `ToString()` method. To improve the discoverability of the `[NotToString]` attribute and avoid these endless "how do I fix this" questions, we add the following code to the aspect:

```cs
foreach ( var property in GetIncludedProperties( builder.Target ) )
{
    builder.Diagnostics.Suggest(
        CodeFixFactory.AddAttribute(
            property,
            typeof(NotToStringAttribute),
            "Exclude from [ToString]" ),
        property );
}
```

## Resources

* Reference documentation:
    - [Exposing an aspect as a live template](https://doc.metalama.net/conceptual/aspects/ide/live-template)
    - [Offering code fixes and refactorings](https://doc.metalama.net/conceptual/aspects/ide/code-fixes)

* Examples:
    - [ToString: adding code fixes and refactorings](https://doc.metalama.net/examples/tostring/tostring-2)