---
layout: post
comments: false
title: "Metalama Status Update (March 2023)"
date: 2023-03-30 09:00:00 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2023-03

author: "Gael Fraiteur"
image: /assets/images/blog/metalama-status-updates/3.jpg
tag: 
summary: "The March 2023 update for Metalama includes improvements to documentation, the introduction of a 'divorce feature' for easy disengagement, support for Roslyn 4.5, and bug fixes. The team is planning a release around May 1st, 2023. "
---

We have been working hard this month to improve the documentation and fix bugs in preparation for a release around May 1st, 2023. We have also added a very last feature that would ease divorcing from Metalama, should the need arise.

## Documentation is a feature

Clear and comprehensive documentation is crucial for a tool as broad and complex as Metalama. That's why we've been working hard to improve our documentation in several ways:

- We added a new chapter on [verifying architecture](https://doc.postsharp.net/metalama/conceptual/architecture), which explains how to use the `Metalama.Extensions.Architecture` namespace to validate source code against your architecture. You'll learn to define architectural rules, such as dependencies or naming conventions, and how to enforce these rules using custom attributes and fabrics.
- We added another new chapter on [using Metalama](https://doc.postsharp.net/metalama/conceptual/using), aimed at developers who participate in projects using Metalama but don't write aspects themselves. You'll learn to install Metalama in your development environment, apply aspects to your code, see which aspects have been applied, and understand and debug your aspect-oriented code.
- We revamped the [documentation website](https://doc.postsharp.net/metalama), integrating the examples and the online sandbox with the documentation, and improving the representation of errors and warnings in source code.

We hope these improvements will make it easier for you to learn and use Metalama. We [welcome your feedback](https://www.postsharp.net/slack) and suggestions on how to make our documentation even better.

## Divorce... also

We have introduced a [divorce feature](https://doc.postsharp.net/metalama/conceptual/divorcing) to Metalama, and it's not what you think. It's not a feature that will send you into a spiraling emotional meltdown, like a real-life divorce. Instead, it's a feature that allows you to part ways with the framework gracefully and efficiently, like a break-up between two adults who have had enough of each other.

With the `metalama divorce` command, the code usually generated in the background during compilation is injected into your source code, leaving you free to exit the framework without experiencing daunting code separation challenges. It's like a considerate ex-partner who helps you pack your bags and move out of the apartment.


## Other fixes and improvements

We fixed around 30 bugs in March 2023, with lower and lower severity. It seems that there is no longer any release blocker. You can see the complete list of bug fixes in the release announcements on our [GitHub discussion board](https://github.com/postsharp/Metalama/discussions/categories/announcements). 

We also added support for Roslyn 4.5, the latest version of the .NET compiler platform. It seems that it only contained bug fixes.

## What's next

We think that Metalama is now mature and we are planning for a release around May 1st, 2023. We will continue focusing on bug fixes, documentation, and the promotional website. We're excited about this release and hope you are too. We want to thank you for your support and feedback throughout this journey. Remember that you can join our [Slack community](https://www.postsharp.net/slack) and chat directly with our team. We believe that Metalama will change the way you write C# code for the better. Stay tuned for more updates, and happy coding!

