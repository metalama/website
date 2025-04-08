---
layout: new-post
comments: true
title: "Simplify Your .NET Aspire Caching With Metalama"
date: 2024-07-08 08:00:02 +01:00
categories:
    - The Timeless .NET Engineer
permalink: /blog/aspire-caching-metalama
author: "Metalama Team"
summary: "Learn how to cache method results in a .NET Aspire distributed cloud-native app with minimal boilerplate in this step-by-step guide."
keywords:
    - .NET Aspire
    - caching
    - cache
    - metalama
source_url: https://github.com/postsharp/TimelessDotNetEngineer/tree/main/src/aspire/caching-metalama
image: /assets/images/2024/2024-07-aspire/aspire-caching-dark.svg
thumbnail: /assets/images/2024/2024-07-aspire/aspire-caching-light.svg
related_articles:
    - /aspire-logging-metalama
    - /aspnet-caching
    - /memorycache
    - /polly
---

As you may already know, .NET Aspire makes it very easy to build distributed cloud-native applications. It manages all the wiring between the different services of your application and other components like databases, messaging, and caching. One of the services you can use with .NET Aspire straight out of the box is Redis, a great solution for distributed caching. There are many points in your app where you can [add caching](/memorycache) (and one of the ways is to use [Polly](/polly)). In this article, we will see how to cache _method results_ without boilerplate code thanks to a special kind of custom attribute called _aspect_. We'll see how Metalama can generate the caching boilerplate code for you based on this custom attribute.

Metalama is a free code generation framework for C#. It helps you write and maintain less code by eliminating boilerplate, generating it dynamically during compilation. It is built upon the concept of _aspect_, which encapsulates a code pattern. Most of the time, [aspects](https://www.postsharp.net/solutions/aspect-oriented-programming) are also custom attributes, but _special_ kinds of custom attributes because they act like code templates and modify the code they are applied to.

Thanks to Metalama's `[Cache]` aspect, adding caching to a method is as easy as applying the `[Cache]` custom attribute:

{% include_file "{{page.source_url}}/TodoList/TodoList.Api/Services/TodoService.cs" syntax="csharp" snippet="Caching" %}

Under the hood, the `[Cache]` aspect:
- pulls the necessary services into your class,
- intercepts the method calls and adds the caching behavior,
- generates cache keys for you,
- serializes and deserializes the cached objects,
- handles "weird" types to cache like `IEnumerable` or streams.

In this article, we demonstrate how to configure both .NET Aspire and Metalama to add caching with minimal effort, keeping your code clean of boilerplate. You'll see, this is really a piece of cake.

## The example app

Before we start, a few words about the example app. It is a to-do list app with an ASP.NET Core Minimal API backend and a Blazor front-end, orchestrated using .NET Aspire. The app stores the tasks using SQL Server, with an Entity Framework front-end.

To improve the app's responsiveness and relieve the load from the database, we'd like to cache the to-do list, as it is more often displayed than updated. However, we can't use HTTP response caching because we need to invalidate the cache when the data is updated.

{% include get-source-code.html %}

## Setting up the project

### Step 1. Create a solution with the .NET Aspire template

