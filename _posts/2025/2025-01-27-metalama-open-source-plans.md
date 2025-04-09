---
layout: new-post
comments: false
title: "Metalama 2025.1 Will Be Open-Source"
date: 2025-01-27 08:00:00 +01:00
categories: [Metalama]
permalink: /blog/metalama-open-source-plans
author: "Gael Fraiteur"
image: /assets/images/2025/2025-01-open-source/metalama.svg
tag: featured
summary: "Metalama 2025.1 will be free and open-source. Its IDE tooling and some extensions will be sold under a proprietary license."
---

We’re thrilled to announce that **Metalama**, the most complete and innovative meta-programming framework for .NET, will soon become a free and open-source project. This is a major milestone for us and the .NET community, and we’re excited to share our plans and gather your feedback as we move forward.

## What is Metalama?

[Metalama](https://www.postsharp.net/metalama) is a framework that enables developers to write cleaner, more maintainable code by automating repetitive tasks and enforcing architectural rules. Built on top of Roslyn, it allows you to write classes called _aspects_ that modify other code at compile time, reducing boilerplate and improving productivity—typically by 15%.

Metalama provides a unique combination of simplicity, power, and extensibility thanks to its innovative, [type-safe C#-to-C# code templates](https://doc.metalama.net/conceptual/aspects/templates) that let you add new behaviors to hand-written code.

After over ten person-years of work, it is now a stable and mature product, and we’re ready to share it with the world.

If you haven't heard about Metalama before, you can give it a try now and follow this [getting started guide](https://doc.metalama.net/conceptual/getting-started), knowing that most features will soon be free and open-source.

## Why open source?

We believe that open-sourcing Metalama will remove barriers to adoption and foster innovation within the .NET community. Over the past year, we’ve seen how difficult it can be for a framework to gain traction with a commercial-first approach. By making Metalama open-source, we aim to:

- Encourage broader adoption and experimentation.
- Build a vibrant community of contributors and users.
- Ensure the long-term sustainability of the project through a new business model focused on tooling, extensions, and support.
- Empower the community to shape Metalama’s future, with our continued commitment to its development and maintenance.

## What’s changing?

As we transition Metalama to our new model, you will see that most of the components will be made open-source, while a few will stay proprietary.

### Open-source components

We’re open-sourcing the majority of Metalama, including:

- **Metalama.Compiler**: Our Roslyn fork allowing for code transformation.
- **Metalama.Framework**: The core meta-programming framework.
- **Metalama.Extensions**: Support for dependency injection and metrics.
- **Metalama.Testing**: Our unit testing frameworks.
- **Metalama.Patterns**: A collection of ready-made aspect libraries.
- **Metalama.LinqPad**: A LINQPad driver for querying .NET solutions.

We are leaning toward the **Apache 2.0** license, but this decision is not final.

### Proprietary components

To ensure the project’s sustainability, some components will remain proprietary, including:

- **Visual Studio Tooling**: Free for non-commercial use and small teams (up to 3 users per organization).
- **Architecture Validation**: Advanced library for verifying hand-written code against architectural rules.
- **Code Fixes and Refactorings**: Automated fixes for warnings reported by aspects.

These components will be available through our commercial offerings.

## Our commercial offering

To fund the ongoing development and maintenance of Metalama, we’ll offer four editions:

| Edition         | Price               | Features                                                                 | Support Level          |
|-----------------|---------------------|--------------------------------------------------------------------------|------------------------|
| **Open Source** | Free                | Core framework<br/>Testing frameworks<br/>Most extensions<br/>All aspect libraries          | Community support      |
| **Community**   | Free for: <br/>- non-commercial use, <br/>- individuals, <br/>- teams of 3 or less.               | Open-source features <br/>+ Visual Studio Tooling                             | Community support      |
| **Professional**| From $95/user/year  | Community features<br/>+ Architecture Validation<br/>+ Code Fixes                 | Basic professional support |
| **Enterprise**  | From $5,000/year for 15 users  | Professional features  | Full support<br/>Access to source code<br/>Long-term maintenance       |

## Dual licensing model and long-term maintenance

To support both open-source and commercial users, we’re adopting a dual licensing model:
- New developments and bug fixes in the latest version will always be open-source.
- Maintenance of older versions will be available under a proprietary license for professional and enterprise customers:
    - Metalama Professional: 6 months back,
    - Metalama Enterprise: 2 years back for LTS versions.

This approach ensures that Metalama remains sustainable while giving the community access to the latest innovations.

## Contributed pull requests

We intend to encourage and accept pull requests from the community into our main repos as long as they meet the same quality criteria we apply to ourselves.

You’ll need to sign a **Contributor License Agreement (CLA)**, similar to the one used by the .NET Foundation. This ensures we can continue to offer long-term support to enterprise customers.

## Timeline

Here’s what to expect in the coming months:

- **Late February 2025**: First open-source preview release.
- **April 2025**: General availability of Metalama 2025.1.

We’ll share regular updates on our progress.

## Why this matters

We think this could become one of the biggest news in 2025 for the .NET community.

Metalama will be one of the largest and most complex non-Microsoft open-source projects in .NET.

But this is significant even beyond the .NET ecosystem. Metalama brings many innovations in the realm of meta-programming. It is the most advanced implementation of the concepts behind aspect-oriented programming, but completely reimagined for a modern programming language.

## What’s next?

We're now in the process of reorganizing our codebases. We’re eager to hear your feedback and ideas as we finalize our plans. Share your thoughts on [GitHub](https://github.com/orgs/metalama/discussions/388) or join the conversation in our [Slack workspace](https://www.postsharp.net/slack).

If you haven't tried Metalama before, you can start today, keeping in mind that a few namespaces will not be open-sourced.

Together, we can build a thriving ecosystem around Metalama that benefits the entire .NET community. Thank you for being part of this journey!
