---
layout: post 
comments: false
title: "Metalama is Available Today"
date: 2023-05-04 08:00:01 +01:00
categories: [Metalama]
permalink: /blog/metalama-2023.0
origin: https://blog.postsharp.net/metalama-2023.0
author: "Gael Fraiteur"
image: /assets/images/2023/2023-05-03-metalama-ga/title.jpeg
tag: featured
summary: "Metalama, a new meta-programming framework designed to improve C# developers' productivity and code quality, has been released and is now available for production use."
---

[Metalama](https://www.postsharp.net/metalama), the new meta-programming framework aimed at helping developers deliver clean and concise code, is now available for production use. We are giving a 50% discount on all Metalama licenses until the end of July to celebrate this release.

## What is Metalama?

Metalama helps C# developers improve their productivity and code quality. It offers the following benefits:

* **Reduce boilerplate** by generating it dynamically during compilation thanks to [aspect-oriented programming](https://www.postsharp.net/solutions/aspect-oriented-programming). Your source code remains crystal-clear.
* **Verify code** in real time against architecture, patterns, and conventions. No need to wait for code reviews.
* **Provide coding assistance** to your team with customized feedback and suggestions.
* **Do it by your rules.** Automate your own implementation patterns and architecture guidelines.

Based on Roslyn, Metalama integrates with most C# IDEs and editors including Visual Studio, Rider, and Visual Studio Code.

Developed since August 2020, it has been serving real users since July 2022. We have integrated their feedback and fixed countless bugs to reach this point where we can now say that Metalama is ready for production

You can learn more about Metalama and its features on this [website](https://www.postsharp.net/metalama).

## Top Features

### T# Templates

Leverage the power of T#, a markup-free, C# syntax-compatible template language with Visual Studio syntax highlighting.

![T# Templates](/assets/images/2023/2023-05-03-metalama-ga/template.png#width75)

### Override Anything

Unlike proxy-based AOP frameworks, Metalama is not limited to interfaces and virtual methods.

![Override Anything](/assets/images/2023/2023-05-03-metalama-ga/override-anything.svg#width75)

### Aspect Inheritance

Automatically apply aspects to child classes by marking parent classes — even across projects.

![Aspect Inheritance](/assets/images/2023/2023-05-03-metalama-ga/aspect-inheritance.svg#width75)

### Fabrics

Implement compile-time project entry points for aspect addition or code validation.

![Fabrics](/assets/images/2023/2023-05-03-metalama-ga/fabrics.svg#width75)

### Intellisense

Access aspect-introduced code in real-time, without recompiling.

![Intellisense](/assets/images/2023/2023-05-03-metalama-ga/intellisense.svg#width75)

### Instant Diagnostics

Receive real-time error and warning notifications from aspects in the editor.

![Instant Diagnostics](/assets/images/2023/2023-05-03-metalama-ga/diagnostic.svg#width75)

### Diff Preview

Seamlessly compare source and transformed code within Visual Studio.

![Diff Preview](/assets/images/2023/2023-05-03-metalama-ga/diff.svg#width75)

### CodeLens

Quickly identify applied aspects in the editor even when it is not obvious from source code.

![CodeLens](/assets/images/2023/2023-05-03-metalama-ga/codelens.svg#width75)

### Custom Fixes & Suggestions

Develop team-specific code fixes linked to diagnostics.

![CodeLens](/assets/images/2023/2023-05-03-metalama-ga/codefix.svg#width75)

### Syntax Highlighting

Easily distinguish meta code with T# color-coding.

![T# Templates](/assets/images/2023/2023-05-03-metalama-ga/template.png#width75)


### Debugging Flexibility

Select between stepping into the transformed code or staying within the source code.

![Debugging](/assets/images/2023/2023-05-03-metalama-ga/debugging.svg#width75)

### Testing Framework

Efficiently test aspects on various target declarations with the integrated Visual Studio or Rider test runner.

![Testing Framework](/assets/images/2023/2023-05-03-metalama-ga/testing.svg#width75)


### Querying Interactively

Use the Linqpad driver to query your codebase interactively like a database and analyze the behavior of your aspects and fabrics.

![LinqPad](/assets/images/2023/2023-05-03-metalama-ga/linqpad.svg#width75)


### No Vendor Lock-In

Export transformed code and revert to vanilla C# anytime.

![Divorce](/assets/images/2023/2023-05-03-metalama-ga/divorce.svg#width75)


### Extensible with Roslyn

Overcome the limitations of Metalama and write transformations directly with Roslyn.

![Extensibility](/assets/images/2023/2023-05-03-metalama-ga/sdk.svg#width75)


### Open-Source Extensions

Access a range of published extensions and samples under open-source licenses.

![Extensions](/assets/images/2023/2023-05-03-metalama-ga/extensions.svg#width75)

## Metalama vs PostSharp

While Metalama is the successor to PostSharp, it is not yet a replacement, and migration from PostSharp is not recommended at this time unless all features required by your projects are available in Metalama. For more details, please see our [migration guide](https://doc.metalama.net/conceptual/migration). 

PostSharp is still being maintained and supported, as demonstrated by the recent release of [PostSharp 2023](https://metalama.net/blog/postsharp-2023). If you are a PostSharp user, we suggest you consider Metalama for new projects. Your PostSharp license already includes Metalama.

## Try Metalama today

If you're ready to transform the way you write code, get started in these three steps:

1. Explore the [examples](https://doc.metalama.net/examples) and try them in the online sandbox.

2. Install the [Metalama Tools for Visual Studio](https://marketplace.visualstudio.com/items?itemName=PostSharpTechnologies.metalama). It's optional, but we recommend it, especially if you're just starting.
 
3. Clone the [Metalama.Samples](https://github.com/postsharp/Metalama.Samples) repo, and start exploring!

## Special Promotion

To celebrate the release of Metalama, we are offering a 50% discount on all Metalama licenses until the end of July. Don't miss this limited-time opportunity to start using Metalama at a discounted price.


## Summary

Today we released Metalama, an innovative meta-programming framework aimed at elevating C# developers' productivity and refining code quality. Now production-ready, Metalama provides a wealth of features such as T# templates, aspect inheritance, fabrics, instant diagnostics and code fixes, and broad compatibility with multiple C# IDEs. While not an outright replacement for PostSharp, it is the ideal choice for new projects. Don't miss the limited-time 50% discount on all Metalama licenses, available until the end of July, and embark on a transformative coding journey with Metalama today!
