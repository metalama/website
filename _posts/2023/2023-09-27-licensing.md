---
layout: post 
comments: false
title: "Metalama Licensing Changes"
date: 2023-09-27 07:00:01 +01:00
categories: [Metalama]
permalink: /blog/metalama-open-source-licensing
author: "Gael Fraiteur"
image: /assets/images/2023/2023-09-27-licensing/llama.png
tag: featured
summary: "The upcoming Metalama 2023.3 release will introduce changes to its licensing model, eliminating license credits, introducing namespace-bound license keys for open-source projects, and offering free contract aspects and debugging capabilities."
---

In the upcoming Metalama 2023.3 release, we are implementing several changes to our licensing model. These adjustments aim to simplify the system while encouraging broader adoption of the Metalama platform.

## Simplification of the License Credit Concept

In prior versions, our license credit system was somewhat complex. A single credit would be consumed for any aspect class, unless that class originated from a community-driven open-source aspect library. In such cases, the entire library consumed just one credit. The number of permitted aspect credits was determined by the Metalama product edition you had acquired.

Starting with Metalama 2023.3, we are eliminating the concept of license credits altogether. All aspect classes will now be counted equally, irrespective of their origin. This means there will no longer be a distinction between _custom_, _community open-source_, and _first-party open-source_ aspects as was previously the case. We anticipate this modification will make our licensing model more transparent and easier to understand.

## Namespace-Bound License Keys for Open-Source Projects

Open-source projects are welcome to utilize Metalama. Special license keys will be provided that can be checked into the `Directory.Build.props` file in your git repository. These keys will be bound to the root namespace of your project, allowing anyone building your project to use them.

However, it's important to note that these license keys will no longer exempt aspects from your open-source library from the maximum aspect count determined by the product edition. While Metalama Free still includes three aspect classes at no cost, users may need to upgrade their edition to use more aspects.

## Free Contract Aspects and Debugging Capabilities

To offset these changes, we are introducing two new features that will be available free of charge across all Metalama editions:

1. **Free Contract Aspects**: Any aspect derived from `ContractAspect`, such as `[Required]`, `[EmailAddress]`, or any custom precondition checking aspect, will be completely free and won't count against your aspect class limit.

2. **Free Debugging of Transformed Code**: All editions will now be able to utilize the `LamaDebug` mode, allowing you to step into the transformed code.

## Summary

The Metalama 2023.3 release aims to simplify our licensing model while providing additional functionality. We extend our gratitude to Onur for initiating this pivotal discussion and to all community members who contributed their insights on our `#vip` Slack channel. For any questions or clarifications, please feel free to reach out to us.

Thank you for your continued support and use of Metalama.
