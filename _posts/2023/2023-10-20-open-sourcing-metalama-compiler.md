---
layout: post
comments: false
title: "Open-Sourcing Metalama Compiler, a Roslyn Branch with Source Transformers"
date: 2023-10-20 08:00:01 +01:00
categories: [Metalama]
permalink: /blog/open-sourcing-metalama-compiler
origin: https://blog.postsharp.net/open-sourcing-metalama-compiler
author: "Gael Fraiteur"
image: /assets/images/2023/2023-10-20-open-sourcing/llama-and-octopus.png
mermaid: true
tag: featured
summary: "PostSharp Technologies has open-sourced their Metalama Compiler, a Roslyn fork used by Metalama to modify code during compilation. The compiler aims to simplify meta-programming for developers and improve productivity."
---

We are excited to announce the open-sourcing of [Metalama.Compiler](https://github.com/metalama/Metalama.Compiler), the Roslyn fork used by [Metalama](https://www.postsharp.net/metalama) to modify code dynamically during compilation. `Metalama.Compiler` enables anyone to build arbitrary source transformers. 

The Metalama Compiler forms the foundation of Metalama, our high-level meta-programming framework that assists C# developers in reducing boilerplate using [aspect-oriented programming](https://www.postsharp.net/solutions/aspect-oriented-programming) and combating architecture erosion with architecture-as-code. The Metalama Compiler, representing several months of work, is a mature project that has seen no significant changes in the last 12 months, except minor bug fixes. By open-sourcing `Metalama.Compiler`, we aim to make it the preferred platform for Roslyn enthusiasts and `SyntaxNode` aficionados who want genuine source code generation capabilities. For _application_ developers, building aspects based on `Metalama.Framework` is significantly simpler -- not to mention that they can rely on a library of ready-made aspects on the [Metalama Marketplace](https://www.postsharp.net/metalama/marketplace).

## Why Did We Fork Roslyn?

Essentially, we forked Roslyn because we needed the ability to alter the code during compilation for our Metalama product.

When Microsoft introduced Roslyn in 2014, it was a game-changer for C# developers as it turned the traditionally opaque compilation process into a transparent and extendable API. Thanks to Roslyn, developers could see and use the rich information the compiler has about code. The initial extension points of Roslyn allowed any package to report custom warnings and errors using analyzers, suppress redundant warnings, and provide code fixes and refactorings. However, developers could not modify the code model.

In 2020, Microsoft took another step to open the compiler and introduced _source generators_, an extensibility point that allows any package to generate new source code -- typically partial classes -- and add them on-the-fly to the current project. The compilation process became open by _addition_. However, it was still closed to _modifications_, as there was still no way to modify an existing syntax tree.

At this point, I wrote a long and fruitful [technico-philosophical essay](https://medium.com/swlh/thinking-beyond-roslyn-source-generators-and-aspect-oriented-programming-3e42d58c37ac) on the cognitive nature of programming and how framework and language designers should avoid promoting hacks. As it turned out, my brain continued to think about this topic, and we soon started considering how to take advantage of these new Roslyn features to advance our ultimate mission -- to improve the productivity of C# application development teams. We began to consider rewriting PostSharp, based on MSIL rewriting, to Roslyn. The first prototypes were completed between August 2020 and February 2021. This project became known as Metalama.

The first step was to fork Roslyn and open it for code _modifications_, not just additions. We added a concept of _source transformer_, just as there already were analyzers and source generators. This fork is `Metalama.Compiler`. It was maintained in a private repository from August 2020 until today. `Metalama.Framework`, our high-level meta-programming framework featuring [aspect-oriented programming](https://www.postsharp.net/solutions/aspect-oriented-programming) for the masses, acts as a plug-in to `Metalama.Compiler` at compile time, and as a plug-in of the vanilla Roslyn at design time when it runs under the IDE.

We invested a significant amount of effort into this fork -- probably more than six months of real compiler professionals' time. Initially, we were hesitant to make it publicly available because we instinctively wanted to protect our work. But in the meantime, we realized that our real value was not in opening Roslyn for code modifications, but in making meta-programming simple and accessible for all developers, without requiring in-depth compiler knowledge. Indeed, we now estimate that creating aspects with `Metalama.Framework` is _two orders of magnitude_ simpler than doing that directly with the Roslyn API. Not surprisingly, the implementation of `Metalama.Framework` was also much more complex and demanding than the modifications we made to `Metalama.Compiler`, and our fears that someone is just going to "copy" us faded when we realized that just stabilizing our T# template language took us one year of hard work.

## Our Vision with Metalama Compiler

Our initial vision with `Metalama.Compiler` was to support _source transformers_ in addition to the existing Roslyn extension points, and to address all issues that would arise as a result of this feature: mapping of PDBs, mapping of diagnostics, interaction of this feature with analyzers and source generators, and so on. This vision is now mostly achieved, and we consider `Metalama.Compiler` as a stable project. We don't have plans for significant new features at the moment, and if we will have, they will always be features that support our main product, Metalama.

Some areas may be under-tested at the moment and will require more attention, notably the interactions with source generators.

We plan to continue merging changes originated from the Roslyn team at Microsoft. We do this whenever there is a new stable release of Roslyn. We don't plan to merge any prerelease changes.

## Technical Overview

This fork extends the capabilities of analyzer projects and allows them to execute arbitrary transformations of source code during compilation via the [ISourceTransformer](https://doc.metalama.net/api/metalama_compiler_isourcetransformer) interface from the `Metalama.Compiler.Sdk` package. Source transformers can replace entire syntax trees in the compilation. They can also add managed resources.

As an illustration, here is the typical skeleton of a source transformer:


```cs
using Metalama.Compiler;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

[Transformer]
public class MySourceTransformer : ISourceTransformer
{
    public void Execute(TransformerContext context)
    {
        var rewriter = new Rewriter();

        foreach (var tree in compilation.SyntaxTrees)
        {
            context.ReplaceSyntaxTree(
                tree,
                tree.WithRootAndOptions(rewriter.Visit(tree.GetRoot()), tree.Options));
        }
    }

    class Rewriter : CSharpSyntaxRewriter
    {
        // TODO: Implement transformations.
    }
}
```

By default, errors and warnings are reported on the _source_ code, and PDB files map the MSIL binary code to the _source_ code as well, so that debugging and breakpoints work as usual. It is possible to toggle that behavior and debug the _transformed code_ by setting some MSBuild properties. The ability to map diagnostics and PDBs back to the source code is by far the most complex feature of `Metalama.Compiler`.

When there are multiple source transformers in a project, they must be deterministically ordered.  One way to order transformers is to use the [TransformerOrderAttribute](https://doc.metalama.net/api/metalama_compiler_transformerorderattribute) assembly-level custom attribute. A second way is to define the `MetalamaCompilerTransformerOrder` MSBuild property.

By default, analyzers run _after_ all source transformers. This allows these analyzers to see the _final_ code. However, some analyzers, for instance, the ones checking formatting, need to see the _source_ code. To move the execution of an analyzer _before_ the source transformers, use the `MetalamaSourceOnlyAnalyzers` MSBuild property.

`Metalama.Compiler` only covers the _compilation_ use case. It does not cover other Roslyn use cases such as scripting or design-time. The `Metalama.Compiler.Sdk` package references the vanilla `Microsoft.CodeAnalysis.CSharp` package, _not_ the forked versions, which makes it possible to have analyzers, diagnostic suppressors, source generators _and_ source transformers in the same project. Source transformers won't be loaded at design time when the analyzer assembly will be loaded, but the other assets will load successfully.

<div class="mermaid">
flowchart BT

YourProject --> Metalama.Compiler.Sdk
Metalama.Compiler.Sdk --> Microsoft.CodeAnalysis
Metalama.Compiler.Sdk --> Metalama.Microsoft.CodeAnalysis

subgraph IDE
Microsoft.CodeAnalysis
end
subgraph Compile-Time
Metalama.Microsoft.CodeAnalysis
end

Microsoft.CodeAnalysis["`_vanilla_
 Microsoft.CodeAnalysis`"]

Metalama.Microsoft.CodeAnalysis["`_forked_
 Microsoft.CodeAnalysis`"]

</div>

Please note that `Metalama.Compiler` only works for C#. There is no plan to support Visual Basic.

For further details, see the [project home](https://github.com/metalama/Metalama.Compiler) on GitHub and the [API documentation](https://doc.metalama.net/api/metalama_compiler).

## Who Should Use Metalama Compiler?

Due to the high complexity and efforts involved in achieving anything significant in source code transformation, we believe that building a source transformer is not for everyone. Metalama Compiler is for researchers and _framework_ developers. However, if you are an _application_ developer, and your job is to deliver business features, then you should probably think more than twice before embarking on the source transformation journey.

The problem is that Roslyn is much too low level. For anything less trivial than making all public methods `virtual`, you will spend days catering for details that are already handled by a high-level meta-programming framework like `Metalama.Framework`.

For instance, one significant difference in the design philosophies of Roslyn and Metalama Framework is that Roslyn is _compiler sympathetic_ while Metalama Framework is _developer sympathetic_. Roslyn exposes various extensibility APIs such as analyzers, diagnostic suppressors, source generators or code fix providers. If you want to implement one aspect directly using these Roslyn APIs, you will need to integrate with _all_ these APIs, which are all their own entry points and have very little integration. However, with Metalama Framework, you implement one aspect class (one entry point) and have access to all the Roslyn features from the same place: reporting or suppressing diagnostics, generating source code or suggesting code fixes.

If you encounter code transformations not supported by `Metalama.Framework`, your initial response should be to consider the following: firstly, whether there is a supported method to achieve the same result; secondly, if it's possible to forgo the feature; and thirdly, to construct your Roslyn-level code transformation using `Metalama.Framework.Sdk` instead of `Metalama.Compiler.Sdk`. Utilizing `Metalama.Compiler.Sdk` allows your low-level code to benefit from all the features of `Metalama.Framework`, letting you focus solely on the code transformation rather than the entire scaffolding.

However, if you wish to construct another aspect-oriented framework, you can certainly build it on top of `Metalama.Compiler`. It may be an intellectually stimulating task and we wish you the best of luck.

## Contributing

You can contribute by reporting bugs, submitting feature requests to the [project's issue tracker](https://github.com/metalama/Metalama.Compiler/issues), or by proposing pull requests. Both pull requests and feature requests should align closely with the mission of `Metalama.Compiler`, which is to make the compiler open for code modification in an extensible way. The primary objective of this project is _not_ to serve as a universal fork for all changes rejected by the Roslyn team.    

## Wrapping Up

We have made [Metalama.Compiler](https://www.nuget.org/packages/Metalama.Compiler), our beloved Roslyn fork, open-source. This project has been in development since August 2020. We hope it will prove useful to syntactic enthusiasts and other semantic (or symbolic, as the case may be) zealots. 

My personal journey with meta-programming began in 2004 when I penned the first lines of PostSharp -- lines that interpreted bits of IL and abstracted them into an object model. A crucial lesson learned from this journey is that programming is not merely about moving bits. It is a cognitive and social activity. We don't write code for hardware. We don't even write it for the compiler. The primary consumers of our code are always humans: you, the future you, your colleagues, and your future colleagues who will still be maintaining, a decade from now, the code you are currently writing. This is why we need advanced programming languages and frameworks: to enable the expression of business or scientific solutions at a level of abstraction that aligns with human understanding -- _not_ with compilers or hardware.

Bridging the abstraction gap between bits and minds: this has been our journey, starting from PostSharp and now continuing with Metalama.

When developing a source transformer, always consider the perspective of the developer who will be _instructed_ to work with it. Creating a better programming experience is hard work, but it's worth it. Metalama Compiler stands as the latest gem in your toolkit.
