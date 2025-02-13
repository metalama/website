---
layout: new-post
title: "The State of Aspect-Oriented Programming in C# [2025]"
date: 2024-12-09 08:30:00 +01:00
categories: [Opinion]
permalink: /blog/state-of-aop
author: "Gael Fraiteur"
summary: "This article reviews the state of aspect-oriented programming in C# and .NET in 2025. It addresses misconceptions, lists and compares implementations, and studies how the main challenges have been resolved."
keywords:
- aspect oriented programming C#
- aop c#
- ".net"
image: /assets/images/2024/2024-12-state-of-aop/aop-dark.svg
thumbnail: /assets/images/2024/2024-12-state-of-aop/aop-light.svg
source_url: https://github.com/postsharp/Metalama.Samples/blob/HEAD/examples/caching/caching-1
---

Aspect-oriented programming (AOP) was invented in the early 2000s and enjoyed a few years of hype. Althought it has been implemented in many languages, it seems to have faded in the background. Even Metalama, the most comprehensive AOP framework for .NET, does not primarily market itself as an AOP framework. What ever happened to AOP, and what is its status in the .NET world today?

{: .note :}
I'm writing this article in the context of the [C# Advent 2024](https://www.csadvent.christmas/) as a wink to its creator [Matt Groves](https://www.linkedin.com/in/mgroves/). In 2013, Matt wrote a book named [AOP in .NET](https://www.manning.com/books/aop-in-net), covering both PostSharp and Castle DynamicProxy. This article reviews how the .NET landscape has evolved since that book was written.

## What is aspect-oriented programming?

If you haven't heard about AOP before, it's a programming concept that extends Object-Oriented Programming and focuses on separating the implementation of _repetitive code patterns_ from the main business logic, improving modularity and separation of concerns.

Without AOP, repetitive code patterns are often required to implement _cross-cutting concerns_, i.e., non-business features, such as logging, security, observability, or thread synchronization, that apply to several business features.

With AOP, you can encapsulate these code patterns in a special kind of class named _aspects_. Aspects know how to mechanically add behaviors to your source code. For instance, you can create aspects for logging, security, and observability or implement design patterns such as Memento or Builder.

### Example: a caching aspect

To make things more tangible, let's see how we can implement a _caching_ aspect using Metalama.

Here is the implementation of an aspect that adds logging to its target method:

```csharp
public class CacheAttribute : OverrideMethodAspect
{
    // Pull a dependency into the target class.
    [IntroduceDependency]
    private readonly ICache _cache;

    public override dynamic? OverrideMethod()
    {
        // Builds the caching string.
        var cacheKey = CacheKeyBuilder.BuildCacheKey( meta.Target.Method ).ToValue();

        // Cache lookup.
        if ( this._cache.TryGetValue( cacheKey, out object value ) )
        {
            // Cache hit.
            return value;
        }

        // Cache miss. Go and invoke the method.
        var result = meta.Proceed();

        // Add to cache.
        this._cache.TryAdd( cacheKey, result );

        return result;
    }
}
```

