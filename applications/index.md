---
title: "When to Use Metalama"
toc: false
keywords:
- metalama use cases
summary: "This web section lists different use cases of Metalama."
---

Metalama is not for every project. Consider using Metalama if one of the following situations applies to your project:

* **Large projects.** Your project contains dozens of entities and hundreds of properties or methods requiring the same behaviors.
* **Large teams.** There is a large team of developers and it is challenging to align everyone on consistent patterns and practices.
* **Long lifecycle.** You must maintain the project for several years — an investment in long-term quality makes sense.

## When _not_ to use Metalama

Conversely, *avoid* using Metalama if:

* **Small and simple projects.** If your project is trivial, the added complexity might outweigh the benefits. As a rule of thumb, each aspect should be applied at least 20 times to justify its use.
* **Unexperienced team.** Don't embark on a Metalama journey if you lack senior developers or architects on your team. Like any powerful tool, Metalama requires maturity and wisdom in selecting use cases; misuse can introduce unnecessary complexity.

## Which factors are almost irrelevant

* **Run-time performance.** Your code will run as fast or faster with Metalama than without it. Why faster? Since Metalama generates C# code automatically, it can use optimized, faster patterns that would be cumbersome to implement by hand.
* **Compilation time.** Metalama typically adds 25% to your `dotnet build` time, which is probably not a big difference for most projects. If it does seem important, it might mean the Metalama's benefits won't outweight the added complexity.

## What are the principal use cases?

| Category | Description |
|----------|----------|
| [Principles At Work](principles) | See how Metalama can help implement fundamental software development principles like Clean Code, SOLID, DRY, Aspect-Oriented Programming, Architecture Verification, or Refactoring.|
| [Applications](applications) | See typical and concrete use cases of Metalama in software application development. |
| [DevOps](devops) | Learn how can Metalama can help moving from a prototype to a production-ready application with technical features like logging, metrics, caching, exception handling, and resilience. |
| [Alternatives](alternatives) | See alternatives of Metalama is different areas of application. |