To follow this tutorial, you will need an IDE supporting the .NET Aspire workload and an OCI-compliant container runtime, such as [Docker Desktop](https://www.docker.com/products/docker-desktop) or [Podman](https://podman.io/).

If you're not familiar with .NET Aspire, we recommend trying out the [.NET Aspire Starter Application](https://learn.microsoft.com/en-us/dotnet/aspire/get-started/build-your-first-aspire-app) first.

The template will create several projects:

* The _app host_ project, containing the service orchestration. You can think of this project as the bootstrapper of other projects.
* The _web API_ project,
* The _web front-end_ project,
* A _service default_ project that contains shared service configuration,
* A _data_ project shared between the API and front-end projects.

## Step 2. Set up .NET Aspire app host

Firstly, we need .NET Aspire to run and route the Redis cache server. To allow the Redis cache server to be orchestrated by .NET Aspire, we need to add it to the app host.

1. Add [`Aspire.Hosting.Redis`](https://www.nuget.org/packages/Aspire.Hosting.Redis) NuGet package to the app host project.

2. Add the Redis cache to your app host and reference it in the app that will use the caching. In our case, we'll use the caching in the API app.

{% include_file "{{page.source_url}}/TodoList/TodoList.AppHost/Program.cs" syntax="csharp" snippet="AppHostCacheConfiguration" %}

The name `"cache"` will be used among the .NET Aspire orchestrated apps to reference the Redis cache added in this step.

## Step 3. Set up the app

With the app host prepared, we can proceed to set up the app that's going to use the cache.

1. To allow Metalama Caching with Redis to be used, add the following NuGet packages. In our example, we use the cache in the API project, so we add these packages into it.


    | Package | Description |
    |---------|------------------|
    | [`Aspire.StackExchange.Redis`](https://www.nuget.org/packages/Aspire.StackExchange.Redis) | Allows using the Redis resource configured in the app host. |
    | [`Metalama.Patterns.Caching.Aspects`](https://www.nuget.org/packages/Metalama.Patterns.Caching.Aspects) | Allows Metalama Caching to be used in your source code. |
    | [`Metalama.Patterns.Caching.Backends.Redis`](https://www.nuget.org/packages/Metalama.Patterns.Caching.Backends.Redis) | Allows Metalama Caching to use Redis as the storage. |

2. In the API project, we use the `AddRedisClient` to add the Redis client, an object of type `IConnectionMultiplexer`, to our service collection. The `"cache"` argument is the name of the Redis service previously defined in the app host.

    {% include_file "{{page.source_url}}/TodoList/TodoList.Api/Program.cs" syntax="csharp" snippet="AddRedis" %}

3. Finally, we call `AddMetalamaCaching`. By default, an in-memory caching service will be created, so we must not forget calling the `Redis` method. It implicitly consumes the `IConnectionMultiplexer` service added by .NET Aspire.

    {% include_file "{{page.source_url}}/TodoList/TodoList.Api/Program.cs" syntax="csharp" snippet="AddMetalamaCaching" %}


## Step 4. Add the caching to your code

You can now add caching to your methods.

### Caching a method

As we've shown in the introduction, adding caching to a method is now as easy as adding the `[Cache]` attribute.

A few points will require your attention.

* First, you must ensure that the parameters of a cached method generate a meaningful caching key. The `ToString()` method is used by default, and Metalama offers [several strategies](https://doc.metalama.net/patterns/caching/caching-keys) to customize it.

* Then, you might want to check that all return values are safely JSON-serializable. Metalama transparently handles special types like streams, enumerables, or enumerators.


## Invalidating the cache

Now that we've set the reading methods to be cached, they will always return the same result even if we add or modify todos. We must now remove items from the cache when the underlying data has changed -- a problem called _cache invalidation_.

The simplest approach is to use the `[InvalidateCache]` aspect, as you can see in the `DeleteTodoAsync()` method.

{% include_file "{{page.source_url}}/TodoList/TodoList.Api/Services/TodoService.cs" syntax="csharp" snippet="DeclarativeInvalidation" %}

This aspect matches the method arguments with the cache keys and invalidates the proper cache items when a to-do item gets deleted.

As you probably know, cache invalidation is the [second hardest problem in computer science](https://martinfowler.com/bliki/TwoHardThings.html), so there's [way more](https://doc.metalama.net/patterns/caching/invalidation) to cache invalidation in Metalama Caching besides the `[InvalidateCache]` aspect: imperative invalidation, and even cache dependencies.

## Summary

.NET Aspire and Metalama make caching a real piece of cake. With just a few method calls and custom attributes, you can improve the responsiveness of your distributed cloud-native application, keeping it robust, scalable, and maintainable at the same time.
