---
layout: post 
comments: false
title: "Metalama Status Update, September 2023"
date: 2023-09-29 07:00:01 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2023-98
origin: https://blog.postsharp.net/metalama-status-update-2023-98
author: "Gael Fraiteur"
image: /assets/images/2023/2023-09-29-status/llama.png
summary: "The blog post provides updates on Metalama's software development, including a new logo, simplified licensing for open-source projects, and the anticipated release of Metalama 2023.3. Future plans include compatibility with .NET 8 and C# 12. "
---

Ah, September — the season of fresh starts and nostalgic reflections. For those familiar with my journey, you may recall that PostSharp was my "creative outlet," conceived in 2004 when my first daughter was born. It provided an intellectual diversion during periods when, like many new dads, I found myself navigating unexpected pockets of solitude. Fast forward to this September, and I've just assisted that same daughter in moving into her university dorm. Time certainly does fly!

But let's pivot to software years — they're akin to dog years, accelerating while we humans age more gracefully (or so we like to think). PostSharp, once my pet project, has matured into a seasoned veteran. While we're not introducing many new features, we are updating it for compatibility with the forthcoming .NET 8 platform. Concurrently, Metalama is growing and finding its footing, similar to a young adult carving out their own path. We've refreshed its logo and are incorporating some of PostSharp's best features. Trust me, progress is being made.

## Introducing the Revamped Metalama Logo

As Metalama continues its evolution, we decided it was time for a brand makeover. To bring this vision to life, we collaborated with the renowned graphic designer [James Barnard](https://www.instagram.com/p/CxCkuBSLFmL/).

![New Metalama Logo](/assets/images/2023/2023-09-29-status/metalama-logo.svg)
The new logo has only been active for two weeks, but it already feels as if it has represented us for years.

## Streamlining Open-Source Project Licensing

After rigorous debate within our Slack community, we've simplified the licensing options for open-source projects. Metalama Free will now allow up to three aspect classes per project, regardless of aspect origin — a significant simplification over our prior, more complex system. Additionally, Metalama Free will now offer two new complimentary features: unlimited contract aspects and the ability to debug transformed code.

We are also extending a free namespace-bound license key to open-source projects, granting full access to Metalama's feature set within the scope of those projects. This change will be effective as of Metalama version 2023.3. For additional details, please refer to our [article on the licensing changes](https://metalama.net/blog/metalama-open-source-licensing).

## Metalama 2023.3 Reaches RC Quality Standard

We're excited to announce that Metalama 2023.3 has attained Release Candidate (RC) quality. This version marks the first major feature update since 2023.0, which mainly focused on bug fixes.

Key features include:

* The introduction of two robust, professionally developed open-source aspects: code contracts and caching.
* The ability to call T# templates, known as _auxiliary templates_, from other templates.
* A comprehensive overhaul of `Metalama.Framework.Sdk`.
* Numerous other enhancements and bug fixes.

For a thorough review of this release, you can consult our [July-August 2023 status update](https://metalama.net/blog/metalama-status-update-2023-08). Since then, we've published several builds: [2023.3.7-rc](https://github.com/orgs/metalama/discussions/226), [2023.3.6-rc](https://github.com/orgs/metalama/discussions/223), and [2023.3.5-rc](https://github.com/orgs/metalama/discussions/218).

We anticipate Metalama 2023.3 will reach General Availability by mid-October.

## Previewing Metalama 2023.4

Our development efforts are chiefly aimed at the upcoming Metalama 2023.4 release.

Key features to anticipate include:

* A versatile [options framework](https://doc.metalama.net/api/metalama_framework_options) for configuring aspects through custom attributes or specific fabric-based APIs. This framework is in its final stages of stabilization.
* A new, professionally crafted open-source aspect: `INotifyPropertyChanged`.
* The transition of `Metalama.Framework` to a proprietary source-available license.
* The open-sourcing of `Metalama.Compiler`, our customized fork of Roslyn.

We've released two preview builds: [2023.4.2-preview](https://github.com/orgs/metalama/discussions/224) and [2023.4.1-preview](https://github.com/orgs/metalama/discussions/219).

## Future Roadmap: PostSharp 2024 and Metalama 2024

Aligning with annual traditions, Microsoft unveiled candidates for .NET and C# this past mid-September. We're actively exploring these new technologies with plans to update both PostSharp and Metalama. ARM support is a particular focus for us, considering Microsoft's advancements in this area.

We also aim to merge the Visual Studio extensions for PostSharp and Metalama into a singular, cohesive development experience.

Our goal is to release our own RC shortly after Microsoft announces .NET 8's general availability. We then plan to launch our General Availability (GA) release immediately after the holiday season.

## Summary

In closing, as we shift more aspects from PostSharp to Metalama, we're noticing Metalama's increasing maturity. Most of the bugs we're addressing originate from our own internal tests and development, rather than community reports. This bodes well for the platform's stability.

In the weeks ahead, we'll be updating both PostSharp and Metalama for compatibility with .NET 8 and C# 12. We're also streamlining the Visual Studio extensions for both platforms.

Happy meta-programming!

-gael
