---
title: "Code Generation for C#"
short_title: "Code Generation"
summary: "This article presents different code generation techniques for C# and compares them to Metalama."
keywords:
- c# code generator
- c# code generation
- c# generate code
toc: false
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

## Metalama's unique features

Metalama is the only framework for .NET that

| Feature | Description |
|----------|----------|
| [Simple, Strongly-Typed Templates](templates) | Classic code generators are actually text generators and don’t offer you syntax highlighting, code completion, or error checking for generated code. Metalama is a true, strongly-typed object-oriented code generator featuring T#, a unique C#-to-C# template language. |
| [Add Behaviors to Hand-Written Code](override) | Metalama is the only on-the-fly tool that also allows you to add behaviors to existing hand-written code. Other C# generators  allow you to _add new classes_ to a project or to _extend partial classes_, but don't let you inject new behaviors into existing methods, properties, or fields. |
| [Reference Generated Code From Source Code](reference-from-source-code) | With Metalama, your source code can reference generated code as if it were itself source code. This is a significant advancement from the previous MSIL-based generation, whose code additions were not visible from source code. |


