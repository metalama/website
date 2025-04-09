---
layout: post 
comments: false
title: "Announcing Metalama RC"
date: 2023-01-25 08:00:01 +01:00
categories: [Metalama]
permalink: /blog/metalama-2023.0-rc
author: "Gael Fraiteur"
image: /assets/images/blog/metalama-status-updates/1.jpg
tag: 
summary: "The first Release Candidate of Metalama, a Roslyn-based meta-programming framework for aspect-oriented programming and architecture validation, has been announced. It aims to improve developers' productivity and code quality."
---

Today, we're thrilled to announce the first Release Candidate of [Metalama](https://www.postsharp.net/metalama), our new Roslyn-based meta-programming framework for [aspect-oriented programming](https://www.postsharp.net/solutions/aspect-oriented-programming) and architecture validation.

## About Metalama

If you haven't heard about it yet, Metalama is our new meta-programming framework for C# that focuses on improving developers' productivity and code quality thanks to **boilerplate code reduction** through [aspect-oriented programming](https://www.postsharp.net/solutions/aspect-oriented-programming),  **coded architecture validation** and a **custom refactoring toolkit**. Metalama is based on Roslyn and integrates with most C# IDEs and editors. You can learn more about it on our [website](https://www.postsharp.net/metalama) or your can [try it online](https://try.metalama.net).

While Metalama is the successor of PostSharp, it is not yet a replacement. We do not recommend migrating your projects from PostSharp to Metalama at this time unless you're certain that all the features you need are already available. We're working on this, and for more details, please see our [migration guide](https://doc.metalama.net/migration/migration). Rest assured, we're still committed to maintaining and supporting PostSharp, as evidenced by the recent release of [PostSharp 2023](https://metalama.net/blog/postsharp-2023).

## About this RC

Our first version will be numbered `2023.0`, since [we've switched to year-based versioning](/blog/post/year-versioning).

The Release Candidate milestone signals that Metalama is code-complete, has no severe bugs, and has not required any destabilizing refactoring in the past weeks. Users of the preview version have given us positive feedback, and Metalama has already been deployed to some development teams for production work. 

As an engineering company at heart, the Release Candidate milestone holds great importance to us. We began working on Metalama in August 2019 and have dedicated the majority of our efforts towards this project since January 2020. Metalama represents a major achievement for us, and we are incredibly proud of it.

We would like to express our sincerest gratitude to everyone who has tried Metalama, provided feedback, and reported bugs during the past few months. Our utmost appreciation goes to Marc Kruse, who created an outstanding suite of aspects for his ORM-based application and reported an impressive 80 tickets. We would also like to give special thanks to Vladut Alecsandru and his colleagues, Peter Hevesi, Goran Siska, and YBAZAN for their invaluable feedback. You can connect with these fine developers in our [Slack community](https://www.postsharp.net/slack).

## New Pricing Model

In addition to the release of Metalama, we're also unveiling a new pricing model. A powerful and completely free edition is available, with commercial options ranging from $40 to $400 per developer, depending on the product edition and the number of concurrent developers. We're also releasing several components and extensions of Metalama as open-source projects, and we plan to release the migrated `PostSharp.Pattern` aspect libraries as open-source projects as well. For details about the new pricing model, read our [announcement](/blog/post/metalama-pricing).


## What's New Since the last update

If you have been following the monthly status updates, here is what's new since our last report.

Since December 1st, we have addressed approximately 100 bug fixes or small enhancements. For details, see the [change log of individual builds](https://github.com/postsharp/Metalama/discussions/categories/announcements). We have also completed minor user stories like:

* Handling of `[CallerMemberName]` custom attributes.
* Moving `Metalama.LinqPad` to its own repository and made it open source.
* Adding conditionally inheritable aspects (`IConditionallyInheritableAspect`).
* Disabling obfuscation.
* Renaming the `metalama-config` CLI tool to `metalama` and improving it.
* Adding support for local functions in templates.
* Adding limited support for introducing generic interfaces from aspects.
* Allowing customization of the appearance of the aspect in the IDE code refactoring menu with the `[EditorExperience]` custom attribute.

The only big addition of the last 2 months is the long-awaited  **Architecture Validation** component, released under an MIT license in the [Metamama.Extensions](https://github.com/postsharp/Metalama.Extensions/tree/master/src/Metalama.Extensions.Architecture) repo. The documentation for this component is still being written. In summary, there are two ways to use this package:


1. By adding to your code one of the following architecture custom attributes from the `Metalama.Extensions.Architecture.Aspects` namespace:
    * `[CannotBeUsedFrom]`
    * `[CanOnlyBeUsedFrom]`
    * `[InternalsCannotBeUsedFrom]`
    * `[InternalsCanOnlyBeUsedFrom]`
    * `[Experimental]`
    * `[InternalImplementOnly]`
    * `[DerivedTypesMustRespectNamingConvention]`
    * `[DerivedTypesMustRespectRegexNamingConvention]`

2. By using fabrics, for instance:


    ```cs
        namespace SomeNamespace;

        using Metalama.Extensions.Architecture.Fabrics;
        using Metalama.Framework.Fabrics;

        public class Fabric : NamespaceFabric
        {
            public override void AmendNamespace( INamespaceAmender amender )
            {
                amender.Verify().InternalsCanOnlyBeUsedFrom( UsageRule.OwnNamespace );
            }
        }
    ```

## What's Next

Before announcing General Availability, we will continue to fix bugs and complete the documentation and the product website, in preparation for the commercial launch of the product. We will continue to provide support in our [Slack community](https://www.postsharp.net/slack) or on [GitHub](https://github.com/postsharp/Metalama/issues) and swiftly fix any reported bug. We will no longer accept enlarging the scope of this version.

## Summary

We believe that Metalama will transform the way developers write code and, in particular, how senior developers and architects optimize their team's workflow and improve quality and productivity. 


Today marks a major achievement for our company as we reach a significant engineering milestone. As a company run by engineers for engineers, this is a particularly meaningful day for us. After extensive testing and feedback from internal and external sources, we are confident that Metalama is ready for use in real-world projects. We have received positive feedback from satisfied users, and any bugs encountered will be addressed promptly. If you're starting a new project, now is the perfect time to integrate and learn Metalama.


