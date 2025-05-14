---
title: How to Contribute Code
toc: true
summary: "This document outlines the steps for contributing code into Metalama repositories, including feature implementation, testing, formatting, and submitting a pull request."
keywords: "contributing code, Metalama, testing, formatting, pull request, build repository, unit tests, Contributor License Agreement"
---

## 1. Choose your repository

Before contributing to the core projects, consider implementing your feature in a community-driven repository.

The main difference between a core project and a community-driven project lies in the responsibility for maintenance and the level of commercial support:

- For _core repositories_, PostSharp Technologies takes on the maintenance responsibility and provides full support to enterprise customers. These repositories include [Metalama](https://github.com/metalama/Metalama), [Metalama.Compiler](https://github.com/metalama/Metalama.Compiler), [Metalama.Samples](https://github.com/metalama/Metalama.Samples), and [Metalama.Documentation](https://github.com/metalama/Metalama.Documentation). Due to their extended guarantees, contributions to core repositories undergo higher scrutiny and must meet stricter quality standards. Note that contributing to core repositories requires signing the [Contributor License Agreement](cla).

- For _community repositories_, such as [Metalama.Community](https://github.com/metalama/Metalama.Community), PostSharp Technologies assumes no responsibility and offers no guarantees or support. However, unlike personal projects, their maintenance responsibility is shared by the entire community rather than a single person. By contributing to a community repository, you enable other community members to build upon your work.

Check out our [branching strategy](branching) for more details.

The quality process for both repository categories is identical and described in this article.

## 2. Implement the feature

Before you start coding, you'll need to [check out and build](build-from-source) the appropriate repositories.

{: .note}
We strongly recommend _building_ the entire repository (`./Build.ps1 build`) before you open any project in the IDE. This ensures that all dependencies of your projects are built. It can be tricky otherwise.

Once the repository is built and ready, proceed to implement your feature while adhering to our [coding standard](coding-standard).

## 3. Write tests

The code you write or modify needs to be covered by tests.

Three types of tests are possible:
- Unit tests of the compile-time or design-time logic.
- Aspect tests, which validate the aspect output against expectations.
- Run-time tests, typically used to test ready-made patterns.

The expected level of testing depends on the repository you're contributing to: lenient for community repositories, strict for core repositories.

## 4. Format all modified files

We recommend reformatting (or cleaning up) all modified files to adhere to our coding standard. The best tool for this is ReSharper's or Rider's clean-up profile named `Custom`. You can also use Visual Studio, but it may not perform as well.

{: .warning }
DO NOT reformat files you haven't modified.

## 5. Address any remaining warnings

We require zero warnings to merge any PR. This includes code formatting warnings.

The following command should run without any warnings:

```powershell
./Build.ps1 build
```

## 6. Run all tests

Ensure the following command executes successfully:

```powershell
./Build.ps1 test
```

## 7. Submit your PR against the `develop/YYYY.N` branch

Even if you branched from `release/YYYY.N`, remember that we will merge into `develop/YYYY.N`.

Before we can accept your first PR, you will be asked to sign the [Contributor License Agreement](cla).


