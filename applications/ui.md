---
title: "Metalama for UI Apps"
summary: "Shows different use cases of Metalama in writing UI apps (like WPF)."
keywords:
- inotifypropertychanged
- c# code contracts
- c# preconditions
- wpf command
- wpf dependency property
- undo redo
- c# change tracking
---

{: .intro }
Metalama can save you a significant amount of redundant code and reduce errors when implementing UI apps, whether they run on desktop, mobile, or browser through WASM. UI apps are often complex, requiring a lot of boilerplate code to make them reactive to user input. Metalama aids in implementing observability (allowing the UI framework to react to data changes), input validation, memoization, and framework-specific constructs such as dependency properties or commands in WPF.

| Pattern | How Metalama can help |
|---------|-----------------------|
| [Change Tracking](change-tracking) | Automatically implements `IChangeTracking` or `IRevertibleChangeTracking` interfaces, reducing boilerplate code. |
| [INotifyPropertyChanged](inotifypropertychanged) | Automatically implements the `INotifyPropertyChanged` interface, eliminating repetitive code and reducing errors. |
| [Memoization](memoization) | Turns standard read-only properties into memoized ones without boilerplate, improving performance. |
| [Undo-Redo](undo-redo) | Implements the Memento pattern to support undo/redo functionality. |
| [Command](command) | Generates plumbing code for WPF commands, integrating with `Observable` aspect for `CanExecute` logic. |
| [Dependency Properties](dependency-property) | Turn C# auto properties into WPF dependency properties. Compatible with [Code Contracts](../contracts).|
