---
layout: post
comments: false
title: "Introducing the Metalama Marketplace: A Triple Win"
date: 2023-10-23 09:00:01 +01:00
categories: [Metalama]
permalink: /blog/marketplace
author: "Gael Fraiteur"
image: /assets/images/2023/2023-10-20-open-sourcing/marketplace.png
mermaid: true
tag: featured
summary: "Metalama has launched a marketplace for open-source extensions, offering 19 libraries and samples at launch. The platform encourages community contributions and offers free, namespace-bound licenses for all open-source projects."
---

We are excited to announce the launch of the [Metalama Marketplace](https://www.postsharp.net/metalama/marketplace). This platform enables you to explore selected open-source extensions for Metalama and share your own creations. At the time of launch, we have made 19 libraries and samples available, and more are in preparation.

## Open-Source Extensions: A Shift from PostSharp

Throughout our 15-year journey with PostSharp, we noticed that users often crafted similar aspects with slight variations to cater to their unique needs. Despite our provision of high-quality solutions for common patterns, users frequently favored their custom versions, which were available in PostSharp Ultimate for an additional fee.

With Metalama, we are adopting a new approach. We continue to offer extensions, but now they are open source. This change enables users to access ready-made, high-quality extensions and modify them as needed. Unlike PostSharp, Metalama charges you based on the _number_ of aspect classes in your project, not on the complexity or creator of the aspect. Moreover, contracts are always free of charge.

All extensions and aspects we build for Metalama will remain open-source.

## Educational Examples

The Metalama Marketplace indexes a wide range of examples. While they may not be ready for production, they either represent best practices for various use cases or aim to stimulate your imagination.

## Community Contributions

We envision a community rich in diverse contributions:

* **Reusable Aspect Libraries**: For example, Dom Sinclair's well-documented [logging library](https://www.postsharp.net/metalama/marketplace?metalama-marketplace%5BrefinementList%5D%5Bauthor%5D%5B0%5D=Vtl%20Software&metalama-marketplace%5BrefinementList%5D%5Bcategories%5D%5B0%5D=Logging).
* **Project-Specific Aspects**: Extensions originally created for a specific project that can be adapted or serve as inspiration for others.

All community-led open-source projects are eligible for a free, namespace-bound license key, which you can check into your source code in your `Directory.Build.props` file.

To contribute, please contact us on [Slack](https://www.postsharp.net/slack) or via email. Alternatively, you can submit a PR to the [Metalama.Marketplace](https://github.com/postsharp/Metalama.Marketplace/tree/master/entries) repository with your data.

## Ensuring Quality

The marketplace is curated. Our team reviews every contribution, and we assign a quality badge. Exceptional libraries that meet our high standards, akin to those at PostSharp Technologies, receive the "Metalama Certified" label. These standards include thorough testing, comprehensive documentation, and compile-time error reporting. Projects can apply for this certification free of charge, and it is reviewed annually.

## A Triple Win

At the heart of the Metalama Marketplace lies a simple vision: bringing together diverse talents, energies and interests for shared success.

<div class="mermaid">
flowchart TD

Metalama -- provides\nfree license for --> OpenSource
Metalama -- massively\ncontributes to --> OpenSource
Users -. pays\nlicense fees to .-> Metalama
Metalama -- grants\nfree tier for --> Users
Metalama -- enhances\nproductivity of --> Users
OpenSource -- enhances\nproductivity of --> Users

OpenSource[Open Source]
</div>

- **Users** can utilize up to three aspects for free, regardless of their authors -- themselves, community projects, or the Metalama team.

- **Open-Source Projects** enjoy the benefits of Metalama's complimentary namespace-bound license, unlocking all features at no cost. Community contributions enrich the ecosystem, and we're here to support that collaboration. We also massively contribute to open-source Metalama extensions through the `Metalama.Extensions` and `Metalama.Patterns` namespaces.

- **Metalama Thrives**: As our user base grows and recognizes the platform's value, those desiring more aspects have the option of a higher edition. This helps sustain our development and regular updates, providing the community with the features and the stability they rely on.


Join us in exploring the next phase of meta-programming with the Metalama Marketplace.

-gael