In the code above, `OverrideMethod` is a _template_ applied to the method to which we want to add caching. You can consider `meta` as a "magic" keyword (actually, it's a static class) that gives you access to meta-programming features. `meta.Proceed()` is replaced by the _original_ method implementation (before caching is applied), and `meta.Target.Method` represents the method to which the aspect is applied. `CacheKeyBuilder` is a compile-time utility method. Read [this article](https://doc.postsharp.net/metalama/examples/caching) for details about this aspect.

Since this class is a custom attribute, we can add it to any method we want to cache. Here is our _source_ code, i.e., the one we write manually and commit to _git_:

```csharp
public class Calculator
{
    public int InvocationCounts { get; private set; }

    [Cache]
    public int Add( int a, int b )
    {
        Console.WriteLine( "Thinking..." );
        this.InvocationCounts++;

        return a + b;
    }
}
```

At compile time, Metalama transparently transforms your source code using the `[Cache]` aspect. Here is the code that gets _executed_:

```csharp
public class Calculator
{

    ICache _cache;

    public Calculator( ICache cache )
    {
        this._cache = cache;
    }

    public int InvocationCounts { get; private set; }

    [Cache]
    public int Add( int a, int b )
    {
        var cacheKey = $"Calculator.Add({a}, {b})";

        if ( this._cache.TryGetValue( cacheKey, out object value ) )
        {
            return (int) value;
        }

        Console.WriteLine( "Thinking..." );
        this.InvocationCounts++;

        var result = a + b;

        this._cache.TryAdd( cacheKey, result );

        return result;
    }
}
```

As you can see, the aspect:
1. Pulls the new `ICache` dependency into the `Calculator` class, and
2. Overrides the `Add` method to add caching.

Your caching logic is now decoupled from your business logic. You can apply caching to dozens of methods without repeating yourself.

That sounds nice. So, why isn't AOP more popular in .NET today?

## A horrendous communication strategy

Before we go through the state of AOP in .NET, I'd like to rant about the _horrendous_ communication strategy chosen by the AOP researchers in the early 2000s.

Remember, when you're an innovator, your role is not only to come up with a _technology_ or an _implementation_. Most importantly, as an innovator, your role is also to imagine new _concepts_ to analyze the world and a new _language_ to describe it. This discipline is known as _messaging and positioning_ in technical marketing. It eventually defines how people will talk about your new product: which words they will use and how they will frame the technology when talking to their friends. Microsoft is especially good at this exercise. Looking closely, you will never see a product published without a strong communication framework. Occasionally, they will have an excellent communication framework with a very poor product! That's because Microsoft is not an innovative company...

The first mistake of AOP founders was positioning the technology as a _paradigm_ and to name it aspect _oriented_ programming. This choice consequently framed AOP as an _alternative_ to object-oriented programming, which I think was a big mistake. In my opinion, AOP is _not_ a paradigm of its own. It is an _extension_ of object-oriented programming, certainly not an alternative.

Another communication mistake was to rely on jargon terms like _advice_, _joinpoint_, _pointcut_ or even _cross-cutting concerns_. This leads to this terrible definition: _Aspect-oriented programming is a programming paradigm aiming to improve the separation of cross-cutting concerns by encapsulating them into aspects, which use pointcuts to add advice to select joinpoints_.

Although I think this initial lexicon was a mistake, it was probably understandable given the context of the early 2000s. When AspectJ was released, Java did not have custom attributes yet (called _annotations_ in Java). Other than using specially formatted comments, there was no way to specify that some methods should be logged or made transactional. Therefore, the researchers had to invent a mechanism to select which elements of code would be advised, and this mechanism was called _pointcut_.

From the early days, AOP was positioned as a technology that aimed to extend the longevity of codebases by making it possible to alter their behavior without modifying their source code by adding aspect files purely orthogonal to the original source. Some people and OOP influencers misunderstood AOP as a _hacking_ or _patching_ technology to get around bad object-oriented designs.

As with any tool, we must acknowledge that AOP can be used for better or worse. Thankfully, after a quarter of a century of existence, we now understand better how to talk about aspect-oriented programming, when it is useful, and when it is harmful.

## Talking about AOP today

Despite the progress of programming languages and software engineering practices, despite the catastrophic communication around AspectJ, I still think that classic languages have not completely addressed the gap identified by the early AOP researchers.

I'm talking about the abstraction gap between human reasoning and programming languages.
Software architects, like all humans, think in terms of _patterns_ and say things like: "Add logging to all public methods of public classes in namespace `X`, and implement `INotifyPropertyChanged` for all classes derived from `BaseEntity`." However, the C# language does not have a way to do "for each declaration `X`, add behavior `Y`." Aspect-oriented programming (AOP) comes as a mechanism to fill this abstraction gap.

[Aspect-oriented programming](https://www.postsharp.net/solutions/aspect-oriented-programming) is a form of meta-programming that operates at the same level of abstraction as the C# language. It attempts to _raise_ the level of abstraction, not _lower_ it. Therefore, IL rewriting is _not_ AOP. Nor are Roslyn source generators.

The question is whether aspect-oriented programming, redefined as a mechanism to bridge this abstraction gap, is still AOP.

Due to communication issues, we no longer primarily position Metalama, our flagship product, as an AOP framework. We say that it is a code generation and validation framework. Like AOP, Metalama encourages well-engineered practices. It focuses on robustness and predictability. It aims to make the code more understandable, not less.

Yet, Metalama is now the most extensive and mature AOP framework for .NET.

## Is AOP still useful in modern C#?

AOP was formalized when Java and C# were still in their infancy. In the meantime, both languages and development practices have evolved. The generalization of higher-order functions (delegates, anonymous methods, lambdas) and dependency injection have greatly improved modularity, covering some of the initial use cases of aspect-oriented programming. Therefore, some developers question the usefulness of AOP in modern applications.

* **Higher-order functions** (methods accepting delegates) can help encapsulate cross-cutting logic like, for instance, caching (see the [IMemoryCache.GetOrCreateAsync](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.caching.memory.cacheextensions.getorcreateasync) extension method). However, they still have limitations:
   - You still have to manually pass the context (i.e., parameters), and
   - You still have to manually add a method call everywhere, potentially in hundreds of methods.

   AOP solves these two problems.

* **Dependency injection** has popularized the practice of separating interfaces from implementations, which is especially useful for unit testing. This design allows the addition of behaviors through _proxies_ (often dynamically generated ones) instead of by modifying the source or IL code. However, this approach only allows the addition of behaviors in the communication lines _between_ components. Unlike compile-time AOP, dependency injection does not allow you to add behaviors _inside_ components.

In .NET, examples of code patterns that are still better handled by AOP than by other mechanisms include:

* Instrumentation: [logging](https://doc.postsharp.net/metalama/examples/log), profiling;
* Security: authorization, audit, encryption;
* Resilience: [caching](https://blog.postsharp.net/aspire-caching-metalama), transaction handling, [exception handling](https://doc.postsharp.net/metalama/examples/exception-handling);
* UI: [observability](https://blog.postsharp.net/inotifypropertychanged-metalama) (`INotifyPropertyChanged`), change tracking, undo/redo, WPF [dependency properties](https://blog.postsharp.net/wpf-dependency-property-metalama) and [commands](https://blog.postsharp.net/wpf-command-metalama);
* Classic design patterns: [Builder](https://blog.postsharp.net/builder-pattern-with-metalama), [Singleton](https://doc.postsharp.net/metalama/examples/singleton), [Memento](https://doc.postsharp.net/metalama/examples/memento), Factory, Proxy, [Decorator](https://blog.postsharp.net/decorator-pattern);
* Multi-threading: synchronization (locking), freezable, background execution;
* Classic object services: equality, `ToString`;
* Persistence: object-database mapping, serialization, object-configuration mapping.

## When to use AOP?

I often hear you can implement the above use cases with standard OOP.

To this criticism, I want to refute this:

Yes, you are right. There is nothing you can do with AOP that OOP alone cannot do. Eventually, all languages are compiled into assembly language. So, we are not talking about an all-or-nothing ability but about cost and complexity.

Without AOP, your initial costs of implementing these features will certainly be lower. But your _marginal_ cost will be higher. You'll pay the cost of coding the same pattern hundreds of times and also the cost of refactoring if you ever change your mind.

With AOP, you are trading a near-zero marginal cost for a higher initial cost. The same applies to complexity. Yes, using AOP adds complexity, but this is a one-off, while _not_ using AOP adds complexity for each new feature added to your product.

With AOP, scale is everything.

Just because you need to cache one or two methods does not mean that you should use an aspect for it.

As a rule of thumb, you need _dozens_ of uses of an aspect to justify building one. _Getting Started_ guides will always insist on how easy it is to create something easy. Perhaps. But with aspects, the devil is in the detail. It can take days to create a robust aspect, one that will act as a productivity multiplier for your team instead of one of those the-boss-wants-us-to-use-it libraries.

Of course, if you're using ready-made, tested aspects ([and we release a lot of them open-source for free](https://doc.postsharp.net/metalama/patterns)), it will pay off sooner than if you build your own.

Let's be honest. AOP frameworks like PostSharp or Metalama are heavyweight dependencies. You don't want them in your projects until it _really_ makes a difference. In a small project, it's probably not going to make a big difference. However, one of our customers confessed to having saved _tens of millions of euros_ thanks to AOP.

## How is AOP implemented in .NET today?

Today's aspect-oriented frameworks all rely on one of the following approaches:

* [MSIL Rewriting](https://www.postsharp.net/solutions/msil-rewriting) is the process of modifying the binary assembly during the build process. An additional step is added to this process just after the C# compiler. This approach was pioneered by PostSharp when the C# compiler was a black box. It is now considered obsolete, but many tools still rely on it.

* **Roslyn-based** frameworks interact directly with the compiler without requiring an additional process. They are based on official Roslyn extension points such as analyzers and code generators, plus unofficial extension points added by [Metalama.Compiler](https://github.com/postsharp/Metalama.Compiler), an open-source Roslyn fork, which allows arbitrary code transformations. [Metalama](https://www.postsharp.net/metalama) is currently the only framework in this category. Roslyn-based frameworks can give you real-time feedback as you are typing, while MSIL-based ones require you to rebuild.

* [Middleware-based frameworks](https://www.postsharp.net/solutions/middleware) generally rely on a dependency injection framework and generate dynamic proxies at runtime. They are limited to intercepting interface methods and adding new interfaces to types.

Here is an overview of the main aspect-oriented frameworks available for .NET in 2024. This list is followed by a table comparing their features.

### PostSharp

[PostSharp](https://www.postsharp.net/il), launched in 2008, was the first complete implementation of AOP concepts in .NET. It is based on [MSIL rewriting](https://www.postsharp.net/solutions/msil-rewriting). PostSharp became a source of inspiration for several MSIL-based AOP frameworks.

PostSharp includes a broad set of ready-made aspects. It has complete documentation.

It comes with a Visual Studio extension that provides visibility into the transformations performed by aspects.

### Metalama

[Metalama](https://www.postsharp.net/metalama), built by the same team as PostSharp and first launched in 2023, is PostSharp's successor. Based on Roslyn, Metalama works both at design time (within the IDE) and compile time. It is today's most complete implementation of aspect-oriented principles.

Metalama uses a C#-to-C# template language coined _T#_. T# is 100% C#-compatible, so you can get full IntelliSense support with any IDE.

Since Metalama generates C# and not MSIL, you can preview and even debug the code generated by your aspects.

Metalama shares the same Visual Studio extension as PostSharp.

### AspectInjector

Like PostSharp, [AspectInjector](https://github.com/pamidur/aspect-injector) is based on [MSIL rewriting](https://www.postsharp.net/solutions/msil-rewriting).

While far from PostSharp regarding features, AspectInjector supports most code overriding and introduction features expected from an AOP framework.

### Rougamo

[Rougamo](https://github.com/inversionhourglass/Rougamo) is another compile-time AOP framework based on [MSIL rewriting](https://www.postsharp.net/solutions/msil-rewriting). Its code transformation abilities are limited. It implements an AspectJ-inspired pointcut mechanism to select code to be modified.

### AspectCore

[AspectCore](https://github.com/dotnetcore/AspectCore-Framework) is an aspect-oriented framework based on [dynamic proxies](https://www.postsharp.net/solutions/middleware). This approach operates at runtime by generating a _proxy_ type between the consumer and the implementation of an interface. It works only with components served by a dependency injection framework.

### Fody

[Fody](https://github.com/Fody/Fody) is an extensible tool for weaving .NET assemblies. It is not an aspect framework in itself, but [some](https://github.com/vescon/MethodBoundaryAspect.Fody) [plug-ins](https://github.com/Fody/MethodDecorator) allow for PostSharp-style decoration of methods, allowing for the implementation of some simple aspects.

Fody has a long list of [plug-ins](https://github.com/Fody/Home/blob/master/pages/addins.md) that implement specific code transformations. Because these transformations must be coded directly in MSIL and not in C#, Fody does not fully qualify as an aspect-oriented framework.

## Unit-testing aspects in 2025

When we discussed with Matt about his book back in 2013, we had a disagreement about unit testing of aspects. The only way to test PostSharp aspects was to apply them to a method, invoke that method, and check its output or its side effect. Matt argued that this was not real unit testing. And he was right.
Ten years later, you can finally unit-test aspects! Metalama, PostSharp's successor, now generates C# code instead of MSIL. You can now test that your aspect generates the code you expect. We've built an [aspect test framework](https://doc.postsharp.net/metalama/conceptual/aspects/testing/aspect-testing) for this purpose. It works as a _snapshot test_, similar to [Verify](https://github.com/VerifyTests/Verify), and integrates with [DiffEngine](https://github.com/VerifyTests/DiffEngine).

## Dependency injection in aspect in 2025

Another area that has greatly improved in the last decade is the integration of aspects with dependency injection (DI) containers.

The reason that the concepts of DI and AOP were not properly integrated from the beginning is that they were both formalized around the same time, in the early 2000s. The first AOP implementations, including PostSharp, were not designed for dependency injection. This was a serious limitation because many aspects depend on services that are typically exposed in a dependency injection container. For instance, a logging aspect uses `ILogger`, caching uses `IMemoryCache`, and so on. That led to excessive use of static methods in aspects, which made them difficult to test.

Metalama now has first-class support for dependency injection. As you have seen in the example above, aspects can [import dependencies](https://doc.postsharp.net/metalama/patterns/dependency-injection) using the `Metalama.Extensions.DependencyInjection` package. With the default .NET Core dependency injection pattern, dependencies are [added as constructor parameters](https://doc.postsharp.net/metalama/conceptual/aspects/advising/introducing-constructor-parameters) and pulled from derived classes.

Therefore, I consider that today, dependency injection and AOP are complementary and almost orthogonal concepts.

## Comparing AOP frameworks for .NET

|          | Metalama | PostSharp | AspectInjector | Rougamo | AspectCore |
|----------|----------|-----------|----------------|---------|------------|
| Technology | Roslyn | MSIL | MSIL | MSIL | Dynamic Proxies |
| Override virtual members | Yes | Yes | Yes | Yes | Yes |
| Override non-virtual members | Yes | Yes | Yes | Yes | No |
| Implement interfaces | Yes | Yes | Yes | No | Yes |
| Introduce new members | Yes | Yes | Yes | No | No |
| Reference introduced members from source code | Yes | No | No | No | No |
| Allocationless context passing | Yes | No | Yes | No | No |
| IDE: Aspect Explorer | Yes | Yes | No | No | No |
| IDE: CodeLens | Yes | Yes | No | No | No |
| View/Debug Generated C# | Yes | No | No | No | No |
| Large library of pre-built aspects | Yes | Yes | No | No | No |
| Unit testing of aspects | Yes | No | No | No | No |
| Pulling dependencies from aspects | Yes | No | No | No | Yes |

## Conclusion

Although the initial creators of aspect-oriented programming made a couple of communication mistakes, they identified a gap that the C# language still fails to address. This is the gap between the abstraction level of human reasoning and the abstraction level of the C# language. This problem has not yet been completely addressed by the C# language. It is still responsible for a large amount of boilerplate.

According to our telemetry data, using PostSharp or Metalama typically reduces hand-written code by 15%. This shows that disciplined, robust meta-programming is still an axis on which mainstream programming languages can be improved. For those who don't want to wait for C# 22, there's Metalama!
