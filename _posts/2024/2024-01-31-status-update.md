---
layout: post
comments: false
title: "Metalama Status Update, January 2024"
date: 2024-01-31 08:00:01 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2024-01
author: "Gael Fraiteur"
image: /assets/images/2024/2024-01-31-status/llama.png
summary: "Metalama and PostSharp 2024.0 were released, introducing support for .NET 8, C# 12, and ARM64. Work is ongoing for Metalama 2024.1, which aims to enhance UI, build-time performance, and constructor advising. The company also announced a partnership with the Productive C# community."
---

In the Czech language, January is known as _leden_, or the month of ice. And ice-cold it was indeed in Central Europe! After swiftly rolling out Metalama and PostSharp 2024.0, we wrapped up warm in our homes and offices. We spent the rest of January preparing PostSharp and Metalama 2024.1, focusing primarily on UI convergence and build-time performance.

## Metalama and PostSharp 2024.0

Fridays and the two weeks before Christmas are no-go zones for releases at our end, so although both releases were ready by mid December, we patentiently waited. As soon as we all returned to the office post-holidays, we hit the `Deploy` button for both Metalama and PostSharp 2024.0. These releases introduced support for .NET 8 and C# 12. Moreover, PostSharp received its most substantial feature upgrade in years: full support for ARM64.

For more details, check out our announcement blog posts:

* [Introducing PostSharp 2024: Now with .NET 8.0, C# 12, and ARM64 Support](https://metalama.net/blog/postsharp-2024-0-ga)
* [Metalama 2024.0 Generally Available: .NET 8 and C# 12](https://metalama.net/blog/metalama-2024-0-ga)

## Metalama 2024.1 Preview 1

We've rolled out the [first preview](https://github.com/orgs/metalama/discussions/256) of Metalama 2024.1. This release aims to enhance the UI, improve build-time performance, and introduce support for constructor advising.

Keep in mind, this release is a work in progress, and the first preview provides a glimpse into what's under development.

Here's a taste of what it includes:

### Overriding constructors

You can now override a constructor using the `IAdviceFactory.Override(IConstructor constructor, string template, ...)` method. Check out the following code snippet for an example:

```cs
public class OverrideConstructorsAttribute : TypeAspect
{
    public override void BuildAspect( IAspectBuilder<INamedType> builder )
    {
        foreach (var constructor in builder.Target.Constructors)
        {
            builder.Advice.Override(constructor, nameof(Template));
        }
    }

    [Template]
    public void Template()
    {
        Console.WriteLine( "This is the override." );

        foreach (var param in meta.Target.Parameters)
        {
            Console.WriteLine($"Param {param.Name} = {param.Value}");
        }

        meta.Proceed();
    }
}
```

Please note, this feature is still under development. We have identified compatibility issues with `IAdviceFactory.IntroduceParameter` and constructor parameter contracts.

### User Interface

Starting with Metalama 2024.1, the software won't automatically start a trial upon installation. Instead, it will open a web-based UI where you can choose how to activate Metalama. Here's a preview of the UI:

<img src="/assets/images/2024/2024-01-31-status/licensing-ui.png"  style="zoom:0.55" />

On Windows, Metalama will display a toast notification instead of directly opening the activation UI. You will also receive toast notifications when your trial or subscription expires or if a system exception occurs. To keep these notifications manageable, you can snooze or mute them at any time.

### Performance optimizations

We've put a lot of effort into enhancing build-time performance. We've optimized several algorithms and improved our work with syntax nodes, significantly lowering memory allocation and GC load. We've also developed a benchmark suite, based on BenchmarkDotNet, to measure the performance of individual aspects and features. This suite helps determine how specific updates or releases affect performance.

Sadly, we still lack a benchmark that simulates a "realistic" customer project with a "reasonable" number of aspects.

What we do have is a "supercharged" test project based on NopCommerce, with several aspects per declaration. This project primarily helps us test Metalama on a large and diverse codebase, not specifically for benchmarking.

However, in this imperfect benchmark, we've measured a ~45% reduction in the build time overhead added by Metalama between versions 2024.0 and 2024.1.1. Please note, this doesn't guarantee you'll experience the same improvements in your projects.

We will continue to work on performance enhancements and on a more realistic benchmark to answer the question: _how does Metalama affect my build time_?

## Work in progress: Unification of Visual Studio tooling

With PostSharp 2024.1 and Metalama 2024.1, our objective is to unify the Visual Studio tooling. Having two separate extensions seems redundant as the UI features largely overlap. So, we're merging both Metalama and PostSharp extensions for VS into one. This unified version will support both aspect frameworks.

As a result, PostSharp will benefit from CodeLens support, and Metalama from the Aspect Explorer features.

This effort will result in a more consistent development experience for teams using both PostSharp and Metalama.

Though we're making good progress, this feature didn't make it to the first preview. We'll keep you updated.

## Roadmap

In February, we will continue enhancing the three dimensions of Metalama 2024.1: UI, performance, and constructors. We hope to reach the RC milestone by the end of the month.

Post-RC, we will redirect some of our engineering resources towards marketing, creating more examples, and writing articles. Our primary development objectives will be to support type introductions, fix bugs, and improve performance.

## Community

This month, we announced a partnership with the [Productive C#](https://www.productivecsharp.com/membership/) community led by Andrea Angella, technical lead at Redgate, Microsoft MVP, content creator, and mentor. This partnership includes free licenses for raffles, discounts on Metalama, and an exclusive, member-only Q&A session with yours truly.

We're also renewing partnerships with user groups.

## Conclusion

This month, we've been diligently working on Metalama 2024.1, and we've just released the first, incomplete, preview. We eagerly await your feedback on [Slack](https://www.postsharp.net/slack).


