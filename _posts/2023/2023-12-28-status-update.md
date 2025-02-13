---
layout: post
comments: false
title: "Reflecting on 2023 and Embracing 2024: Metalama's Journey"
date: 2023-11-30 08:00:01 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2023-12
author: "Gael Fraiteur"
image: /assets/images/2023/2023-12-29-status/llama.png
summary: "This post summarizes the achievements of the Metalama team in 2023. Reminding the context in which the project was born in the middle of the pandemic, it concludes that 2024 will see a different focus, with a shift on marketing instead of on features."
---

In this last business day of 2023, it's time to reflect, anticipate, and feel a little nostalgic. With a quick glance at December 2023, this post lays out the achievements of the past year, marking the completion of a project originally born during the COVID-19 pandemic after 15,000 hours of dedicated engineering work. It also notes our transition into Metalama's necessary next phase, where we'll concentrate more on marketing.

Before you leave this post, please consider completing the [Developer Nations survey](https://developereconomics.net/?member_id=postsharp).

## What's New in December 2023?

Before launching into a year-end reflection and a peek into the future, let's highlight the pivotal events of December 2023.

### Metalama 2024.0 RC and PostSharp 2024.0 RC

We've launched the Release Candidates (RCs) for both Metalama and PostSharp, preparing for their upcoming official releases for .NET. For a more in-depth look at these releases, check out our previous blog post. We're keeping this update brief, as the official release is right around the corner, planned for next week.

### Support Dashboards

To boost our transparency and roadmap visibility, we've made public three of our internal dashboards: the Metalama Kanban, the prioritized bug backlog, and the roadmap.

In October, we made the `Metalama.Compiler` open source and released the source code of `Metalama.Framework` under a source-available license. Earlier this year, we released `Metalama.Extensions` and `Metalama.Patterns` under an MIT license.

While we're unable to make Metalama entirely open-source due to the difficulty of sustaining a business model under such conditions, we firmly believe that if you invest in software, you should reap at least the same benefits as those offered by open-source projects. Therefore, you now have the ability to inspect every single commit we've ever made on Metalama, step into Metalama's source code with the debugger, and explore our management dashboards.

## 2023 In Retrospective

A key highlight of 2023 was the general availability of Metalama on May 3rd, the result of 3 years of intensive work. After reaching this milestone, we spent three months stabilizing the product and started porting aspects from `PostSharp.Patterns` to Metalama.

In line with our annual autumn tradition, we shifted our focus to support the new .NET stack in both PostSharp and Metalama.

To round off the year, we refined our licensing and pricing model, and launched the Metalama Marketplace to index open-source extensions, aspects, and examples.

Now, let's take a detailed month-by-month journey through 2023.

### January

* Open-sourced `Metalama.Extensions`, which now include dependency injection, architecture validation, and PostSharp.IL-compatible multicast.
* Launched the first RC of Metalama.

### February

* Concentrated on documentation, samples, and bug fixes.
* Undertook an unplanned overhaul of the invoker and `IExpression` APIs after documentation work exposed usability issues.

### March-April

* Continued to focus on documentation, samples, and bug fixes.
* Released `metalama divorce`, a vendor-lockout feature that allows you to remove Metalama from your projects.

### May

* Officially launched Metalama on May 3rd, 33 months after the start of the proof of concept in August 2020.
* Witnessed the Metalama Community becoming more active.

### June

* Released Metalama 2023.1 GA, a bug-fixing release with minor API enhancements.
* Began experimenting with office hours.

### July-August

* Released Metalama 2023.2 GA, another bug-fixing release with minor API enhancements.
* Concentrated on porting PostSharp.Patterns to Metalama, identifying and addressing dozens of bugs and usability issues with the Metalama API.

### September

* Simplified the license credit concept.
* Elucidated the open-source offering.
* Introduced a new Metalama logo.

### October

* Launched the Metalama Marketplace, an index of open-source aspects and examples.
* Released Metalama 2023.3 GA, the first release with significant new features:
    - T#: Auxiliary templates allow for calling templates from templates.
    - Metalama.Framework.Sdk allows for using Roslyn from aspects.
* Open-sourced Metalama.Compiler.
* Released Metalama source under a source-available commercial license.
* Most of the team was dedicated to preparing PostSharp.IL and Metalama for .NET 8 and C# 12.    

### November

* Released Metalama 2023.4 GA, featuring:
    - Hierarchical options framework
    - Code contracts (preconditions, postconditions, invariants)
    - Caching
* Continued work on .NET 8 and C# 12.

### December

* Published our support dashboards.


## Metalama's Origins

Metalama kicked off as a "COVID" project in August 2020 when we recognized that the MSIL-rewriting technology underpinning PostSharp was slowly becoming outdated due to advancements in Roslyn extensibility, particularly the new source generators. Maintaining the PostSharp codebase was increasingly challenging, prompting us to embark on a new journey. This project, christened _Caravela_ after the ships that undertook the first trans-Atlantic voyage, symbolized our journey from the familiar MSIL continent to the uncharted Roslyn one. A few months later, two remarkable events unfolded. Firstly, two major features of Caravela demonstrated their potential: adding an extension point to the Roslyn compiler and drafting the C#-to-C# template language, now known as T#. The second event was the partial collapse of the team due to COVID-related political tensions, leaving us without a marketing function. I decided not to attempt to rebuild it during the pandemic, assuming that most companies were in a similar situation to us (can we all start acknowledging that not everything went as smoothly as claimed?). With conferences and user groups cancelled and social media dominated by politics, we redirected the remaining team, post the semi-intentional downsizing, towards Caravela. We continued to support PostSharp for existing customers but refrained from trying to attract new customers.

To date, we have invested over 15,000 hours of engineering work into Metalama. We have done this with organic funding, without resorting to loans or venture capital. Therefore, we can proudly say that we are a pure-play engineering company.

This, however, is not sustainable. The days when innovative and well-crafted products spontaneously attracted attention and were amplified by the community are over. In fact, most influencers in 2024 are more than happy to hype up small improvements of multi-billion dollar products for free, but tend to overlook groundbreaking work by small teams like ours. Social media platforms control and monetize the distribution of information. Although it's easy to become bitter about this, it's simply business. The landscape of what's cool or not is shaped by >11-digit companies. We can do nothing about this - except shift part of our company's focus towards marketing as any company should.

## Moving Towards 2024

Here's our plan. It might not be to everyone's liking.

### Metalama 2024.1

#### Visual Studio Extension Integration

During the first couple of months of 2024, we will be working on Metalama and PostSharp 2024.1. A key goal is to merge the Visual Studio extensions of both products into a single extension. We have a dual agenda. Firstly, we want to capitalize on our leading position in the Visual Studio Marketplace with PostSharp to benefit Metalama. Secondly, we want to deliver a superior development experience for our users, particularly those who use both PostSharp and Metalama (though we advise against using both in the same project). We aim to introduce the Aspect Explorer for Metalama, but also to eliminate UI redundancies between both extensions.

Hence, we plan to release a new version of both Metalama and PostSharp that share the same Visual Studio extension.

#### Performance

We're also focusing on performance improvements in Metalama 2024.1. We've received isolated but worrisome reports about performance issues with Metalama, which we're taking very seriously. We're setting up parametric benchmarks to gain a better understanding of Metalama's performance characteristics with different types of workloads. We're planning to dedicate several weeks to optimizing performance and integrating benchmarks into our engineering and quality practices. We aim for transparency. The next time we receive feedback about performance issues, we want to understand the problem and offer a solution.

#### MVVM Aspects

We plan to complete the aspects that implement INotifyPropertyChanged and XAML commands and properties, which we started back in the Summer but had to pause to focus on .NET 8 and C# 12.

### Moving Forward, More Examples and Ready-Made Aspects

Starting from Metalama 2024.2, our focus will shift from improving the experience for existing customers to attracting new users. So, we won't prioritize filling the last gaps between Metalama and PostSharp.IL. For example, we won't prioritize support for advising the `await` statement and porting the `PostSharp.Patterns.Threading` library. It's not beneficial for customers if we go out of business -- and if we continue striving to build the perfect product without focusing on hiring new users, that's exactly where we're headed. We're not under immediate threat, but if we don't change course, it's inevitable, as it would be for any company.

Instead, we'll create more examples and ready-made aspects. We'll focus more on breadth than depth. Our goal won't be to provide well-designed and well-tested aspect libraries as we did in the past, but rather to offer inspirational but finish-it-yourself examples. This is completely aligned with our strategy of releasing all extensions and ready-made aspects under an open-source license, allowing anybody to tailor them to their liking.

We're not stopping the development of new Metalama features. Instead, we're zeroing in on features that open up fresh use cases. For instance, we're targeting type introductions, an area where Metalama currently trails behind Roslyn source generators. We'll also plug the most noticeable gaps, particularly around constructors. Rest assured, we'll diligently address any bugs reported by our valued community.

### Content Marketing

We'll devote part of our development energy towards delivering a robust content marketing strategy. We aim to create articles that cover topics directly or indirectly linked to Metalana and PostSharp. So, expect our blog to be buzzing with a greater number of posts post-winter, covering a wide range of topics, not just confined to our products.


## Developer Nation Survey

<img src="/assets/images/2023/2023-12-29-status/survey.png" class="largeThumbnailFloatRight"/>

One last thing before we call this a year.

We have partnered with the Developer Nation survey in a deal of mutual promotion. We already got 400 visitors from them, so it's our turn to throw the ball!

Please take a moment to answer a set of [no-nonsense questions](https://developereconomics.net/?member_id=postsharp) about programming languages, developer tools, and platforms. Discover new emerging technologies as you answer and go deeper into your domain of expertise.

Your answers will help people at the service of developers spot new trends and build better tools to support software creators.

In return, you can win an Apple MacBook Pro 13-Inch (M2), Asus Chromebook C223, Keychron K2 Wireless Mechanical Keyboards (Version 2), MX Master 3S mouse, CoPilot 12 months subscription, or an Amazon, Apple, ExpressVPN gift cards. Plus, everyone who completes the survey will get a free virtual goody bag with access to free resources -- including a 50% discount on a Metalama discount.

They have been nice to us. Please do them a favor and [take the survey today](https://developereconomics.net/?member_id=postsharp). 

## Conclusion

If there's a hint of nostalgia in this post, it's because it's truly there. As engineers, we've been fortunate to focus almost entirely on greenfield development for the past three years. We're immensely proud of what we've achieved. The feedback from anyone who has invested a couple of hours in understanding our product has been overwhelmingly positive. However, we recognize the need to adopt a more pragmatic approach now. Our aim is to attract new users and grow our community to a wholesome size.

We're thankful for your unwavering support. Every encouraging word matters to us. A special shout-out to our VIP community members for their extraordinary dedication.

Here's to a fantastic 2024!
