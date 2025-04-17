---
layout: post 
comments: false
title: "Metalama Status Update (June 2022)"
date: 2022-06-24 09:00:00 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2022-06
origin: https://blog.postsharp.net/metalama-status-update-2022-06
author: "Gael Fraiteur"
image: /assets/images/2022/2022-02-23-metalama/metalama-2.svg
summary: "The blog post announces that Metalama 1.0 is now feature-complete with the addition of support for dependency injection in aspects. However, some features still have gaps, so the team will spend the summer filling these gaps and improving testing standards."
---

It's time for another status update. The big announcement of this month is that **Metalama 1.0 is now feature-complete** after we have added support for **dependency injection** in aspects.

## Dependency Injection

In June, we have focused on the support for **dependency injection**. It is now possible for an aspect to use a dependency without knowing which dependency injection framework is used in the project using the aspect. The implementation of this feature is [open source](https://github.com/metalama/Metalama.Framework.Extensions). It consists in a highly extensible abstraction, as well as two first implementations: one for the standard injection patterns of .NET Core (i.e. `Microsoft.Extension.DependencyInjection`), the second for a classic service locator pattern (a good fit for objects that are not instantiated by the container).

Here is an example where a `LogAttribute` aspect pulls a dependency of type `IMessageWriter` you can see that the aspect code is very simple and does not know anything about the dependency injection pattern.

{% embedded id:dependency-injection-example, url:https://doc.metalama.net/aspects/dependency-injection, node:code-logdefaultframework %}

For details regarding dependency injection in Metalama, see [this documentation article](https://doc.metalama.net/aspects/dependency-injection).

The dependency injection feature was made possible thanks to the following user stories:

* [Introduce and pull parameters from constructors](https://doc.metalama.net/aspects/advising/introducing-constructor-parameters)
* [Add/remove custom attribute from aspect](https://doc.metalama.net/api/metalama_framework_advising_iadvicefactory_introduceattribute)
* [Any compile-time type can have templates](https://doc.metalama.net/api/metalama_framework_advising_iadvicefactory_withtemplateprovider)
* [Declarative advising is now customizable](https://doc.metalama.net/api/metalama_framework_aspects_declarativeadviceattribute)

## Other features

* The test framework now supports concurrent processing on different cores.
* You can now [override](https://doc.metalama.net/api/metalama_framework_advising_iadvicefactory_override) and [introduce](https://doc.metalama.net/api/metalama_framework_advising_iadvicefactory_introducefinalizer) a finalizer.
* We have updated our compiler to Roslyn 4.2.
* 38 bug fixes and minor enhancements just in June.

## What's next

All _features_ planned for 1.0 are now implemented, however some of these features still have some gaps. Therefore we are not _code_ complete as we hoped last month.

Here is what is still on our to-do list:

* Gaps in existing features:
  * advising operators,
  * proper testing with structs and records,
  * implementing generic interfaces,
  * improving code generation patterns,
  * getting `System.Reflection` object for declarations introduced by aspects.
* Documenting and easing the migration from PostSharp
* Licensing

Therefore we will spend most of the summer filling these gaps and improving our standard of testing.

As always, your [feedback](https://www.postsharp.net/metalama/support) is greatly appreciated and, most likely, can have large impact on the final product. To get instant answers, the best is still to join our [Slack community](https://www.postsharp.net/slack).

Happy meta-programming with Metalama!

-gael

