---
layout: post 
comments: false
title: "Metalama Status Update (May 2022)"
date: 2022-05-31 09:00:00 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2022-05
author: "Gael Fraiteur"
image: /assets/images/2022/2022-02-23-metalama/metalama-2.svg

summary: "Metalama's May 2022 update includes new features like automated multi-repo deployment, contracts, template parameters, generic templates, telemetry, extensibility examples, and documentation. They plan to add a feature to pull a dependency from the constructor."
---

It has been another month since our [last update](https://metalama.net/blog/metalama-status-update-2022-04) so I wanted to give you a fresh status briefing.



## New features


* **Completely automated multi-repo deployment**. Our build and deployment process is now completely integrated. We can now ship, in just a few clicks, all kinds of artifacts coming from 9 different git repos (and counting). We have created a custom build integration front-end, free and open source on [GitHub](https://github.com/postsharp/PostSharp.Engineering).
  
* **Contracts** allow you to validate or normalize the value assigned to field, properties, or parameters. Check the [documentation](https://doc.metalama.net/aspects/advising/contracts) for details. There is a great example that validates all non-nullable parameters of public methods in the project, just with a few lines of code.

* **Template Parameters** and **Generic Templates**. Template can now have compile-time parameters and type parameters (i.e. generic parameters). Generic templates are especially convenient when your template code needs to use a generic method or type whose generic argument depends on the type of the declaration to which the aspect is applied. For details, see the [documentation](https://doc.metalama.net/aspects/templates/template-parameters) of this feature.

* **Telemetry**. Anonymous error and usage reports now get automatically uploaded. You can of course [opt out](https://doc.metalama.net/deployment/telemetry).

* **Extensibility examples**. We fixed several bugs around the extensibility of Metalama using the Roslyn API. We are not completely finished with this use case, but you can already look at the following examples:

  
  * [Metalama.Open.Virtuosity](https://github.com/postsharp/Metalama.Open.Virtuosity): makes all possible methods in a project `virtual`.
  * [Metalama.Open.AutoCancellationToken](https://github.com/postsharp/Metalama.Open.AutoCancellationToken): automatically propagates `CancellationToken` parameter.
  * [Metalama.Open.DependencyEmbedder](https://github.com/postsharp/Metalama.Open.DependencyEmbedder): bundles .NET Framework applications into a single executable file.

* **Documentation**. We have completed chapters the following articles:
  * [Aspect Inheritance](https://doc.metalama.net/aspects/aspect-inheritance)
  * [Template Parameters and Type Parameters](https://doc.metalama.net/aspects/templates/template-parameters)
  * [Validating Parameter, Field and Property Values](https://doc.metalama.net/aspects/advising/contracts)
  * [Extending Metalama with the Roslyn API](https://doc.metalama.net/sdk/sdk) (not completed)


## New feature _gap_

We have decided to add a new feature to Metalama 1.0: the ability to pull a dependency from the constructor. It seems important to implement aspects that need to consume a dependency from a container.

## What's next

We're now really close to a feature-complete release. The only feature gap is the one we have recently discovered - pulling dependencies.

In the next weeks, we will be focusing on the following:

* Testing and bug fixing
* Documentation:
  *  Migration from PostSharp
* Licensing

We still expect to be code complete in June and to spend the summer in stabilizing everything.

In the mean time, your [feedback](https://www.postsharp.net/metalama/support) is greatly appreciated and, most likely, can have large impact on the final product.

Happy meta-programming with Metalama!

-gael
