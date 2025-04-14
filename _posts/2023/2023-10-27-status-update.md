---
layout: post
comments: false
title: "Metalama Status Update, October 2023"
date: 2023-10-30 08:00:01 +01:00
categories: [Metalama]
permalink: /blog/metalama-status-update-2023-10
origin: https://blog.postsharp.net/metalama-status-update-2023-10
author: "Gael Fraiteur"
image: /assets/images/2023/2023-10-20-open-sourcing/october.png
summary: "Metalama released updates for its software, including the significant feature leap in Metalama 2023.3 and the first RC of Metalama 2023.4. The company also unveiled the Metalama Marketplace for open-source aspects, extensions, and examples."
---

As October draws to a close, we find ourselves amidst a flurry of AI-generated llamas rather than falling leaves. This month has been so eventful that almost every point we're about to discuss has already been covered in its own article and fancy illustration.

## Metalama 2023.3 GA

<img src="/assets/images/2023/2023-10-17-metalama-2023-3/llama.png" class="thumbnailFloatRight"/>

We celebrated the release of Metalama 2023.3 on October 17th, marking the most significant feature leap since our inaugural 2023.0 release. This version introduces [auxiliary T# templates](https://doc.metalama.net/conceptual/aspects/templates/auxilliary-templates), enabling T# templates to call other templates, and seamless integration with the Roslyn API through [Metalama.Framework.Sdk](https://doc.metalama.net/conceptual/sdk). It also features a [simplified licensing model](https://metalama.net/blog/metalama-open-source-licensing), along with numerous other enhancements and bug fixes. The added support for the Visual Studio Code C# Dev Kit and a significant performance boost make this update a substantial step towards an optimized development experience.

More details can be found [here](https://metalama.net/blog/metalama-2023-3-ga).

___

## Metalama 2023.4 RC

We published the first RC of Metalama 2023.4, which features a versatile [options framework](https://doc.metalama.net/conceptual/aspects/configuration) for configuring aspects through custom attributes or specific fabric-based APIs. We have refined three open-source aspect libraries: [code contracts](https://doc.metalama.net/patterns/contracts), [caching](https://doc.metalama.net/patterns/caching), and [memoization](https://doc.metalama.net/patterns/memoization). Work has commenced on an [observability aspect](https://doc.metalama.net/api/metalama_patterns_observability_observableattribute) implementing `INotifyPropertyChanged`. We have also ensured that the future update of Visual Studio will not disrupt Metalama.

## Metalama 2024.0 WIP

Further open-source work is in progress in the [Metalama.Patterns](https://github.com/postsharp/Metalama.Patterns/tree/develop/2024.0) repo where we are building aspects for XAML commands and dependency properties. A preview of these new libraries will likely be available in 2024.0.

However, the most important focus for Metalama 2024.0 will be support for .NET 8 and C# 12. We aim to publish an RC within days after Microsoft's own GA release.

## PostSharp 2024.0 Preview

Despite the llama frenzy, our loyal PostSharp users have not been forgotten! We tested PostSharp with the first RCs of .NET 8 and C# 12 and have made progress in supporting ARM64 development and build machines. Work is still in progress, but you can already download the first bits from NuGet.

## Metalama Framework: Source Available

<img src="/assets/images/2023/2023-10-20-open-sourcing/source-available.png" class="thumbnailFloatLeft"/>

We have released the source code of Metalama.Framework on GitHub under a proprietary source-available license. This initiative aims to provide transparency into the inner workings of Metalama while maintaining commercial viability. This step simplifies debugging and troubleshooting, enriches the learning experience, and fosters a higher level of trust and auditability.

More details can be found [here](https://metalama.net/blog/source-available).

___

## Metalama Compiler: Open-Sourced

<img src="/assets/images/2023/2023-10-20-open-sourcing/llama-and-octopus.png" class="thumbnailFloatRight"/>

Our journey towards transparency and collaboration continues with the release of Metalama.Compiler, our unique Roslyn fork that allows dynamic code modification during compilation, under its original MIT license. This is an excellent opportunity for SyntaxNode enthusiasts to engage in some real, low-level metaprogramming.

More details can be found [here](https://metalama.net/blog/open-sourcing-metalama-compiler).

___

## Unveiling the Metalama Marketplace

<img src="/assets/images/2023/2023-10-20-open-sourcing/marketplace.png" class="thumbnailFloatLeft"/>

To fulfill our commitment to an open-source Metalama ecosystem, we are announcing the [Metalama Marketplace](https://www.postsharp.net/metalama/marketplace). This bustling hub allows developers to share and search for open-source aspects, extensions, and examples for Metalama. At its launch, it already hosts 17 libraries and examples, including the high-quality implementations of code contracts, caching, memoization, and INotifyPropertyChanged aspects mentioned above.

___

We will continue to deliver more open-source aspects to the community, all of which will be compatible with the free edition of Metalama. Our vision is to foster a tripartite win-win-win relationship among free and commercial users, open-source projects, and our company.

More details can be found [here](https://metalama.net/blog/marketplace).


