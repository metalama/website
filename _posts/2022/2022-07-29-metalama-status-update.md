---
layout: post 
comments: false
title: "Metalama Status Update (July 2022)"
date: 2022-07-29 09:00:00 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2022-07
author: "Gael Fraiteur"
image: /assets/images/2022/2022-02-23-metalama/metalama-2.svg
summary: "The Metalama project saw significant progress in July 2022 with 40 bug fixes and various features added despite vacation time. However, customers trying the solution encountered bugs, which were fixed within 2-3 days."
---

It has been another month since our last update. July and August are traditionally lazy months for us as team members enjoy several weeks of vacation. But despite the fewer working hours, our overall feeling is that our pace has significantly accelerated. As we announced [last month](/blog/post/metalama-status-update-2022-06), Metalama is now feature-complete. Therefore, we can now focus on fixing bugs and closing the remaining gaps in the C# syntaxes supported by Metalama. All these remaining gaps or defects are now counted in hours or days, and no longer in weeks.

Here is what we've managed to complete in July on the Metalama project:

- 40 bug fixes
- Proper support for structs and records
- Overriding default interface member implementations
- Overriding partial methods
- Aspects with many layers
- Introduce and override operators
- Add contracts to constructor parameters
- Improvement of supportability (better error reporting, optional automatic creation of [process dumps](https://doc.metalama.net/troubleshooting/process-dump) upon exception)
  
A few customers have started to try Metalama on large solutions. Honestly, this is still risky business: they all encountered several blocking bugs. Good news is that we were able to diagnose and fix all bugs with a cycle time of 2 or 3 days -- yes, 2 days between the bug report and the deployment of a fix. This is the sign that our engineering processes (continuous integration) and our code base are both in good health, so we can hope to converge to a stable version in Autumn 2022.

If you want to try Metalama now, please note that August will also be vacation-heavy on our side and we will not be always able have such a short cycle time. So, if you are not willing to wait a couple of weeks for a bug fix, it can be better to wait until September.


## What's next

Here is our updated to-do list:

* Gaps in existing features:
  * implementing generic interfaces,
  * getting `System.Reflection` object for declarations introduced by aspects.
  * design-time cross-project cache invalidation
* Documenting and easing the migration from PostSharp
* Licensing

As always, your [feedback](https://www.postsharp.net/metalama/support) is greatly appreciated and, most likely, can have large impact on the final product. To get instant answers, the best is still to join our [Slack community](https://www.postsharp.net/slack).

Have a nice summer,

-gael

