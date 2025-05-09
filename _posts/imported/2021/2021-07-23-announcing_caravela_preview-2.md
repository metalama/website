---
layout: post 
comments: false
title: "Announcing PostSharp \"Caravela\" Preview 2 (0.3.5)"
date: 2021-07-23 08:30:00 +02:00
categories: [Metalama]
permalink: /blog/announcing-caravela-preview-2
origin: https://blog.postsharp.net/announcing-caravela-preview-2
author: "Gael Fraiteur"
image: /assets/images/2021/2021-01-25-caravela-announcement/Project Caravela 1.png 
summary: "The second preview of PostSharp \"Caravela\", a Roslyn-based meta-programming framework for [aspect-oriented programming](https://www.postsharp.net/solutions/aspect-oriented-programming), code generation, and code validation, has been announced. The preview is built on the product's final architecture but is not yet suitable for production use."
---

We've made it! The Roslyn-based "Caravela" can now implement INotifyPropertyChanged and aspect-oriented way and you can [try it in your browser](https://try.postsharp.net/#inpc). But watch out! You can run with a knife that's in preview, but not in production code.

If you haven't heard from us for three months, it's because we have been badly hit by the COVID/lockdown mess in April. We're now working with a smaller team, have more energy than _ever_, and we have chosen to focus it on our top priority: code, not words.

Today, we're excited to announce the second preview of PostSharp "Caravela", our new Roslyn-based meta-programming framework for [aspect-oriented programming](https://www.postsharp.net/solutions/aspect-oriented-programming), code generation and code validation. PostSharp "Caravela" is to become the successor of the MSIL-based PostSharp Framework and PostSharp SDK.

Whereas the first preview, announced six months ago, was merely a proof of concept, the current preview is built on the final architecture of the product. It implements the most useful aspect-oriented features and a large part of the C# language. As an early preview, however, it is still unsuitable for production use. The most noticeable gap is the lack of support for async methods and the poor handling of warnings, including nullability warnings. Caravela still does not cover all the features of the "old" PostSharp, so if you're excited to port your aspects to the new stack &ndash; wait.

That said, Caravela is already a wonderful playground. It already implements a load of feature.

## Aspect-oriented features

There are _a lot_ of features here and illustrating them all would be long, so I invite you to follow these links to see examples and explanations.

- [An innovative C#-based template language](https://doc.metalama.net/aspects/templates) that allow you to mix meta expressions and statements (such as compile-time loops) with run-time code;
- [Overriding existing methods, fields, properties, events (add/remove)](https://doc.metalama.net/aspects/simple-aspects/simple-aspects);
- [Introducing new methods, fields, properties or events into an existing type](https://doc.metalama.net/aspects/advising/introducing-members);
- [Implementing new interfaces in an existing type](https://doc.metalama.net/aspects/advising/implementing-interfaces);
- Mixing of all of the above in a single aspect &mdash; _YES!_ we now do INotifyPropertyChanged ([try it in your browser!](https://try.postsharp.net/#inpc));
- [Reporting and suppressing diagnostics from your aspects](https://doc.metalama.net/aspects/diagnostics)
- [Support for several aspects on the same declaration](https://doc.metalama.net/aspects/ordering)
- Handling of lexical conflicts and namespaces: the code generated by the aspect will not conflict with the target code.

## Example: INotifyPropertyChanged

Here is an aspect that implements INotifyPropertyChanged and intercepts all property setters. [Try it in your browser](https://try.postsharp.net/#inpc). You will get meta syntax highlighting as a bonus.

```cs
using Caravela.Framework.Aspects;
using Caravela.Framework.Code;
using System;
using System.Linq;
using System.ComponentModel;

namespace Caravela.Samples.NotifyPropertyChanged
{
    class NotifyPropertyChangedAttribute : Attribute, IAspect<INamedType>
    {
        public void BuildAspect( IAspectBuilder<INamedType> builder )
        {
             builder.AdviceFactory.ImplementInterface(
               builder.TargetDeclaration, 
               typeof(INotifyPropertyChanged));

            foreach (var property in builder.TargetDeclaration.Properties.Where( 
                p => !p.IsAbstract && p.Writeability == Writeability.All ))
            {
                builder.AdviceFactory.OverrideFieldOrPropertyAccessors(
                  property, 
                  null, 
                  nameof(OverridePropertySetter));
            }
        }

        [InterfaceMember]
        public event PropertyChangedEventHandler PropertyChanged;

        [Introduce( WhenExists = OverrideStrategy.Ignore )]
        protected void OnPropertyChanged(string name)
        {
            meta.This.PropertyChanged?.Invoke(
               meta.This,
                new PropertyChangedEventArgs(name));
        }

        [Template]
        dynamic OverridePropertySetter( dynamic value )
        {
            if ( value != meta.Property.Value )
            {
                meta.Proceed();
                this.OnPropertyChanged(meta.Property.Name);
            }

            return value;
        }
    }
}
```

## Design-time features

### Live templates

Creating [live templates](https://doc.metalama.net/aspects/creating-live-template), i.e. complex code transformations, like aspects, but that are executed from the lightbulb menu in the editor and applied to your source code.

![Screenshot](/assets/images/2021/2021-07-22-caravela/LiveTemplate2.png#unzoom150)

### Syntax highlighting of aspects

If you install our [Visual Studio extension](https://marketplace.visualstudio.com/items?itemName=PostSharpTechnologies.caravela), you will get additional syntax highlighting for template code: compile-time code will be displayed on a grayed background, while run-time code will be displayed normally.

Here is an example:

![Screenshot](/assets/images/2021/2021-07-22-caravela/SyntaxHighlighting.png#unzoom150)



## Testing

We have built a dedicated [xUnit-based framework](https://doc.metalama.net/aspects/testing/compile-time-testing) to test aspects. A test constitutes of at least two files: an input file, which corresponds to the source code, and an output file, which contains the expected transformed code. The test consists in comparing the expected transformed code with the actual code, as transformed by the aspect.

## Samples and Documentation
  
- [try.postsharp.net](https://try.postsharp.net/), an online tool to try Caravela without installing it on your machine (a fork of try.dot.net);
- A dozen of open-source [samples](https://github.com/postsharp/Caravela.Samples);
- A reasonably complete [online documentation](https://doc.metalama.net) with code snippets that can be executed and edited online thanks to [try.postsharp.net](https://try.postsharp.net/),
automatically and comprehensively [tested](https://github.com/postsharp/Caravela/tree/master/code/Caravela.Documentation.SampleCode.AspectFramework).

## Summary

We have reached an important milestone with PostSharp "Caravela". We are now working on stabilizing the product and continuing to build the most important features. Until it's done, we will continue focusing and code instead of words.

For feedback and questions, please use our [GitHub discussion board](https://github.com/postsharp/Caravela/discussions).

Happy PostSharping!

-gael


_UPDATE:_ Fixed the code example (thanks DomasM).
