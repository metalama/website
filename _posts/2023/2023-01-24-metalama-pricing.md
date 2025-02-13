---
layout: post 
comments: false
title: "Metalama Pricing Model: Affordable, Flexible, and Open-Source Friendly"
date: 2023-01-25 08:00:00 +01:00
categories: [Metalama]
permalink: /blog/metalama-pricing

author: "Gael Fraiteur"
image: assets/images/2023/2023-01-25-metalama-pricing/title.jpg
tag: featured
summary: "Metalama, a new meta-programming solution, has released its pricing model with four editions, including a free version. The model includes affordable and flexible options, discounts for early adopters, free access for open-source projects, and special arrangements for existing PostSharp customers."
---

With the release of the first Release Candidate of Metalama, we are thrilled to unveil a new pricing model that offers both flexibility and affordability. As a result of this new model, we are excited to progressively release all of our ready-made aspect libraries as open-source projects.

Our new product will be available in four different editions, including a _completely free_ version. Our commercial editions, **Metalama Starter**, **Metalama Professional**, and **Metalama Ultimate** will range in price from $60 to $160 for individuals. Prices for businesses range from $40 to $400 per developer depending on the edition and the number of concurrent users. See our [price calculator](https://www.postsharp.net/metalama/pricing) for details.

The main distinction between the various editions of Metalama is the _number of aspect classes or libraries_ that can be used in each C# project. Each edition grants a certain number of credits, which can be used to access _any_ aspect. As we move forward with porting the `PostSharp.Patterns` ready-made aspect libraries from PostSharp to Metalama, we are excited to announce that these new libraries will be available as open-source projects. This means that you will be able to inspect the source code and modify it to suit your needs, all within the framework of the credit-based pricing system.

## Aspect Credits

The **Metalama Free** edition includes 3 aspect credits. Credits are consumed as follows:

* _Custom aspects_, i.e. aspects written by your own team, consume 1 aspect credit per aspect class.
* _Third-party aspect libraries_, i.e. aspects written by external contributors (whether open source or not), consume 1 aspect credit per aspect library, regardless of the number of aspect classes, assemblies, or packages that the library contains.
* _First-party aspects_, i.e. aspects written by _our_ team and released as open-source projects, generally consume 1 aspect credit per aspect class, however, certain aspects may consume fewer credits.

This means that **Metalama Free** allows you to use up to three third-party aspect libraries free of charge! All third-party aspect libraries will have access to all features of Metalama without any limitations. This includes advanced [aspect-oriented programming](https://www.postsharp.net/solutions/aspect-oriented-programming), architecture validation, code refactorings & live templates, and transitive fabrics.

The commercial editions of Metalama add credits and features as follows:

* Metalama Starter, priced from $60 per developer, allows for 5 credits in total and adds:
  * fabrics, which allow you to use a simple and extensible fluent API to validate your code against architecture and add aspects in bulk,
  * inheritance of custom aspects,
  * ability to debug the transformed code, instead of just the source code.

* Metalama Professional, priced from $100 per developer, allows for 10 credits in total and adds:
  * code refactorings & live templates for custom aspects,
  * aspect testing framework (i.e. `Metalama.Testing.AspectTesting`),
  * extensibility using Roslyn (i.e. `Metalama.Framework.Sdk`).

* Metalama Ultimate, priced from $160 per developer, as the name suggests, does not have any limitations.

For a full feature matrix and price calculator, see our [pricing page](https://www.postsharp.net/metalama/pricing).

## Open-Sourcing Metalama Extensions and Aspect Libraries

As we previously mentioned, we plan to open-source most of our codebases _around_ our core technology. We have already open-sourced the following projects:

* [Metalama.Extensions](https://github.com/postsharp/Metalama.Extensions) - a set of extensions to Metalama.Framework, which includes code metrics, support for dependency injection in aspects, architecture validation, and PostSharp-compatible aspect multicasting.
* [Metalama.LinqPad](https://github.com/postsharp/Metalama.LinqPad) - a LinqPad driver that allows you to inspect the code model of any C# project and, if it uses Metalama, the code model of compilation artifacts like aspect classes, aspect instances, advise, transformations, diagnostics...
* [Metalama.Community](https://github.com/postsharp/Metalama.Community) - implements ready-made aspects and other code transformations that do not stem from our own team, i.e. where our company is not the only contributor and copyright owner. It currently contains proof-of-concept implementations of a few Fody features: Costura (embeds dependencies as managed resources) and Virtuosity (makes all public methods virtual). It also implements an AutoCancellationToken aspect. The project mainly serves as an example to demonstrate low-level code transformation using Roslyn API.
* [PostSharp.Engineering](https://github.com/postsharp/PostSharp.Engineering) - is our homegrown build front-end and SDK, which helps work with dependencies in a multi-repo product, consolidate code quality practices, generate TeamCity configurations...

As we will be making progress porting `PostSharp.Patterns` to Metalama, we will release these projects to GitHub as well, and everything will be available within the credit-based pricing framework.


## Quasi-logarithmic Volume Pricing

One of the common criticisms of PostSharp's pricing was that it was too costly for large teams. We have taken this feedback into consideration and are excited to introduce a new, quasi-logarithmic volume pricing model with Metalama. With business licenses, you will already receive a 5% discount for 2 concurrent seats, and that discount increases up to 75% for teams of 200 developers.

We believe that price should not be a barrier for anyone and with this pricing; teams who fully utilize Metalama's potential can see a return on investment of 100x.

## Early Bird Discount

We understand that Metalama is a new product and that it may take some time to resolve any issues that may arise. We greatly appreciate customers who choose to take a chance on our product and we are confident that it will be worth it.

To show our gratitude, we are pleased to offer a 50% discount to customers who purchase a Metalama license within the first three months after its GA release, and a 25% discount to customers who purchase within the following three months.

## Open Source Projects

Supporting the open-source community is a top priority for us, that's why we have decided to offer Metalama free of charge for open-source projects, to the benefit of both contributors and users.

Upon request, we will provide a redistribution license key, which will be linked to a specific code namespace. This key will allow any aspect within that namespace to utilize all features of Metalama, even if the users of your project are running the Metalama Free edition. All users will have access to up to 3 open-source aspect libraries at no cost.

As a token of appreciation for community contributions, we also offer a complimentary Metalama Ultimate license to core voluntary contributors. This license will allow them to use Metalama for all their personal and commercial projects.

## Redistributing Commercial APIs

You can still supercharge your API with Metalama aspects, free of charge for your users, even if your product is commercial or closed-source.

Just as with open-source projects, upon request, we will provide you with a namespace-bound license key at no cost. This key will ensure that your customers have access to Metalama features without paying for a commercial version of Metalama. However, we do expect that you purchase a commercial license key for your team members. This ensures that both your team and customers have access to the full range of Metalama features, while also supporting our development efforts.

## PostSharp Customers

As a PostSharp customer, your existing license key is already compatible with Metalama. Metalama Professional package is included in PostSharp Framework, and Metalama Ultimate package is included in the PostSharp Ultimate package.


Please be aware that while the features of Metalama Professional cover most of those of PostSharp Framework, they may not meet all of your requirements due to limitations on the number of aspect classes. Even if you currently hold a PostSharp Framework license, you may still need to purchase Metalama Ultimate or upgrade to PostSharp Ultimate, which includes Metalama Ultimate. Conversely, if you are currently using the PostSharp Ultimate package, the features of Metalama Professional may be sufficient for your needs, so may lower your license costs after migrating to Metalama.


Customers who have a substantial number of PostSharp Framework licenses can reach out to us to obtain a complimentary Metalama Ultimate license, provided that the cost of Metalama Ultimate licenses is not more than 80% of the cost of PostSharp Framework licenses for the same number of seats.

## Summary

Metalama is our new meta-programming solution that is built on Roslyn technology. It provides a pricing model that is both flexible and affordable, making it accessible to teams of all sizes, including open-source projects. Its integration of [AOP](https://www.postsharp.net/solutions/aspect-oriented-programming), architecture validation, and coding assistance makes it a powerful tool for improving the code quality and increasing the productivity of any C# development team. Metalama is currently in the Release Candidate stage, and we encourage you to try it in your projects. We have received feedback that it has already been deployed to several teams with success.
