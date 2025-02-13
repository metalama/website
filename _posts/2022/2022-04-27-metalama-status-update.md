---
layout: post 
comments: false
title: "Metalama Status Update (April 2022)"
date: 2022-04-27 09:00:00 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2022-04
author: "Gael Fraiteur"
image: /assets/images/2022/2022-02-23-metalama/metalama-2.svg
summary: "The blog post provides an update on the development of Metalama, highlighting bug fixes, new features, and future plans, with an expected general release in September."
---

It has been two months since our announcement of Metalama and we wanted to give some update since we have been publishing new builds at a sustained pace in the meantime.

First, we are grateful for the attention Metalama got from the community. A few folks started to try the new framework and reported some very relevant feedback. We have solved all reported bugs -- a couple dozen in total. It's very interesting for us to see how you guys are trying to use the framework and what obstacles or difficulties you encounter. 

Our special thanks go to [Dom Sinclair](https://github.com/domsinclair) for his review and edits of the documentation from a native speaker's perspective. We have changed our all `advices` to the rightly spelled `advice` as a result :-).

## New features

While addressing community feedback, we have also been busy building new features:

* **Support for Visual Studio 17.1 and Roslyn 4.1.0**. We can now support many versions of Roslyn in the same set of packages.
* **Exclusion of aspects**. To prevent a declaration from being targeted by a fabric, use the [ExcludeAspectAttribute](https://doc.postsharp.net/metalama/api/metalama_framework_aspects_excludeaspectattribute) custom attribute.
* **Initializers**. You can add initializers to introduced fields, properties and events. You can also inject initialization logic into object and type constructors. See [Adding Initializers](https://doc.postsharp.net/metalama/aspects/advising/initializers) for details.
* **Require aspect**. The [RequireAspect](https://doc.postsharp.net/metalama/api/metalama_framework_aspects_iaspectreceiver-1_requireaspect#metalama_framework_aspects_iaspectreceiver_1_requireaspect__1) method allows a parent aspect to add a child aspect, but only if the aspect has not been added by a different path.
* **Properties and indexers split**. The `IProperty` interface no longer represents indexers and the `Properties` collection no longer expose them. We now have `IIndexer` and `Indexers`.
* **Incremental source generators**. We have migrated our implementation of source generators to the new incremental API.
* **Code fix: change member accessibility**. You can now change the visibility of a member from a custom code fix with the [CodeFixFactory.ChangeAccessibility](https://doc.postsharp.net/metalama/api/metalama_framework_codefixes_codefixfactory_changeaccessibility) method.
* **Documentation**. We have completed chapters about [fabrics](https://doc.postsharp.net/metalama/fabrics/fabrics), [validation](https://doc.postsharp.net/metalama/validation/validation) and [custom code fixes](https://doc.postsharp.net/metalama/ide/ide).

## What's next

Metalama 1.0 is now _almost_ feature-complete and you should no longer see large API additions.

In the next weeks, we will be focusing on the following:

* Testing and bug fixing
* Documentation:
  *  [Metalama SDK](https://doc.postsharp.net/metalama/sdk/sdk) documentation
  *  Migration from PostSharp
* Adding a proper API to implement parameter/field/property validation
* Telemetry
* Licensing

At the current pace, we expect to be code complete in June, which means that we can hope for general release after in September, after the summer break.

In the mean time, your [feedback](https://www.postsharp.net/metalama/support) is greatly appreciated and, most likely, can have large impact on the final product.

Happy meta-programming with Metalama!

-gael
