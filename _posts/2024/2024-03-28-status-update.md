---
layout: new-post
comments: false
title: "Metalama Status Update, March 2024"
date: 2024-03-28 08:00:01 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2024-03
origin: https://blog.postsharp.net/metalama-status-update-2024-03
author: "Gael Fraiteur"
image: /assets/images/2024/2024-03-28-status/2024-03-dark.svg
thumbnail: /assets/images/2024/2024-03-28-status/2024-03-light.svg
summary: "In this status update, we cover the launch of our first Release Candidate for Metalama 2024.1, and our community activities, including our conversations with .NET Rocks and Technology and Friends. We'll also highlight a significant contribution from Byte217."
---

As Easter approaches, we have published Metalama 2024.1 RC with a focus on Visual Studio tooling, working with constructors, and performance. March was eventful for our community, featuring two podcast appearances and a contributed article.

## Updates in Metalama 2024.0

Metalama 2024.0 seems to be pretty stable at the moment. We have issued two maintenance releases addressing just 5 bugs:

* [2024.0.10](https://github.com/orgs/metalama/discussions/273)
* [2024.0.11](https://github.com/orgs/metalama/discussions/275)

## Metalama 2024.1 Reaches Release Candidate

We're excited to announce the release of the [first RC of Metalama 2024.1](https://github.com/orgs/metalama/discussions/277). The RC is the most important milestone for the development team. It signifies that all new features have been completely coded and tested, including on virtual machines and physical devices.

It's a good time to test-drive the release in a separate branch of your product and report any issues. You can download the extension from [OneDrive](https://1drv.ms/u/s!AiDyReaGUXn5qJM8QwaIw-T5zm0Gzg?e=sQmfZS) and update the packages from nuget.org. Please see the note below regarding Visual Studio Tools for Metalama and PostSharp.

[Last month](https://metalama.net/blog/metalama-status-update-2024-02), we introduced some key features and improvements:

* Design-time support for introducing and pulling constructor parameters.
* `Metalama.Extensions.DependencyInjection`: Capability to unregister `LoggerDependencyInjectionFramework`.
* License audit now also uploads anonymous data to the Matomo analytic service.
* Registration for the newsletter through the Metalama web UI is now live.
* A unified Visual Studio extension for both PostSharp and Metalama.
* Enhanced build-time performance.

This month, we've added more improvements into the mix:

* C# 12.0 primary constructors can now be overridden.
* C# 12.0 primary constructors can now have initializers and contracts.
* Numeric contracts in `Metalama.Patterns.Contracts` underwent significant refactoring.
* Parameter contracts are now grouped by parameter index.
* Return parameter contracts are now arranged to match the order of parameter contracts.
* Refactoring of numeric contracts in `Metalama.Patterns.Contracts`.
* Visual Studio Extension (VSX)
  * Now supports VS2019 16.11 (PostSharp-only).
  * The UI will display an initial setup wizard when Visual Studio is first opened with the extension installed.
  * Learning Hub now includes content for Metalama, and we're adding even more.
* We've squashed countless bugs in the preview.

### Visual Studio Tools for Metalama and PostSharp

The most notable feature of both Metalama 2024.1 and PostSharp 2024.1 is the unification of their Visual Studio tooling into a single extension named _Visual Studio Tools for Metalama and PostSharp_.

Please bear in mind the following:

⚠️ Before installing the new unified extension, make sure to uninstall the Metalama extension to prevent conflicts.

⚠️ To fully utilize the Aspect Explorer feature, ensure you update your packages to the latest Metalama preview.


## Community

### .NET Rocks

<img src="/assets/images/2024/2024-03-28-status/CarlAndRichardLogo-bw2.jpg" alt="Carl and Richard" class="thumbnailFloatRight" style="width:50%"/>

I was honored to be interviewed by Carl Franklin and Richard Campbell for [.NET Rocks episode 1890](https://www.dotnetrocks.com/details/1890), a leading talk show for .NET Developers. We discussed code generation, [aspect-oriented programming](https://www.postsharp.net/solutions/aspect-oriented-programming), and Roslyn extensibility. It was our first meeting since we started working on Metalama.

Both Carl and Richard seemed quite impressed with the product. A huge thank you for your support! It truly makes a world of difference!

[Listen to our conversation here.](https://www.dotnetrocks.com/details/1890)

### Technology and Friends

<img src="/assets/images/2024/2024-03-28-status/david.png" alt="David and Gael" style="width:50%" class="thumbnailFloatLeft" />

This month, we made it to not one, but two talk shows!

David Giard invited me to another episode of his Technology and Friends video podcast for [episode 793](https://www.youtube-nocookie.com/watch?v=Xr7_PzQQUX0), where, of course, we talked about Metalama.

David and I go way back. We recorded our first episode together twelve years ago in his home user group in Michigan, which is one of the best I've attended. A few years ago, David visited Prague and we had a fantastic time together. Thanks, David!

[Watch the episode here.](https://www.youtube-nocookie.com/watch?v=Xr7_PzQQUX0)

### Logging by Byte217

<img src="/assets/images/2024/2024-03-28-status/ed.jpeg" alt="Ed Schimmel" style="width:25%" class="thumbnailFloatRight" />

Ed Schimmel, also known as Byte217, published a meticulously detailed article about [logging with Metalama](https://byte217.com/logging-aop-and-metalama/). The article explains how to serialize method arguments as a JSON dictionary and properly handle ref and out parameters. Thank you, Ed, for your valuable contribution!

[Read the article here.](https://byte217.com/logging-aop-and-metalama/)


## Wrapping Up

After four months of hard work, we're proud to announce the first RC of Metalama 2024.1 featuring a unified user interface with PostSharp, along with several other improvements, particularly around constructors and performance.

Our community presence was strong this month with two podcast appearances and a noteworthy community article.

A big thank you to everyone for your continued support!
