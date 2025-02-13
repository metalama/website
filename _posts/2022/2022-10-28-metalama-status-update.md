---
layout: post 
comments: false
title: "Metalama Status Update (October 2022)"
date: 2022-10-27 09:00:00 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2022-10
author: "Gael Fraiteur"
image: /assets/images/2022/2022-02-23-metalama/metalama-2.svg
summary: "The October 2022 update for Metalama includes fixing 85 bugs, improving performance, and filling minor API gaps. Work has begun to streamline migration from PostSharp to Metalama, and new features have been added. Future plans involve further bug fixes and feature enhancements."
---

We spent most of October fixing bugs -- a whopping 85 in total, published in 10 builds, just this month. We also improved performance and filled minor API gaps. This time, we did not have to perform any significant refactoring and, as you can judge from the numbers, our pace was greatly accelerated. 

## Bug fixing

We successfully completed brute force testing on [NopCommerce](https://github.com/nopSolutions/nopCommerce), a large open source project with a .NET codebase. It uncovered a dozen of defects that are now fixed, and provided a large-scale use case for performance testing and tuning.

There are still a few severe bugs and a few challenges in the design-time (code editing) experience due to random, hard-to-reproduce situations.

On a side note, we have been working on PostSharp 6.11, which will support .NET 7.0 and C# 11. It took some resources away from Metalama, but it shows our complete commitment to support and maintain PostSharp in the upcoming years.

## PostSharp migration

We started the work to streamline the migration of projects from PostSharp to Metalama and have published the [PostSharp API Annotated for Migration to Metalama](https://doc.postsharp.net/metalama/migration-api). This work is not completed: we still want to write a conceptual documentation for the migration, and a Metalama replacement for PostSharp aspect multicasting so that customers who have dozens of usages of multicast attributes do not need to rewrite every single one of them.

It is still not recommended to migrate your project from PostSharp to Metalama unless you have some spare time, want to help us, or simply want to have fun -- because Metalama is fun!

## New features

This is a pretty short list, which I think is good news:


* **Ability to add compile-time packages**: you can now use any .NET Standard 2.0 project at compile time by including them as a [MetalamaCompileTimePackage ](https://doc.postsharp.net/metalama/aspects/templates/template-compile-time#calling-other-packages-from-compile-time-code) item in your `csproj`.
* **Support for packages.config**: you can now use Metalama with legacy projects as long as the target framework is compatible with .NET Standard 2.0.
* `IAdviceFactory.Override(IMethod)` now works with property and event accessors.



## What's next

In November, we will continue fixing bugs like crazy, filling the remaining gaps, and easing the migration from PostSharp. Our objective is to have one or two RCs before Christmas, which I think is realistic.

We will also post a preview of PostSharp 6.11.

We hope to welcome new beta users on our open [Slack community](https://www.postsharp.net/slack) -- the best way to get quick feedback in real time. You can also submit bugs and feature requests from [different channels](https://www.postsharp.net/metalama/support). Your feedback is greatly appreciated and is guaranteed to have a large impact on the final product.


Happy meta-programming with Metalama!

-gael

