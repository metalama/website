---
layout: new-post
comments: false
title: "Metalama Is Now Open Source, Adding Full Meta-Programming to C#"
date: 2025-04-04 08:00:01 +01:00
categories: [Metalama]
permalink: /blog/metalama-open-source
author: "Gael Fraiteur"
image: /assets/images/2025/2025-05-announcement/april-dark.svg
tag: featured
summary: "Metalama, the leading meta-programming framework for C#, is now open source under the MIT license, empowering developers with advanced tools for code generation, architecture validation, and aspect-oriented programming."
---


We’re excited to announce that **Metalama**, the most advanced meta-programming framework for C#, is now open source! Released under the permissive MIT license, Metalama empowers .NET developers with a simple, innovative, and powerful approach to code generation, architecture validation, and aspect-oriented programming.

Over 85% of the codebase is now open source, with only its IDE tooling and select extension packages remaining proprietary.

We believe this is a big deal not just for our team, but for the entire .NET ecosystem. Departing from the legacy of IL-based tools, Metalama leverages Roslyn to bring advanced meta-programming capabilities directly to the C# language—while remaining 100% syntax-compatible with C# and all editors.

## How Big Is Metalama? A Reality Check

Metalama’s open-source release follows nearly five years of dedicated development, resulting in a robust codebase and an (almost) feature-complete product. The core repository includes over **400,000 lines of code** and spans more than **17,000 commits**, representing approximately **ten man-years** (20,000 hours) of work by seasoned .NET compiler experts.

While Metalama isn’t the largest .NET project—Roslyn or Mono are still larger by an order of magnitude—it is undoubtedly one of the most substantial non-Microsoft projects. For context:

