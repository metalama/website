---
layout: post 
comments: false
title: "Metalama Status Update (September 2022)"
date: 2022-09-29 09:00:00 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2022-09

author: "Gael Fraiteur"
image: /assets/images/2022/2022-02-23-metalama/metalama-2.svg
summary: "The Metalama team has been focused on making the software faster and more robust, implementing user stories, and fixing bugs. They plan to focus on addressing their bug backlog and aim to have a release candidate by end of Autumn 2022. "
---

There was no status report in August because of vacation, so today I will cover the last two months. In short, we have been making Metalama faster and more reliable and robust without extending its set of features.

## What did we achieve?

The later summer was characterized by three large refactorings that required several weeks each:

* **Cross-project aspects at design-time**: caching, cache dependencies and cache invalidation. In previous builds, cross-project dependencies were not implemented, so changes in one project were not reflected in dependent projects.
* **Refactoring of the aspect linker**, an important and complex internal component that links aspects and source code together. The component accumulated hacks and debts and we could no longer fix sophisticated bugs being reported, so several weeks of work were necessary to clean it up.
* **Parallel compilation**: Metalama now uses all cores on your machine by default.

Additionally, we have implemented the following user stories:

* Support for Roslyn 4.3 (_not yet_ for .NET Framework 4.8.1 on ARM64 -- please ask us on support if you need it).
* Implementation of licensing (to be announced).
* Automatic clean up of temporary and cache files.
* Introduction of custom attributes by aspects.
* Filling gaps in the generation of `System.Reflection` objects from compile-time code for run-time usage (methods like `ToType()`, `ToFieldInfo()`, `ToMethodInfo()`, ...).

We also fixed more than 50 bugs in the last two months. 

We started brute force testing of Metalama on the NopCommerce open-source application. We've already discovered and fixed several issues (principally a big performance issue addressed by parallel compilation), but we cannot yet announce that we can transform NopCommerce without error.

As you can see from the above, we have been principally working on robustness, sometimes on small new user stories, but no longer on new features.

## What is the status?

Because of the work on these three major PRs, we were hindered, during several weeks, in our ability to fix bugs in short time. Also, more users started to use Metalama for personal projects and on experimental branches of their work projects. These users reported dozens of bugs in the last weeks. As a result of these two factors, and of our brute force testing on NopCommerce, our bug backlog has become longer. Because of that, it is not yet a good idea to use Metalama for anything else than personal or experimental projects at the moment and for couple next weeks to come.

On the positive side, we no longer expect any complex and large change. We have implemented all large user stories, and bugs that have been reported seem to require only little work. Therefore, we are confident that the quality of the codebase will now only increase. 

We hope to have an RC by the end of Autumn 2022.


## What's next

As I mentioned, all user stories except a few minor ones (introduction of generic interfaces, overriding of indexers) have now been implemented.

We will mostly focus on our bug backlog during the next weeks, so that we are again able to support users who want to give Metalama a try.

As always, your [feedback](https://www.postsharp.net/metalama/support) is greatly appreciated and, most likely, can have large impact on the final product. To get instant answers, the best is still to join our [Slack community](https://www.postsharp.net/slack).

Happy llama!

-gael

