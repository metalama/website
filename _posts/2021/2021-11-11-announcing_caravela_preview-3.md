---
layout: post 
comments: false
title: "Announcing PostSharp \"Caravela\" Preview 3 (0.4)"
date: 2021-11-11 11:11:11 +02:00
categories: [Metalama]
permalink: /blog/announcing-caravela-preview-3
origin: https://blog.postsharp.net/announcing-caravela-preview-3
author: "Gael Fraiteur"
image: /assets/images/2021/2021-01-25-caravela-announcement/Project Caravela 1.png
summary: "PostSharp has released a new preview of \"Caravela,\" their Roslyn-based meta-programming framework. This version supports the complete C# 9 language and is not recommended for use in production projects yet."
---

A new preview of PostSharp "Caravela", our new Roslyn-based meta-programming framework, is now available. Caravela is the successor of the MSIL-based PostSharp Framework. It should work with most codebases, support the complete C# 9 language, and has a very respectable set of aspect-oriented features. This preview is the last we're releasing under the codename "Caravela". 
You can try Caravela today on sample projects, but it is [not recommended](#what-does-not-work-yet) to use it in production projects.

The following resources are available:

* A set of [NuGet packages](https://www.nuget.org/packages?q=Caravela), all in _pre-release_ quality band.
* [PostSharp "Caravela" Tools for Visual Studio 2022](https://marketplace.visualstudio.com/items?itemName=PostSharpTechnologies.caravela) providing syntax highlighting and the diff feature.
* A fairly complete [documentation](https://doc.metalama.net/).
* [try.postsharp.net](https://try.postsharp.net/), an online sandbox to try Caravela without installing it on your machine.
* A set of open-source [samples](https://github.com/postsharp/Caravela.Samples) on GitHub.
* Public [discussions](https://github.com/postsharp/Caravela/discussions) and [issue reporting](https://github.com/postsharp/Caravela/issues) on GitHub, or chat on [Gitter](https://gitter.im/postsharp/caravela?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge).

Please [subscribe to our newsletter](#newsletter) to stay informed about our progress with this project.

So, what features are already available?

## Overriding methods

Override any method with a simple code template:

{% embedded id:override-method-example, url:https://doc.metalama.net/aspects/simple-aspects/overriding-methods, node:code-simplelogging %}

The template will also work on async methods and iterators:

{% embedded id:override-async-method-example, url:https://doc.metalama.net/aspects/simple-aspects/overriding-methods, node:code-overridemethoddefaulttemplateallkinds %}

## Overriding properties

Override the implementation of a field or property. If the examples above were annoyingly simple, here's a more complex example that demonstrates the implementation of that and shows how to automatically generate code that calls a service locator.

{% embedded id:override-property-example, url:https://doc.metalama.net/aspects/simple-aspects/overriding-properties, node:code-globalimportwithsetter %}

## Introducing members and implementing

Your aspect can generate new methods, properties, fields or events. It can make the target type implement a new interface. The following example goes further in complexity and implements the _deep cloneable_ pattern.

{% embedded id:clone-example, url:https://doc.metalama.net/aspects/advising/implementing-interfaces, node:code-deepclone %}

## Authoring complex code templates

Code templates can have compile-time conditions, loops, variables, lambda expressions, and more. Code template can contain `dynamic` code to bind to the target code.

Even if the features of the template language are impressing, there will be times when it will be more convenient to generate code using an interpolated string, a `StringBuilder`, or a similar classical mechanism. For these situations, you can parse any string containing C# code into an expression or statement, then use it in C# just like other expression.

The template language offers helper classes to generate run-time expressions like arrays or, as in the following examples, interpolated strings:

{% embedded id:interpolated-string-example, url:https://doc.metalama.net/aspects/templates, node:code-tostring %}

You can easily convert compile-time objects, such as collections, intrinsic types or reflection types, to C# expressions. You can even define custom converters for your own classes. The following example demonstrates the conversion of the system type `Dictionary` and a custom type. It also shows how to programmatically generate expressions.

{% embedded id:custom-serializer-example, url:https://doc.metalama.net/aspects/templates, node:code-customsyntaxserializer %}

## Defining eligibility

Aspects can define onto which declarations they want to be applied.

{% embedded id:eligibility-example, url:https://doc.metalama.net/aspects/eligibility, node:code-eligibility %}

## Reporting and suppressing diagnostics

Aspects can report warnings and errors. They can also suppress warnings reported by the C# compiler or other analyzers. In this example, we revisit a previous example and add some validation.

{% embedded id:report-example, url:https://doc.metalama.net/aspects/diagnostics, node:code-localimport %}

It's perfectly fine to create an aspect that _only_ analyzes the code and reports diagnostics, without transforming the code.

## Adding aspects in bulk using fabrics

If you don't want to add a custom attribute on each method to add your logging aspect, no problem. Fabrics have you covered. In the following example, we are adding the `Log` aspect to all methods of the current project.

{% embedded id:fabrics-example, url:https://doc.metalama.net/using-aspects/applying-aspects, node:code-projectfabric %}

## Configuring aspects

You can create a configuration API for your aspects or just consume MSBuild properties.

{% embedded id:configuration-example, url:https://doc.metalama.net/aspects/exposing-configuration, node:code-aspectconfiguration %}

## Type fabrics

Without defining an aspect class, you can programmatically introduce new members, override existing members or report warnings in the current type by just defining a nested class.

{% embedded id:typefabric-example, url:https://doc.metalama.net/using-aspects/type-fabrics, node:code-advisingtypefabric %}

## Performing arbitrary modifications to code

Caravela's philosophy is to offer a well-mannered API to express code transformations safely, without changing the code semantics, and in a composable way (which means that you can safely add to the same declaration several aspects that don't know about each other). However, if you feel brave, you can shortcut the safety features and implement your code transformations directly using the Roslyn API. Anything you could do with an IL weaving tool like Cecil, Fody, CCI or PostSharp can now be done with Caravela. The [documentation](https://doc.metalama.net/sdk/sdk) of this feature is severely outdated but you can have a look at the [ConfigureAwait example](https://try.postsharp.net/#autoconfigureawait).

## Modifying _source_ code with an aspect at design time

All of the examples above only modify intermediate code, not the _source_ code, which keeps things clean and readable. We call this a _live template_ because an aspect, by definition, does not modify the source code. However, any aspect can be used as a live template. 

![Live template](/assets/images/2021/2021-11-caravela-preview/live-template.png#unzoom200)

## Previewing the transformed code

You can compare the source code with the code being executed.

![Diff](/assets/images/2021/2021-11-caravela-preview/diff.png#unzoom300)

## Syntax highlighting of aspect code

Aspects are like code templates that mix run-time code with compile-time code, but without any markup tags. To help you understand which expressions and statements are compile-time, and which are just normal, we built a Visual Studio extension that colors the aspect code.

![Diff](/assets/images/2021/2021-11-caravela-preview/syntax-highlighting.png#unzoom150)

## Debugging the source or transformed code

You can choose to debug the source _or_ transformed code.

![Debugging](/assets/images/2021/2021-11-caravela-preview/debugging.png#unzoom200)

## Testing aspects

You can test your aspects with exactly the same testing framework we use internally. A test case generally includes a source file and an expected transformation file. The test succeeds if your aspect transformed the source file into the expected transformation file.

![Debugging](/assets/images/2021/2021-11-caravela-preview/testing.png#unzoom200)

## What does not work yet

Although the list of features that work is already long, now is not the time to use Caravela in your production projects:

* Licensing is not yet implemented. You cannot buy it, but you can use it for free under the evaluation license.
* It's not the final name! "Caravela" is a code name, and we still need to reveal the final name and rename all packages and namespaces.
* Logging and telemetry is not yet implemented, so we cannot assist users in troubleshooting, and cannot pro-actively debug.
* It's largely untested with large projects and solutions -- mostly just unit tests and sample projects.
* Aspect initialization is not yet implemented.
* You cannot yet add aspects to operators and constructors.
* There are some gaps in the design-time experience.
* We still want to add more features into code validation and design-time code generation.

## Summary

This is the last preview of "Caravela" under the project codename and there is almost a stack overflow of features! In a couple of weeks, we will reveal the final product name and a few licensing options. All I can say for now is that _a lot_ of these features will be available for free for everybody -- from individuals to corporations.

We'd love your feedback on [GitHub](https://github.com/postsharp/Caravela/discussions), [Gitter](https://gitter.im/postsharp/caravela?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) or as a comment on this page.

Please [subscribe to our newsletter](#newsletter) to stay informed about our progress with this project.

Happy PostSharping!

-gael