- Metalama has more commits than the combined top three .NET Foundation projects over the past five years, according to [dnfprojects.org](https://dnfprojects.org/).
- Its codebase is roughly twice the combined size of projects like AwesomeAssertions, AutoMapper, and MediatR—three projects that recently transitioned from open source to commercial.
- It surpasses the combined size of Cecil and Fody, including all its add-ins, by approximately 40%.
- Metalama is 53% the size of Avalonia, one of the largest .NET vendor-led open-source projects, which counts 750 KLOC.

## What Exactly Is Metalama?

Metalama is like a supercharged code analyzer and generator. Built as a Roslyn-powered extension, it integrates into the C# compilation pipeline and unlocks four key capabilities:

- **Generate code** – Add members, implement interfaces, or apply entire design patterns without modifying your source files. If you're tired of text-based generators, rejoice—Metalama uses a type-safe, object-oriented, C#-to-C# templating system with full IntelliSense support.

- **Transform code** – Rewrite method bodies, insert pre/post logic, convert fields to properties, inject dependencies, and more. Unlike Roslyn generators, Metalama is not limited to adding partial classes and can override almost any part of your code.

- **Validate code** – Enforce architectural and coding standards at compile time, preventing violations before they reach your repository.

- **Suggest code fixes and refactorings** – Surface code generation and transformation via the IDE’s lightbulb or screwdriver menu to guide and assist developers.

## Goodbye, Fody 👋

Unlike legacy IL-weaving tools like Fody, which operate on compiled assemblies, Metalama leverages the Roslyn compiler to apply transformations at the source level. This allows for a level of usability that IL-based tools can't match:

- **Immediate IDE feedback** – Generated members appear in IntelliSense, and diagnostics update live as you type.
- **Seamless debugging** – Step into generated code, place breakpoints, and inspect variables exactly as you would in handwritten code. Metalama effectively makes older IL-based code generation tools obsolete.
- **No lock-in** -- You can include the generated code back to your source code and remove Metalama from your project thanks to the Metalama Divorce feature.

## Real-World Use Cases: From Design Patterns to DevOps

Metalama includes a rich collection of open-source aspect libraries to tackle common software scenarios. Examples include:

- **Design Patterns**: Singleton, Factory, Builder, Decorator, Proxy, and more.
- **UI and MVVM Patterns**: `[Observable]` to implement `INotifyPropertyChanged`, dependency properties, commands, undo/redo.
- **Object Services**: Auto-generated `ToString`, deep cloning, equality, and comparison.
- **DevOps**: Logging, tracing, metrics, caching, retry/fault-handling logic, and more.

## How Metalama Works

Meta-programming in Metalama is based on two kinds of *meta-classes* that execute during compilation:

- **Aspects** encapsulate reusable code generation and transformation patterns like logging, observability, or the Memento design pattern. They act as intelligent attributes that can generate, transform, or validate code in place.
- **Fabrics** serve as centralized compile-time entry points, allowing you to apply aspects in bulk across your codebase using a LINQ-style API—no need to annotate every element manually.

Metalama rewrites the syntax tree dynamically during compilation. Your source code remains clean and focused, while the compiled assembly includes all the generated logic.


TODO - example

## Why Vendor-Led Open Source Matters

We believe vendor-led open source is the new standard for serious software frameworks and libraries. Microsoft’s stewardship of the .NET platform has set the tone: today’s developers expect both **transparency** and **dependability** from the tools they choose.

- **Transparency**, because developers need to understand how their tools work. They want to debug, diagnose, audit for security. Open source makes that possible by default.  
- **Dependability** means knowing the project will be maintained, bugs fixed, platforms supported, features added. That kind of long-term commitment requires a sustainable business model, often backed by a profitable company with real skin in the game.

When a vendor fails to maintain a project, the open-source license gives the community the power to take over. It lowers the barrier for competitors to step in and raises the pressure on the original maintainer to stay sharp. That’s why open source has become the default model, and why it gets so much visibility.

Let’s be honest: that visibility is a big reason for our choice. We could have *faked* open source, published a hollow core and kept the real value behind closed doors. But here's what we’re doing instead: we're releasing 85% of the codebase, a full-featured product. That's because we're committed to transparency and dependability, the two core values of vendor-led open-source.

Our goal is broad adoption.Reducing any licensing friction gets the framework into more hands, and some of those teams will turn into customers. Under PostSharp’s freemium model, about 30% of users are paying customers. With Metalama, we expect that number to be much lower. And we’re fine with that! With a larger distribution, we can afford a lower rate of monetization.

We’ve also seen what happens when unfunded open-source projects succeed too well: tools like AutoMapper, MediatR, and FluentAssertions eventually had to move to commercial models to survive in the long term. That’s not a failure of open source: it’s a failure of sustainability. They only got big because they were open. On the flip side, we’ve seen technically inferior tools outpace PostSharp just because they were open source. We’re not making that mistake again.

We’re realistic about community contributions. Metalama is a large, complex codebase. We don’t expect a wave of unsolicited PRs, but we welcome contributions that meet our standards, and we’d love to be proven wrong. See the **How You Can Contribute** section below.

Most importantly, this is a return to our roots. PostSharp was open source from 2004 to 2009, and that openness was key to its early success.  With Metalama, we’re bringing that spirit back—stronger, smarter, and built for today.


## Proprietary Components and Editions

Although Metalama’s compiler integration and core libraries are fully open source, we’ve retained a few advanced components under a commercial license to ensure long-term sustainability:

- **Visual Studio Extensions**: The full-featured IDE experience is provided in Metalama Community and Metalama Professional.

- **Architecture Validation**: Advanced architectural rules and analysis (formerly under `Metalama.Framework.Validation` and `Metalama.Extensions.Architecture`).

- **Code Fix Toolkits**: Custom refactoring and quick-fix support (previously `Metalama.Framework.CodeFixes`).

- **Distributed Caching Adapters**: Redis and Azure integrations for `Metalama.Patterns.Caching`.

These premium packages will be bundled in **Metalama Professional**, available under commercial terms. 

We acknowledge that the proprietary status of these components may seem at odds with the open-source value of transparency. To address this, the source code for these proprietary components is available to enterprise customers under a permissive but proprietary license. This ensures that enterprise users can audit, understand, and even customize these components while maintaining the sustainability of the project.


## Free IDE Tooling for Individuals and Small Teams

While Metalama's compiler integration and core framework are fully open source, our Visual Studio tooling remains proprietary. These tools aren't required to use Metalama, but they do offer a significant productivity boost:

- **Aspect Diff** – Compare original and transformed code using Visual Studio's diff viewer.
- **CodeLens Integration** – Instantly see which aspects affect your code, right from the editor.
- **Aspect Explorer** – Browse your project to discover where and how aspects are applied.

We initially planned to monetize this tooling across the board. But we don’t want to charge freelancers, students, hobbyists, or open-source maintainers. We want to monetize Metalama only where it makes sense: within large, well-funded organizations.

That’s why we’re making Visual Studio Tools for Metalama **free for individuals, non-commercial use, and companies with up to 3 developers**. No license key required. Just indicate your eligibility and you’re good to go. We trust you.

With this move, everyone, including indie developers to small startups, can access a complete, modern meta-programming experience with first-class IDE support.

## Is This Project Really Sustainable??

We understand the concern: how can such a large and ambitious open-source project remain viable over time? The answer is simple: we're building this on the solid financial and operational ground of a company founded in 2009.

Metalama was fully funded through the profits of PostSharp. We’ve taken no outside investment and carry no debt. With Metalama now feature-complete, ongoing development primarily involves maintenance and incremental improvements—something that can be managed by a small, focused team. Our company has scaled down accordingly and is already operating profitably, independent of future Metalama revenues.

Long term, sustainability will come from a dual business model:

- **Premium features**: As mentioned above, while the core is fully open source, some components will remain proprietary and available under commercial terms.
- **Premium support and consulting**: For teams that want guidance, custom tooling, long-term maintenance, or guaranteed SLAs, we offer paid services.

This ensures that we will be able to create enough value for professional teams to justify commercial investment, while keeping Metalama free and open for the community.

In short, Metalama is already sustainable in the near term. For the long term, everything hinges on adoption. The broader the user base, the stronger the community—and the more viable the commercial offerings. That’s why we’ve open-sourced the core: to make it easy for everyone to try, trust, and build on Metalama.

## Community and Enterprise Support

We offer a support model tailored to meet the diverse needs of our users:

- **Community Support**: The open-source core is self-supported through the GitHub Discussions forum. Community members are encouraged to ask questions, share best practices, and assist one another. Our team will monitor community activities weekly to provide guidance where needed, with no guarantees.

- **Basic Professional Support**: Subscribers of Metalama Professional gain access to basic email support for private tickets.
- **Enterprise Support**: For organizations needing high-touch support, Metalama Enterprise offers priority assistance, escalation, video consultations, advanced diagnostics, and consultancy services. This plan is designed for teams with critical projects that demand a higher level of engagement and expertise.

Details about support offerings, response times, and SLA commitments can be found at [https://www.postsharp.net/support/policies](https://www.postsharp.net/support/policies).

Only the current version (`YYYY.N`) will be maintained under open-source terms. Previous versions (`YYYY.N-1`) will be supported exclusively under the enterprise license for customers with long-term support agreements.

## How You Can Contribute

Whether you’re just discovering Metalama or already using it in your projects, there are many meaningful ways to get involved:

- ⭐ **Star the GitHub repository**: Show your support and help improve Metalama’s visibility by starring [github.com/metalama/Metalama](https://github.com/metalama/Metalama).
- 📣 **Spread the word**: Metalama is a mature, production-ready framework, but adoption is still growing. Share it with your colleagues, present it at meetups, or write a blog post to help raise awareness.
- 🧭 **Help newcomers**: If you’re familiar with Metalama, consider following issues and discussions on GitHub. Answering questions or clarifying concepts strengthens the community and helps others get started.
- 💡 **Share your feedback and feature requests**: Your insights are invaluable. Let us know what works, what doesn’t, and what features you’d like to see in future releases.
- 🧩 **Contribute your aspects**: If you’ve built reusable aspects, consider sharing them with the community. You can:
  - Publish them under your own GitHub account and let us know so we can reference them on the [Metalama Marketplace](/marketplace).
  - Contribute them to the `Metalama.Community` repository.

- 🛠️ **Contribute to the core**: Bug fixes, small enhancements, and documentation improvements are always welcome. We’ll soon migrate our internal backlog to GitHub, giving you better visibility into what’s needed and how you can help.

For more details, visit [https://metalama.net/contributing](https://metalama.net/contributing).

## What’s Next for Metalama

Open-sourcing Metalama is a major step, but we’re not stopping here. Here’s what’s coming up next in the short term:

- **May 2025** – We're migrating our internal issue tracker to GitHub. This will give you full visibility into what we’re working on and let you report bugs, track features, and contribute more easily.

- **Summer 2025** – We’re working on extending Metalama’s capabilities to support code transformations on C# `event` accessors and `await` expressions. This unlocks new possibilities for cross-cutting concerns in asynchronous and event-driven codebases.

- **Autumn 2025** – Full support for .NET 10 and the next version of C#. As always, we’ll stay aligned with the latest evolution of the .NET platform.

We're committed to improving the framework and responding to community needs. Even though Metalama is now open source, we’re not handing it off and walking away. We’re staying fully engaged, with two full-time engineers (myself and Daniel) dedicated to the project.


## Conclusion

Many developers, upon discovering Metalama, have said, **"This should be a standard part of .NET!"** By open-sourcing Metalama, we’ve done what we could to make that vision a reality. 

Whether you’re a solo developer looking to eliminate boilerplate or part of a team enforcing architecture across a large codebase, Metalama is here to help.

If you’re excited about the potential of meta-programming in C#, now is the perfect time to get started:

- Visit the website at [metalama.net](https://metalama.net) and explore [use cases](https://metalama.net/applications).
- Read the [documentation](https://doc.metalama.net), expecially [commented examples](https://doc.metalama.net/examples)
- Study the source code on [GitHub](https://github.com/metalama/Metalama) and see how it works.

We’ve laid the foundation, but the real momentum will come from the community. Together, we can push the boundaries of what C# can achieve.

Happy meta-programming!

Gael


