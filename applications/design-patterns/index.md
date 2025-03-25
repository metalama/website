---
title: "Design Patterns"
summary: "This article details how Metalama can help implementing design patterns in C# including the Memento, Singleton, Factory, Builder, Decorator, and Proxy patterns."
toc: false
keywords:
- c# design patterns
- c# memento pattern
- c# singleton pattern
- c# factory pattern
- c# builder pattern
- c# decorator pattern
- c# proxy pattern
---

{: .intro }
Design patterns are repetitive _by design_. The more your pattern implementations are regular and predictable, the more
you can reduce the cognitive complexity of your codebase. If it's repetitive, it can be automated! Metalama can help
implement design patterns in two ways:

* **Code generation.** Sometimes patterns require so much repetitive code, with almost no creativity required, that it's
  possible to algorithmically generate the required code. Good examples of this are the Memento or Builder patterns.

* **Code verification.** For some other patterns, there are fewer opportunities to generate code. However, we still want
  to verify that handwritten code complies with the design pattern rules. And we can also use Metalama for this. See,
  for instance, the modern Singleton and Abstract Factory patterns.

## Benefits

* **Less boilerplate code.** Some design patterns require a fair amount of repetitive code. It can be reduced to zero with Metalama.
* **Uniform, predictable codebase.** A key idea of design patterns is that similar problems must have similar solutions, and that components in these solutions must have similar names. Metalama allows you to enforce pattern rules and conventions across your codebase.
* **Enforce dependencies.** Design patterns define how different classes of a pattern are allowed to communicate with each other. For instance, in a factory pattern, the object constructor might be called only from the factory class or method. You can use Metalama to enforce these constraints.

## Design Patterns

Metalama can be used to generate or verify code in the following patterns:

| Pattern            | How Metalama can help                                                               |
|--------------------|-----------------------------------------------------------------------------|
| [Classic Singleton](classic-singleton) | Generate the boilerplate and enforce constructors to be private. |
| [Modern Singleton](modern-singleton)  | Enforce constructors to be called only from the dependency container configuration code. |
| [Memento](memento)                    | Generate all of the boilerplate code. There's a lot.               |
| [Factory](factory)                    | Enforce constructors to be called only from factory methods or classes. |
| [Builder](builder)                    | Generate all of the boilerplate code. There's a lot.               |
| [Decorator](decorator)                | Metalama's override feature is basically an automatic Decorator pattern. |
| [Proxy](proxy)                        | Generate proxy classes at compile time instead of at run time.     |