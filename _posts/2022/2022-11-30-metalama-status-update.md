---
layout: post 
comments: false
title: "Metalama Status Update (November 2022)"
date: 2022-11-30 09:00:00 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2022-11
origin: https://blog.postsharp.net/metalama-status-update-2022-11
author: "Gael Fraiteur"
image: /assets/images/2022/2022-02-23-metalama/metalama-2.svg
summary: "Metalama's November 2022 update includes zero severe bugs, progress in PostSharp migration, .NET 7.0 / C# 11 support, LinqPad support, and integration with CodeLens. Work on documentation and new C# 11 features continues. "
---

It has been another month of bug fixing and polishing in Metalama and I'm glad to announce that, at the time of writing, we have _zero severe bug_ in our backlog! We also progressed with PostSharp migration assistance, .NET 7.0 / C# 11 support, LinqPad support, and we even integrate with CodeLens!

## Zero severe bug

We have fixed 55 bugs in November and have reached an important milestone: _zero severe bug_. We define a _severe bug_ as a bug that prevents you from editing or building your project without changing your _business_ code (as opposed to the aspect code). Of course it does not mean that no customer experiences any bug any more, but this is a big step forward.

__It is a good time to start playing with Metalama.__ Because the team is no longer busy fixing severe bugs, once a new one appears, we can address it in hours or days.


## PostSharp migration

Last month, we published the [PostSharp API Annotated for Migration to Metalama](https://doc.metalama.net/migration-api). This month, we are announcing [Metalama.Extensions.Multicast](https://github.com/postsharp/Metalama.Extensions/tree/master/src/Metalama.Extensions.Multicast), an open-source emulation of PostSharp attribute multicasting for Metalama. Our design objective with Metalama is that you should not have to change your _business code_ when migrating from PostSharp to Metalama, that it should be enough to migrate your _aspect code_.

We are still not completely done with the PostSharp-to-Metalama migration story: there is no documentation, and we want to release a package to report warnings and errors for the PostSharp API.

## Support for Roslyn 4.4, C# 11 and .NET 7.0

We have merged Roslyn 4.4 into Metalama Compiler and fixed the issues with .NET 7.0. The new features of C# 11 are still not fully implemented in Metalama: you may still hit some bug if you use them.

We also published [PostSharp 6.11 RC](/blog/post/postsharp-6-11-rc) this week, with support for C# 11 and .NET 7.0.

## Code Lens for Visual Studio

We added a new experimental feature to Metalama Tools for Visual Studio: integration with Code Lens. The feature shows you how many aspects are applied to any declaration. When you click on the summary, you will get a detailed list of all transformations applied to the declaration. The feature will be developed further after the RTM release according to users' feedback.

![CodeLens screenshot](/assets/images/2022/2022-11-30-metalama/codelens.png#unzoom150)


## LinqPad support

The Metalama driver for LinqPad has been fixed and greatly enhanced this month. The driver allows to query the code model of _any_ .NET project, whether it uses Metalama or not. For Metalama-enabled projects, the driver lets you query the aspect model (aspects, advice, transformations, ...).

![LinqPad screenshot](/assets/images/2022/2022-11-30-metalama/linqpad.png#unzoom200)


## What's next

We are almost done for RC. There is still work with the documentation, the new C# 11 features, and with a few kinds of advice like overriding indexers or introducing generic interfaces.

We have also started the work to port the PostSharp ready-made aspects to Metalama. This is going to be a long-term project, but it's good to see that it's now in progress.

If you want to give Metalama a try, the best way to get quick feedback in real time is to join our [Slack community](https://www.postsharp.net/slack). You can also submit bugs and feature requests from [different channels](https://www.postsharp.net/metalama/support). Your feedback is greatly appreciated as always.


Happy meta-programming with Metalama!

-gael

