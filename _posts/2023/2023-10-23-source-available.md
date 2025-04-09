---
layout: post
comments: false
title: "Metalama Source Code Available"
date: 2023-10-23 08:00:01 +01:00
categories: [Metalama]
permalink: /blog/source-available
author: "Gael Fraiteur"
image: /assets/images/2023/2023-10-20-open-sourcing/source-available.png
mermaid: true
tag: featured
summary: "The source code of Metalama.Framework is now publicly accessible on GitHub under a proprietary source-available license. This move aims to enhance transparency, support a superior developer experience, and foster greater trust."
---

We recently announced the [open-sourcing of Metalama.Compiler](https://metalama.net/blog/open-sourcing-metalama-compiler), our Roslyn fork. Today, we are excited to announce that the source code of Metalama.Framework is now publicly accessible on [GitHub](https://github.com/postsharp/Metalama.Framework) under a proprietary source-available license. Additionally, all extensions and aspects built on top of Metalama.Framework have been open-sourced since their inception.

It is important to note that "source-available" does not equate to "open source" as defined by the Open Source Initiative (OSI). If you need more features than those provided by Metalama Free, you will still need to acquire a license for Metalama.

With this recent release, Metalama becomes as open as is commercially viable for a product of its kind. As Candide would have said, "All is for the best in the best of all possible worlds", while riding his alpaca in El Dorado.

## Benefits for All Users

We have made over 99% of Metalama's source code available under a license that permits the use of the source code for reference and troubleshooting. This level of accessibility offers significant benefits to all users.

First, it simplifies the debugging and troubleshooting of compile-time code. Thanks to Source Link, users will soon be able to step into Metalama's source code (once we publish the symbol packages), enhancing their understanding of what's happening.

Second, the release of the source code fosters trust and transparency. When Metalama becomes a critical part of your build, it's essential to ensure that it is professionally built and free of malicious code. Now, everyone can understand how the software works, verify the absence of backdoors, and scan the codebase for security vulnerabilities.

Furthermore, for those interested in learning, access to the source code can provide valuable insights into compiler extensibility design and coding practices.

## Source Code Subscription

As previously mentioned, the standard Metalama license allows you to use the source code for reference and troubleshooting, but it does _not_ permit modification or building of the source code. If you wish to modify the source code and build it, you must acquire the Metalama Source Code Subscription. This subscription extends your rights on the source code and grants you access to the remaining 1% that has not been publicly released.

The source code subscription provides your team with an additional level of risk mitigation. Even if we stop supporting the software or go out of business, you can still maintain the code while it remains critical to your team.

The source code subscription also qualifies you for dedicated support in setting up a build environment for Metalama.

Unlike traditional escrow agreements, our source code subscription enables you to test your ability to build _before_ the occurrence of an adverse event triggering the release of the source code, and without the hassle of an intermediate party.

## Summary

In conclusion, our decision to release the source code of Metalama aims to enhance transparency, support a superior developer experience, and foster greater trust. We understand that for many teams, choosing to use Metalama represents a significant leap of faith. Numerous companies have been using PostSharp for a decade with teams of hundreds of developers spread across multiple continents. We are grateful for this trust and hope to continue earning it with Metalama.

