---
layout: new-post
comments: false
title: "Metalama Status Update, April 2024"
date: 2024-04-30 08:00:01 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2024-04
author: "Gael Fraiteur"
image: /assets/images/2024/2024-04-30-status/2024-04-dark.svg
summary: "In this update, we cover the general availability of Metalama 2024.1 and PostSharp 2024.1, the release of Metalama 2024.2 preview builds, the introduction of the Metalama Email Course, and our roadmap for the coming months."
---

After almost five months of work, we were pleased to announce this month the general availability of both [Metalama 2024.1](https://metalama.net/blog/metalama-2024-1-ga) and [PostSharp 2024.1](/blog/postsharp-2024-1-ga), with a particular emphasis on a unified user interface and performance. We are now focusing on one of the most demanded (and demanding) features: introducing types, and are finishing the work we started with INotifyPropertyChanged and XAML.

## Metalama and PostSharp 2024.1 Go Live

We released the 2024.1 version of both products this month.

Previously, Metalama and PostSharp had distinct Visual Studio extensions, each with its unique features and user experiences. However, with Metalama and PostSharp 2024.1, we've merged these two extensions into one, enhancing the overall development experience. Whether you're a Metalama, PostSharp, or a user of both, you'll only need to install a single extension: the [Visual Studio Tools for Metalama and PostSharp](https://marketplace.visualstudio.com/items?itemName=PostSharpTechnologies.PostSharp). In short, it's _Metalama + PostSharp_.

Furthermore, Metalama 2024.1 boosts support for constructors and brings a [55% performance increase](https://metalama.net/blog/metalama-2024-1-performance) in processing aspects.

Find more details in the [Metalama 2024.1](https://metalama.net/blog/metalama-2024-1-ga) and [PostSharp 2024.1](/blog/postsharp-2024-1-ga) release announcements.

## Preview of Metalama 2024.2

We've rolled out several preview builds of Metalama 2024.2, introducing the following enhancements:

* Augmented performance of fabrics and architecture validation through:
    * Caching and parallelization of queries.
    * The introduction of reference validator _granularity_ (set to `Compilation`, `Type`, `Member`, or `Declaration`) to minimize the invocation of validators.
* Enhanced `IAspectReceiver` API, which renders the `Verify()` method of `Metalama.Extensions.Architecture` unnecessary.
* Diagnostic suppressions can now be filtered by argument using the new `SuppressionDefinition.WithFilter` method.
* The default diff interactive tool will open when an aspect test fails (if the expected snapshot differs from the actual one). This feature works with `DiffEngine` and integrates with `DiffEngineTray`.
* The ability to create an `IStatement` from a template.
* `SwitchStatementBuilder` to dynamically create `switch` statements.

For a detailed list, including breaking changes, check out the [preview release notes](https://doc.metalama.net/conceptual/release-notes/release-notes-2024-2).

We're actively refining this release. Here's what we're working on:
- The introduction of new classes (both nested and non-nested). This feature has been highly requested and is necessary for patterns like Memento or enum view-model classes.
- Polishing of INotifyPropertyChanged, XAML command, and XAML dependencies.

## Introducing the Metalama Email Course

We now offer the Metalama Email Course to new Metalama users. It features 15 emails that cover the primary use cases and features of Metalama. A big shoutout to Dom Sinclair for his contribution to this project.

Feel free to subscribe [here](https://newsletter.postsharp.net/all).

## Article from Marek Sirkovský

I recently stumbled upon this insightful article from Marek Sirkovský, mentioning Metalama: [The New C# Interceptors vs. AOP](https://mareks-082.medium.com/the-new-c-interceptors-vs-aop-dcbc0d2151a4).

## Roadmap

As mentioned earlier, our work on Metalama 2024.2 will occupy us for most of May, with fovus on type introductions and XAML. We aim to release 2024.2 before the summer. However, type introduction is a long-term project, and 2024.2 won't cover all cases. We'll continue working on this throughout the summer and release more features in 2024.3 in the fall.

In parallel, we're crafting a newsletter titled _The Timeless .NET Engineer_. This newsletter will eschew the shiny new C# features and the latest .NET APIs, choosing instead to concentrate on the timeless art of building things that last, code that you can be proud of even a decade from now. We're also writing awareness-building articles on a variety of .NET topics where Metalama could be helpful, but without honing in on our products. Expect to see these articles on this blog in a week or two.

## Conclusion

This month, we launched Metalama and PostSharp 2024.1, introducing a unified Visual Studio extension, performance improvements, and enhanced constructor support. We're diligently working on type introductions, INotifyPropertyChanged, and XAML aspects.

Here's to happy meta-programming!
