---
---

# Support and Lifecycle Policies

## Disclaimers

*   Nothing in these policies is legally binding. We operate on an "economically reasonable effort" basis.
*   We reserve the right to change policies without notice.
*   We may choose to make exceptions to these policies.

## Versioning and Backward Compatibility Policies

### Versioning

PostSharp follows the versioning scheme **YYYY.N.B\[M\]**, where:

*   **YYYY** represents the current or next year,
*   **N** signifies the version number within this year,
*   **B** stands for the build number within the minor version,
*   **M** denotes the release maturity level (see below),

We don't differentiate between a major and a minor version. We only distinguish _versions (YYYY.N)_ and _builds (B)_.

### Maturity

We use four maturity levels:

*   **\-alpha** releases are private builds made prior to public release;
*   **\-preview** releases are intermediate public builds that are not yet feature-complete and may still be subject to breaking changes;
*   **\-rc** releases meet all quality standards for stable releases, except that they have not been tested in the wild;
*   **Stable (Generally Available/GA)** releases meet all quality standards, and the feature freeze applies. The moment when a release is marked as stable is called the general availability date. At this moment, the releases appear in the stable channels on our website, the Visual Studio Marketplace, and the NuGet Gallery, and they start to be widely downloaded. Note that it typically takes 4 to 6 weeks after a new YYYY.N version is marked as stable before most bugs surface.

### Side-by-Side Versions

A project can have references (direct and indirect) to several PostSharp/Metalama packages of different versions within the same major version. The version of the PostSharp/Metalama package must be higher than or equal to the version of any other package from the PostSharp or Metalama family. (Note that PostSharp and Metalama are entirely independent product lines and have different release cycles.)

Side-by-side compatibility is provided on an "economically reasonable effort" basis. We perform structural tests of backward compatibility (comparison of public APIs, shared internals, and serialization details), but not behavioral tests such as unit tests.

Our support team may ask customers to upgrade all their packages to the same patch release, as there may be no other economically reasonable solution to some issues.

## Quality Standards

At PostSharp, we take the term _release candidate_ seriously. This means that an RC should have the same quality as an RTM, with the only difference being that it has been less tested by customers.

Before we tag a new release as RC quality, the following criteria must be fulfilled for all features:

1.  Features are fully implemented.
2.  Features are reasonably tested, including error conditions.
3.  Features are documented, both with conceptual and procedural documentation.
4.  Features have been tested on physical devices.
5.  All public APIs have undergone extensive critical review.
6.  Code analysis warnings have been addressed for public APIs.
7.  Integration with new features and old features has been tested.
8.  All bugs with a higher priority than those marked as "later" have been fixed.

## Security Standards

We have implemented the following security practices:

1.  Our executables and libraries are signed with Authenticode.
2.  We scan all deliverables with a virus scanner before signature.
3.  All developer workstations and build agents are equipped with anti-malware software and strict security policies enforced by Microsoft Endpoint Manager.

## Support Lifecycle Policy

Our customers have three options to choose from when it comes to releases: Long Term Support (LTS), Current, or Preview releases. Here's what you need to know about each option:

*   **LTS releases:** These are supported for 5 years after the general availability date, or 1 year after a subsequent release has been promoted to LTS - whichever is shorter. Our LTS releases are designed to be used with the underlying LTS versions of the .NET and Visual Studio platforms, to ensure a complete and stable technology stack. However, there may be instances where certain features or platforms are no longer supported in a given release. These are referred to as "Exclusions" and may require an update to a subsequent release or might have been abandoned altogether.
*   **Current releases:** These are supported for two months after the general availability of the next Current or LTS release (i.e., V+1) _or_ when the Release Candidate (RC) of the version _following_ the next version (i.e., V+2) is released, whichever is earlier.
*   **Preview releases:** These include alpha releases and release candidates and are supported until the next Preview, Current, or LTS release of the same minor version is published.

To be eligible for technical support, customers using the LTS option must have the latest patch update installed within the same minor release.

| Version | GA Release Date | Support Level | End of Support | Exclusions |
| --- | --- | --- | --- | --- |
| Metalama 2025.0 | January 2025 | Preview | Until the next Preview, Current, or LTS release of Metalama 2025.0 is published | None |
| Metalama 2024.2 | August 29, 2024 | Current | 2 months after some future Current or LTS version is released | None |

## Supported Platforms and Frameworks

In this section, we use the term _platform_ to refer to Windows, .NET Framework, .NET Core or Visual Studio.

This section covers only policies. For a list of supported platforms, please see the Requirements and Compatibility page in [PostSharp](https://doc.postsharp.net/il/requirements) or [Metalama](https://doc.metalama.net/conceptual/requirements) documentation.

### What we mean by _supported platform_

By _supported (or officially supported)_ platform version we mean that we have spent or will spend commercially-reasonable efforts to:

*   test our product with these versions before or shortly after they are released,
*   fix issues that stem from the use of these versions, and
*   provide support services.

It frequently happens, in practice, that PostSharp or Metalama will work with a non-supported platform version. However, if some issue happens, we will first ask you to upgrade or downgrade to a supported platform version.

### Support of platform versions by their manufacturer

Only platform versions that are currently supported by their manufacturer are supported by our products. If the manufacturer differentiates Mainstream Support for Extended Support, only platforms under Mainstream Support will be supported by PostSharp.

Check the support policies of the platform you rely on. The support lifecycle is probably shorter than you would expect! Check the following documents:

*   [Visual Studio Servicing Policies](https://docs.microsoft.com/en-us/visualstudio/productinfo/vs-servicing-vs)
*   [Windows Lifecycle FAQ](https://learn.microsoft.com/en-us/lifecycle/faq/windows)
*   [.NET Framework Lifecycle FAQ](https://learn.microsoft.com/en-GB/lifecycle/faq/dotnet-framework)
*   [.NET Core Lifecycle FAQ](https://learn.microsoft.com/en-US/lifecycle/faq/dotnet-core)
*   [.NET Support and Distribution Policies](https://github.com/dotnet/core/blob/main/support.md)

### Preview Releases

Pre-release platform versions are never officially supported, even when they get a production license from their publisher.

### Patch Releases

Only the latest Patch Release of a supported platform version is officially supported.

Operating systems must be updated with all Important Updates to qualify for support.

Before providing support services to you (such as diagnosing or fixing a bug), we ask you to update PostSharp and all platforms to the latest Patch Release.

### Abandon of support for platforms

When we release a new major or minor release, we remove support for platforms, frameworks, compilers and other tools that are no longer in mainstream support from Microsoft or their vendor. We may also remove support for a version of a platform if we consider that too many versions of the platform would be otherwise supported, taking usage statistics into account.

Customers of these retired platforms may still use a supported version of PostSharp during some time but may not upgrade to a new major version.

We reserve the right not to implement support for all new platforms or platform versions Microsoft or others may come with.

