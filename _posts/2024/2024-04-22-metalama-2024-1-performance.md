---
layout: new-post
comments: false
title: "Metalama Performance Improvements Analysis [Updated for 2025.0]"
date: 2024-11-28 08:00:01 +01:00
categories: [Metalama]
permalink: /blog/metalama-performance
author: "Gael Fraiteur"
image: /assets/images/2024/2024-04-22-performance/featured.svg
tag: featured
summary: "This article tracks performance improvements of Metalama over releases since 2024.0."
latex: true

---

Starting from Metalama 2024.1, we've spent significant effort to optimize performance. After a thorough analysis of the benchmarks, we're excited to report that Metalama's performance has more than doubled, typically just adding 25-35% to the standard build time.

```text
Article Updates
---------------
2024-04-22: Originally published with Metalama 2024.1 performance
2024-07-30: Added Metalama 2024.2 performance.
2024-11-28: Added Metalama 2025.0 performance.
```

## TL;DR

Using Metalama instead of the standard C# compiler will increase your `dotnet build` time by typically 25%. This overhead varies linearly with the number and complexity of aspects in your project. Even with one aspect on every single method, your build should not be more than 60% slower with Metalama than without it.

## Our methodology

So, how did we arrive at these results?

We forked the [NopCommerce](https://github.com/nopSolutions/nopCommerce) open-source project and introduced aspects to methods at random, regulated by two factors:
- the percentage of types that will have aspects (denoted $\text{Types}$ in the equation below); and
- the percentage of methods _in each target type_ with aspects (denoted $\text{Methods}$).

Using BenchmarkDotNet, we analyzed the execution time of `dotnet build /t:rebuild` for 12 different combinations of the factors. We used a dedicated computer with a minimal Alpine installation to ensure no background process could interfere with the measurements.

We then computed a linear regression based on two factors, $\text{Types}$ (the percentage of types affected) and $\text{Types} \times \text{Methods}$ (the percentage of methods affected), where both $\text{Types}$ and $\text{Methods}$ are included as a percentage between 0 and 1. The output of this function, $\text{TimeRatio}$, is the ratio between the build time with Metalama and without Metalama.

$\text{TimeRatio} = 1 + a + b \times \text{Types} + c \times \text{Types} \times \text{Methods}$


Here are the results of the regression:

| Version | Constant overhead factor ($a$) | Type load factor ($b$) | Method load factor ($c$) |
|---------|-----------------|-------------|---------------|
| 2024.0  | 0.41          | 0.26        | 0.72        |
| 2024.1  | 0.45          | 0.15        | 0.40        |
| 2024.2  | 0.43          | 0.12        | 0.37        |
| 2025.0  | 0.25          | 0.06        | 0.29        |

Our bilinear model has an $R^2$ of 0.98, suggesting that only 2% of the variance is unexplained. Given that benchmark results variance is higher than 2%, we can be confident in the model accuracy.

In simple terms:
- Building your code with Metalama will always be at least 25% slower than without Metalama, and
- Metalama's build time is linearly dependent on two factors: the percentage of affected methods in your projects and the percentage of types containing these affected methods.

The dependency on the number of types containing affected methods is because each type is typically implemented in its own file, and part of Metalama's cost depends on the number of files that need to be rewritten.

## Our improvements 

Let's see the improvements we made in different Metalama versions compared to the 2024.0 baseline:

| Version | Constant overhead factor | Type load factor | Method load factor |
|---------|-----------------|-------------|---------------|
| 2024.0  | 100% (baseline)    | 100% (baseline) | 100% (baseline) |
| 2024.1  | 109%           | 58%        | 55%          |
| 2024.2  | 105%           | 46%        | 51%          |
| 2025.0  | 61%           | 23%        | 40%          |

As you can see, the efficiency of Metalama in processing aspects has quadrupled from 2024.0 to 2025.0! Even the constant overhead factor is 61% of what it was at the beginning of 2024.


## Wrapping up

Our efforts in enhancing Metalama's performance in 2024 have been largely successful, with aspect processing speed now twice as fast as in v2024.0. Sure, there is still a 20-35% longer build time in typical projects -- but hey, the Metalama compiler is doing _much_ more than the plain Jane Roslyn! 

We'll continue to work on optimizations whenever we see fit.
