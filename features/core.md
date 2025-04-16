---
title: Core Features
summary: "Metalama offers features like code generation, verification, real-time feedback, architecture validation, and a code fix toolkit for C#."
keywords: "Metalama, code generation, code verification, real-time feedback, architecture validation, code fix toolkit, C#, Roslyn, aspect-oriented programming, source generators, programming in .NET"
---

| Feature | Description |
|---------|-------------|
| [Code Generation](code-generation) | Metalama is a powerful and straightforward code generation framework for C#. Inspired by aspect-oriented programming, it's the only Roslyn-based approach that seamlessly integrates generated code with handwritten code, making it possible to implement most code patterns. |
| [Code Verification](code-validation) | Metalama makes it easy to validate handwritten or AI-generated code in real time, reporting errors and warnings when rules are violated. With the architecture validation package, you can also verify dependencies between classes and namespaces. |
| [Immediate Editor Feedback](design-time-feedback) | Metalama provides real-time feedback as you type, eliminating the need to constantly rebuild to refresh your IDE. Unlike MSIL-based approaches, and thanks to its integration with Roslyn source generators, Metalama allows you to reference generated declarations from handwritten code. |
| [Architecture Validation](architecture-verification) <i class="premium"></i> | Validate code usages, references, and dependencies, and enforce your architecture straight from the IDE with Architecture As Code. |
| [Code Fix Toolkit](code-fixes) <i class="premium"></i> | Boost your team's productivity by suggesting custom code fixes for any errors or warnings reported by your code verification logic. |
