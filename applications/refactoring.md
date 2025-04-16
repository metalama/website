---
title: "Refactoring"
summary: "This article covers how Metalama can help with code refactoring in C# projects."
toc: true
keywords:
- c# refactoring
- c# code refactoring tools
---

{: .intro }
Refactoring is a broad topic that ranges from limited code changes that can be automated (such as making a field read-only) to large efforts that take several days. Metalama complements mainstream refactoring tools with the ability to spot code that requires refactoring and create your own custom live templates and code fixes.

{: .note }
You will need Metalama Professional to use the approaches described in this article.

## Spot obsolete code and report warnings

When you are in the middle of a large refactoring, it is common to lose track of which code has not yet been refactored.

With Metalama, you can create rules that identify declarations that need to be refactored and report warnings.

For your next large refactoring, consider this approach. At the beginning of the refactoring effort, you create [architecture verification](/applications/architecture-verification) rules for the new intended design. You will have dozens of warnings initially, and you can resolve them progressively until there are none.

### Example

Typically, large refactorings are made necessary by a change in the desired architecture.

Let's take an example. Suppose that the current state of your application is that the OrderFullfillment namespace directly calls methods of the Warehouse namespace. You want to refactor the codebase to use a Mediator pattern. This is a large refactoring, and you plan to work on it for several days. To avoid introducing too many issues in the process, you want to perform tasks by small increments, ensuring that the application builds and that the unit tests pass at each step.

## Add your own one-click refactorings

You are certainly familiar with the lightbulb or screwdriver menu of your IDE, which allows you to perform simple changes in your code without typing it manually. And you've maybe wondered how to extend it.

Metalama allows you to custom create code fixes and refactorings:

* _Code fixes_ are attached to an error or warning and are suggestions of how to _fix_ an issue.
* _Code refactorings_ do not depend upon any errors or warnings.

You can use exactly the same set of techniques as when creating aspects. You can use the whole power of Metalama. The only difference is that the aspect will be applied at _design time_, when the user selects them in the refactoring menu, instead of at compile time.

### Live templates

You can mark an aspect class as a [live template](https://doc.metalama.net/conceptual/aspects/ide/live-template) by using the [EditorExperience](https://doc.metalama.net/api/metalama-framework-aspects-editorexperienceattribute) custom attribute. This will export the aspect class to the refactoring menu. In this approach, it's important to define the [aspect eligibility](https://doc.metalama.net/conceptual/aspects/eligibility).

### Code fixes and refactorings

You can use a fabric or an aspect to detect possible defects and [attach a code fix](https://doc.metalama.net/api/metalama-framework-diagnostics-idiagnostic-withcodefixes) to the error or warning.

You can also detect refactoring opportunities and [suggest a refactoring](https://doc.metalama.net/api/metalama-framework-diagnostics-scopeddiagnosticsink-suggest) _without_ reporting any error or warning.

## Reducing the need for refactoring

The best way to make refactoring easier is to have a good initial design that can evolve with time _without_ requiring extensive changes to accommodate new features.

Take, for instance, caching. You might realize in the middle of a project that your cache key generation strategy is not good enough and needs to be refactored. If the caching strategy was implemented in dozens of places, you have a bigger refactoring problem than if it were implemented in a single place.

By leveraging [on-the-fly code generation](/features/code-generation) early in your design, you reduce the need for large refactorings later in the project. When the need arises to modify the code pattern, the only thing to change is the aspect itself.
