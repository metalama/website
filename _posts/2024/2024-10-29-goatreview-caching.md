---
layout: new-post
title: "Why I switched from Fody to Metalama for method caching"
date: 2024-10-29 09:10:00 +01:00
categories: [Guest Article]
permalink: /blog/why-switch-from-fody
origin: https://blog.postsharp.net/why-switch-from-fody
author: "Cyril Canovas"
summary: "Cyril Canovas compares Fody and Metalama when it comes to avoiding boilerplate with the implementation of caching. He cites idiomatic C# code and debugging experience as its main benefits."
image: /assets/images/2024/2024-10-goatreview/caching.svg
keywords:
- caching c#
- fody

related_articles:
- /aspnet-caching
- /memorycache
- /polly
- /aspire-caching-metalama
---

Having previously written about [implementing caching aspects with Fody](https://goatreview.com/master-aspect-oriented-programming-with-fody-weaving/), I wanted to share my experience switching to Metalama and why I believe it offers significant advantages for Metalama users looking to implement caching in their applications.



> ## About the author
> <img src="/assets/images/2024/2024-10-goatreview/canovas.jpeg" alt="Cyril Canovas" />
> Cyril Canovas is a contributor at [GoatReview](https://goatreview.com) 🐐, a technical blog focused on sharing in-depth developer experiences and best practices in .NET development. At GoatReview, we believe in providing practical, hands-on insights backed by real-world implementations. Our recent exploration of Aspect-Oriented Programming tools led us to evaluate different solutions for implementing method caching in .NET applications.
{: .guest-author }



## My journey from Fody to Metalama

Let's start with a look at the [Fody implementation](https://github.com/goatreview/FodyWeaverSample) I had been using:

```csharp
public class ModuleWeaver : BaseModuleWeaver
{
    // ... (more than 100 lines of complex code)

    private void InjectCache(MethodDefinition method)
    {
        var processor = method.Body.GetILProcessor();
        var instructions = method.Body.Instructions;

        var returnInstructions = instructions.Where(instr => instr.OpCode == OpCodes.Ret).ToList();

        foreach (var returnInstruction in returnInstructions)
        {
            processor.InsertInstructions(returnInstruction, SetCacheValue(method));
        }

        var firstInstruction = instructions.First();
        processor.InsertInstructions(firstInstruction, ReturnGetValueCacheIfAny(method));
    }

    // ... (several complex helper methods)
}
```

While Fody is a powerful tool, I encountered several challenges:

1. The need to write and maintain complex CIL code
2. Difficult debugging processes
3. Limited visibility into the generated code
4. No native support for dependency injection
5. A steep learning curve for team members

## The Metalama advantage

When I switched to Metalama, I was able to rewrite the same caching functionality with much cleaner, more maintainable code:

```csharp
public class CacheAttribute : OverrideMethodAspect
{
    [IntroduceDependency]
    private readonly ICache _cache;

    public override dynamic? OverrideMethod()
    {
        var cacheKey = CacheKeyBuilder.GetCachingKey().ToValue();

        if (this._cache.TryGetValue(cacheKey, out object? value))
        {
            return value;
        }

        var result = meta.Proceed();
        this._cache.TryAdd(cacheKey, result);
        return result;
    }
}
```

What immediately struck me was how Metalama's approach aligned with modern .NET development practices:

1. **Native C# Code**: Instead of dealing with IL, I could write aspects in familiar C# syntax.
2. **Built-in DI Support**: The `[IntroduceDependency]` attribute made dependency injection straightforward.
3. **Clear separation of concerns**: The aspect's responsibility is clearly defined and isolated.

## Simplified debugging experience

One of the most significant improvements I found was in the debugging experience. Using the LamaDebug configuration, I could inspect the generated code directly in Visual Studio:

```csharp
{% raw %}
public class Calculator
{
    public int InvocationCounts { get; private set; }
    
    [Cache]
    public int Add(int a, int b)
    {
        var cacheKey = $"Calculator.Add((int){{{a}}}, (int){{{b}}})";
        if (_cache.TryGetValue(cacheKey, out object? value))
        {
            return (int)value;
        }

        int result;
        Console.WriteLine("Thinking...");
        this.InvocationCounts++;

        result = a + b;
        _cache.TryAdd(cacheKey, result);
        return result;
    }

    private ICache _cache;

    public Calculator(ICache? cache = default)
    {
        this._cache = cache ?? throw new System.ArgumentNullException(nameof(cache));
    }
}
{% endraw %}
```

This transparency in the generated code made it much easier to:
- Understand how the aspect modifies the original code
- Debug issues by stepping through the actual transformed code
- Explain the caching behavior to team members

## Visual Studio integration

The Visual Studio Tools for Metalama provided another significant advantage. The CodeLens integration lets you preview aspect-modified code directly in the IDE, making it immediately clear how your aspects affect the codebase. This visibility is invaluable when working with team members who might be less familiar with AOP concepts.

## Conclusion

While Fody served us well for implementing caching aspects, my experience with Metalama has shown it to be a more developer-friendly and maintainable solution. The combination of:
- Clean C# syntax for aspects
- Native dependency injection support
- Transparent debugging capabilities
- Excellent IDE integration

Makes Metalama a compelling choice for implementing caching in your .NET applications. If you're currently using Fody for caching, I encourage you to try Metalama - you might find, as I did, that it significantly simplifies your AOP implementation while providing better tools for development and debugging.

Have a 🦙-zing day!