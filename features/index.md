---
title: Features
summary: "Metalama is a C# meta-programming framework for code generation, validation, and custom refactorings, integrating seamlessly with Roslyn."
keywords: "Metalama, C# meta-programming, code generation, code validation, Roslyn integration, custom refactorings, aspect-oriented programming, real-time feedback, code fixes, Visual Studio, code patterns"
---

{: .intro }
Metalama is a powerful meta-programming framework for C# based on Roslyn. It specializes in code generation (including aspect-oriented programming) and code validation. Additionally, it allows you to create custom code fixes or refactorings.

| Feature | Description |
|----------|----------|
| [Code Generation](code-generation) | Metalama is the most powerful and simplest code generation framework for C#. Inspired by aspect-oriented programming, it's the only Roslyn-based approach that seamlessly integrates generated code with hand-written code, making it possible to implement most code patterns. |
| [Code Verification](code-verification) | Metalama makes it easy to validate hand-written or AI-generated code in real time, reporting errors and warnings when rules are violated. Thanks to the architecture validation package, you can also verify dependencies between classes and namespaces. |
| [Design-Time Feedback](design-time-feedback) | Metalama provides real-time feedback as you type, eliminating the need to constantly rebuild to refresh your IDE. Unlike MSIL-based approaches, and thanks to its integration with Roslyn source generators, Metalama allows you to reference generated declarations from hand-written code. |
| [Code Fix Toolkit](codefixes) <i class="premium"></i>| Boost your team's productivity by suggesting custom code fixes for any errors or warnings reported by your code verification logic. |
| [Ready-to-Use Aspect Libraries](features/aspect-libraries) | No need to reinvent the wheel. Metalama comes with many professionally built and tested aspects that you can pull from NuGet and start using immediately. |
| [Visual Studio Tooling](features/tooling) <i class="premium"></i> | See how your code is affected by aspects directly in Visual Studio with Code Lens integration, Aspect Diff, and Aspect Explorer. Get syntax highlighting for T#, Metalama's C#-to-C# template language. |
| [Test Frameworks](features/testing) | Test code generation patterns and the reporting of warnings and errors. |
| [Transformed Code Debugging](features/debugging) | Choose whether to step into the transformed code or stick to the source code during debugging. You can see exactly which code is executed. |
| [Code Query API](features/code-query) | Query your code as a database and explore code references using LINQPad. Access the Metalama object model to diagnose how aspects and fabrics affect your code. |
| [Divorce](features/divorce) | Metalama makes it easy to part ways when needed. Run the `metalama divorce` command to commit the generated code into your source code and return to the plain Jane Microsoft's compiler. |


