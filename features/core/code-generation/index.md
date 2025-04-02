---
title: "Code Generation for C#"
short_title: "Code Generation"
summary: "This article presents different code generation techniques for C# and compares them to Metalama."
keywords:
- c# code generator
- c# code generation
- c# generate code
---

{: .intro }
Why write repetitive code by hand when you can generate it automatically? Metalama is hands-down the most powerful code generator for .NET with its unique C#-to-C# template technology. 

## Benefits

Here are four reasons why you _must_ consider suppressing repetitive code with a code generation tool:

* **Boost development productivity.** Using Metalama can reduce hand-written code by 10–50%, enabling developers to
  focus on meaningful tasks. Architects and senior developers act as productivity _multipliers_ by minimizing repetitive
  and error-prone work for the rest of the team.

* **Reduce code complexity.** Separating technical details from business logic results in cleaner, more readable
  code. New team members can contribute effectively without being overwhelmed by low-level technical details.

* **Improve reliability.** Fewer lines of code mean fewer defects. Lower complexity also contributes. Additionally,
  Metalama simplifies the implementation of resilience features, further improving your app's reliability.

* **Reduce maintenance costs.** Metalama's ultimate advantage lies in reducing maintenance costs and extending the
  lifespan of the codebase. Since maintenance accounts for 55%–95% of a software system's costs, keeping complexity
  low is crucial for post-release team productivity.

## Features

Metalama is the only framework for .NET that offers:

| Feature | Description |
|---------|-------------|
| [C#-to-C# Templates](templates) | Classic code generators are essentially text generators and don’t provide syntax highlighting, code completion, or error checking for generated code. Metalama is a true, strongly-typed object-oriented code generator featuring T#, a unique C#-to-C# template language. |
| [Enhance Hand-Written Code](override) | Metalama is the only on-the-fly tool that allows you to add behaviors to existing hand-written code. Other C# generators let you _add new classes_ to a project or _extend partial classes_, but they don't allow injecting new behaviors into existing methods, properties, or fields. |
| [Reference Generated Code From Source Code](reference-from-source-code) | With Metalama, your source code can reference generated code as if it were itself source code. This is a significant advancement over previous MSIL-based generation, where code additions were not visible from source code. |
| [Dependency Injection Support](dependency-injection) | You can use dependency injection concepts in your aspects to make both the aspects and the target code more testable. |
| [Powerful Code Selection Mechanisms](applying) | Metalama offers several mechanisms to add aspects (which encapsulate code generation and validation) to target code: custom attributes for selective application, and fabrics for a bulk, programmatic approach. Also, explore cross-project options. |


