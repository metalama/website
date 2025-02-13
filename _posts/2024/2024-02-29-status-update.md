---
layout: post
comments: false
title: "Metalama Status Update, February 2024"
date: 2024-02-28 08:00:01 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2024-02
author: "Gael Fraiteur"
image: /assets/images/2024/2024-02-29-status/llama.png
summary: "In this month's status update, we address the recent .NET SDK update glitch, share our latest bug fixes and improvements in Metalama 2023.4 and 2024.0, and give a sneak peek into our upcoming unified Visual Studio extensions in Metalama 2024.1."
---

Greetings, Metalama and PostSharp community! February has been a busy month for us, with a focus on unifying two Visual Studio extensions -- the PostSharp and Metalama ones -- into one. And, oh, we are not proud of our VS 17.9 update glitch. Let's dive in.

## Visual Studio update glitches: Let's clear the air

We must admit: an unexpected glitch surfaced in `Metalama.Compiler` when Microsoft unveiled the latest feature update of .NET SDK, version 8.0.200. This update contained a new source generator assembly for Blazor, compiled with Roslyn 4.9. Unfortunately, this caused Metalama Compiler 2024.0 to stumble as it was based on Roslyn 4.8. The issue arises when a .NET SDK running a higher version of Roslyn than the one Metalama Compiler is built on, attempts to use our cached copy of the analyzer and source generator assemblies, compiled with our supported version of Roslyn. This mechanism failed because .NET SDK 8.0.200 introduced a new assembly, for which we, naturally, had no cached copy.

While it's impossible for us to make the .NET SDK update scenario entirely foolproof and predictable (as it's not entirely within our control), we can take steps to mitigate such disruptions. Here's what you can do, and what we plan to do.

### Here's what _you_ can do to avoid future disruptions

From your end, you can "pin" your repository to a specific version of the .NET SDK by setting the SDK version in `global.json` and disabling roll forward beyond patches. Here's an example of a `global.json` you can use:

```json
{
  "sdk": {
    "version": "8.0.100",
    "rollForward": "latestPatch"
  }
}
```

However, there's a catch. The Visual Studio Installer _uninstalls_ previous versions of the .NET SDK when installing new ones. Hence, you'd need to manually reinstall the previous version.

### Here's what we plan to do on our end

We've deduced that we need to hasten our testing of the new .NET SDKs and our merging of Roslyn. Until now, we've been waiting for Microsoft to officially release the new version of Roslyn before we started merging it. Strangely, Microsoft usually releases the new Roslyn a few days _after_ the new .NET SDK that depends on it. This seems counter-intuitive.

Moving forward, we plan to merge Roslyn as soon as a new SDK is published, even if the NuGet packages haven't been released. We'll also start testing previews of the .NET SDK.

Please note that this strategy will narrow the time gap between updates of .NET SDK (i.e., Visual Studio) and Metalama. However, it won't entirely eliminate the potential for the old version of Metalama to break if you update the .NET SDK before updating Metalama. To avoid this, we strongly recommend you pin your .NET SDK version using `global.json`, as described above.

## Bug fixes in Metalama 2023.4

We're still diligently maintaining 2023.4 with critical bug fixes. This month, we rolled out [2023.4.9](https://github.com/orgs/postsharp/discussions/257), which includes a Blazor-related bug fix.

## Updates in Metalama 2024.0

We've merged Roslyn 4.9 into `Metalama.Compiler` 2024.0 to support the .NET SDK 8.0.200 feature update and released three bug-fixing builds to address relatively minor bugs. The only significant improvement is that the `IntroduceAttribute` advice method now works with enums and delegates. For more details, check out the change logs:

* [2024.0.7](https://github.com/orgs/postsharp/discussions/258)
* [2024.0.8](https://github.com/orgs/postsharp/discussions/263)
* [2024.0.9](https://github.com/orgs/postsharp/discussions/266)

## Preview releases of Metalama 2024.1

We dedicated the majority of our efforts this month to the unified Visual Studio extension, which is the primary objective of Metalama and PostSharp 2024.1.

### Visual Studio Extensions

We've successfully merged the previously separate Visual Studio extensions for Metalama and PostSharp into one extension. The unified extension is the former PostSharp one, now equipped to support Metalama.

You can download the extension from [OneDrive](https://1drv.ms/u/s!AjIdLvQsWyhnhoxWeAG6_sDW8MTApg?e=hXaGou), as the Visual Studio Marketplace doesn't support preview releases.

Please keep in mind the following:

⚠️ Before installing the new unified extension, ensure you uninstall the Metalama extension to avoid conflicts.

⚠️ The extension is still in development. There are still bugs to fix, and the development experience is not final. Specifically, we haven't yet begun work on the 'getting started' experience after a fresh installation and the learning hub.

⚠️ To make the most of the Aspect Explorer feature, make sure you update your packages to the latest Metalama preview.

### Other improvements

* Design-time support for introducing and pulling constructor parameters
* Metalama.Extensions.DependencyInjection: Ability to unregister LoggerDependencyInjectionFramework
* License audit now also uploads anonymous data to the Matomo analytic service.
* Registration for the newsletter through the Metalama web UI is now functional.

## Wrapping Up

We haven't made as much progress as hoped this month and the 2024.1 is now poised to be generally available in April instead of March. We look forward to sharing more updates in the coming weeks. As always, your feedback is vital to us, so don't hesitate to reach out on our [Slack](https://www.postsharp.net/slack) workspace. Let's continue to make Metalama an even more valuable tool for all of us. Until next time, happy meta-programming!
