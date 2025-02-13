---
layout: post
comments: false
title: "Metalama Status Update (February 2023)"
date: 2023-02-28 09:00:00 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2023-02

author: "Gael Fraiteur"
image: /assets/images/blog/metalama-status-updates/2.jpg
tag: 
summary: "In February 2023, Metalama improved its API, fixed bugs, integrated customer code into its continuous integration pipeline, added a new CLI command to analyze licensing credits usage, and enhanced its documentation."
---

After two major announcements last month, February was a quieter month for us. In addition to improving our API and fixing bugs, we added a new CLI command to analyze the use of licensing credits. We also integrated customer code into our continuous integration pipeline for the first time.

## API Improvements

We've made improvements to the Invoker API, which includes methods and properties of the compile-time code model that enable your templates to generate code that accesses these declarations at runtime.

Previously, you had to write code like this:

```cs
method.Invokers.Final.Invoke(meta.This, "Hello, world");
var propertyValue = property.Invokers.Final.GetValue(meta.This);
```

Now, you can simply write:

```cs
method.Invoke("Hello, world.");
var propertyValue = property.Value;
```

We've also simplified working with `IExpression`. You can now pass an `IExpression` as an argument to a `dynamic` parameter, and you can cast any `dynamic` expression to `IExpression` instead of using `meta.Capture`.

Although these API improvements were planned, we did not anticipate so many changes, nor such a big improvement in usability. We're pleased to report that the result is better than expected. We regret not making these improvements before the RC but we're pleased that we did so before GA. These were the last planned API improvements, so any future changes should be minor and should not break compatibility.

## Bug Fixes

We've recently focused on addressing some low-priority bugs that were discovered during our internal testing but were not reported by external users. Although most of these issues were quickly resolved, one of the fixes proved to be more challenging and led to a few regressions, which negatively impacted the quality of builds 2023.0.102-rc to 2023.0.104-rc. However, we've since resolved those issues and are pleased to report that the quality of our builds is once again very high.

In total, we've addressed around 40 bugs, including half a dozen regressions, and have also fixed a few memory leaks at design time. Needless to say, we were concerned and disappointed by the regressions, so we took steps to address the issue and prevent similar problems from arising in the future.

## Supply Chain Integration

For the first time, we've integrated customer source code into our continuous integration pipeline. A long-time customer shared their Metalama aspects and test suites with us, and we stored this code in an Azure DevOps repo that we both have access to. The customer's test suite is now part of our own test suite and will be verified during every nightly build and before every release. 

This collaboration brings great benefits to both parties. It provides a proactive approach to detect potential regressions that could affect the customer, significantly reducing the risk of productivity loss due to Metalama bugs. Furthermore, when API changes occur in the future, we will promptly update the customer's code, enabling them to easily review the changes and ensure seamless integration with Metalama.

Note that we only have access to a copy of a subset of the customer's codebase that includes aspects and their corresponding tests. We do not have access to the entirety of the customer codebase. 

We'd love to extend this experiment to other customers. If you are interested, please contact me directly.

## Analyzing Licensing Credits Usage

Last month, we introduced a new [pricing model](https://blog.postsharp.net/post/metalama-pricing) where the main differentiator between product editions was the number of credits that can be consumed by a project. In the latest build, we've included a new command, `metalama license credits`, that lets you analyze the number of credits that your projects are consuming and why. This tool is especially useful when your trial period is ending and you need to determine which Metalama edition is right for you.

## Documentation

We've focused more on improving our documentation this month. We've added a new chapter, Using Metalama, which is dedicated to people who will use Metalama but won't create their own aspects (this group accounts for 90% of users in a typical medium-to-large company). We're currently working on other chapters and the technical infrastructure of our documentation.

## Summary

In February, we made significant improvements to our API, fixed bugs, integrated a customer's code into our continuous integration pipeline, added a new CLI command to analyze the use of licensing credits, and worked on improving our documentation. We're pleased with the progress we've made, and we're happy to announce that Metalama is now technically ready for GA. However, before we release the product, we'd like to see a couple of weeks without regressions. Our next milestone is to complete the documentation and product website, after which we'll be fully prepared for the launch!

 As always, we're committed to providing the best possible experience for developers, and we encourage you to reach out to us on [GitHub forum](https://github.com/postsharp/Metalama/discussions) or our [Slack community](https://www.postsharp.net/slack) with any questions or feedback you may have. Thank you for your support, and happy meta-programming with Metalama!

-gael




