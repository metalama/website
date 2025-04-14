---
layout: post 
comments: false
title: "Metalama Status Update, May 2023"
date: 2023-05-30 08:00:01 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2023-05
origin: https://blog.postsharp.net/metalama-status-update-2023-05
author: "Gael Fraiteur"
image: /assets/images/blog/metalama-status-updates/4.jpg
summary: "Metalama, a Roslyn-based meta-programming framework, was successfully launched in May 2023. The team is now focused on bug-fixing for Metalama 2023.1 and 2023.2, and enhancing community platforms and website."
---

May bloomed with beauty and excitement, setting the stage for a long-awaited event — the release of Metalama, our new Roslyn-based meta-programming framework, on May the 4th! With 2.5 years of dedicated effort poured into this product, its launch marked a significant milestone for our team. Fortunately, the release went smoothly, with only minor bugs reported, aside from a slightly embarrassing but now fixed glitch following the release of Visual Studio 17.6.

## Metalama 2023.1 Previews

In the wake of the general availability of Metalama 2023.0, we wasted no time introducing the initial previews of Metalama 2023.1, a bug-fixing release. Our development timeline for the summer includes two to three bug-fixing releases, consisting of six weeks of development followed by three weeks of RC (Release Candidate) testing, amounting to a total of nine weeks. Consequently, the RC for Metalama 2023.1 is scheduled for June 5th!

## Roadmap

Looking forward, Metalama 2023.2 will focus primarily on bug fixing. Like Metalama 2023.1, this version will follow a nine-week development cycle with a flexible scope. Our main objective remains the resolution of bugs, ensuring we tackle the extensive backlog of minor issues before advancing with new feature implementations.

In 2023.2, we also want to incorporate a few new minor features based on user feedback. For instance, we want to improve the experience with weaver-based aspects, which allow you to perform arbitrary code transformations thanks to the Roslyn API. Caution: It voids the warranty!

Once we have completed the bug-fixing phase and beyond the horizon of the 2023.2 release, we will focus on the following priorities:

1. Merging the PostSharp and Metalama Visual Studio extensions to create a unified experience and enhance Metalama's IDE features to match those of PostSharp.
2. Porting pattern libraries for which Metalama is already equipped, such as Contracts, NotifyPropertyChanged, XAML, and Caching. We intend to release these ported pattern libraries under the open-source MIT license.

The threading pattern libraries' complexity warrants a longer wait, primarily because it requires the aspect framework to be able to advise the await keyword. As for logging, Metalama currently boasts excellent logging capabilities without the need for the port of `PostSharp.Patterns.Diagnostics`. Hence, we consider it a lower priority. Nevertheless, we are open to hearing your thoughts on this matter, so please don't hesitate to share your opinion.

## Support policies updated

Kindly be aware that we have revised our support policies due to the rapid release cycle of Metalama. Moving forward, we will only provide maintenance and support for three product versions simultaneously, generally including a stable version, a release candidate (RC), and a preview version. Our previous policy ensured maintenance for two months after the subsequent version's general availability (GA). However, this policy is incompatible with our current 9-week release cycle.

## Website

Together with the Metalama release, we have made updates to our website. The blog and documentation sections are now integrated into the main navigation and provide a smoother user experience. Additionally, we have made some improvements to the [community portal](https://www.postsharp.net/community) to emphasize the contributions of everybody.

## PostSharp bugfixes

Besides the work on Metalama, we have released a patch of PostSharp 2023.0, fixing a rare condition when referencing managed C++ assemblies.

## Community

I want to express my gratitude to all the community members who have provided valuable feedback and contributions. Whether it's bug reports, articles, examples, or even just a heads-up on obscure documentation, every bit of input has been beneficial and encouraging. 

I highly recommend checking out Dom Sinclair's delightful article, [The Art of Logging](https://domsinclair.github.io/art/2023-05-16-artoflogging). And if that was not enough, Dom is currently working on a [semantic logging aspect](https://github.com/domsinclair/VtlSoftware.LoggingWithStringHandler) for Serilog that utilizes the new [interpolated string handler](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/tutorials/interpolated-string-handler) feature of C# 10.

To support the growth of our community, we have created a server on [Discord](https://www.postsharp.net/discord), the most popular community platform among developers. However, since some people prefer using [Slack](https://www.postsharp.net/slack), we will run two separate communities for now - one on Slack and the other on Discord. GitHub remains the preferred place to file bugs and feature requests after a good discussion on Slack or Discord. The other social platforms, Twitter and LinkedIn, will be used for announcements, and we expect little interaction to happen there.

We plan to conduct regular office hours featuring Q&A, status updates, and occasional demos by the Metalama team and the community. The specifics are yet to be determined. We invite you to join us on either  [Discord](https://www.postsharp.net/discord) or [Slack](https://www.postsharp.net/slack) to get informed.


## Summary

May was an eventful month for us with the successful launch of Metalama and revamping our website and community platforms. Thankfully, the launch was smooth, with only minor bugs reported and quickly resolved. We have shifted our focus to fixing minor bugs with Metalama 2023.1 and 2023.2. 
  

  

