---
title: How to File an Issue
summary: "This document outlines how to file issues and bug reports for Metalama using GitHub, including necessary information and repositories."
keywords: "bug reports, GitHub issues, Metalama, exception, error message, binary build log, crash report, profiling snapshot"
---

## Reporting bugs

We use GitHub issues as our main channel for handling bug reports for open-source users. If you are a commercial customer, see [Enterprise Support](/premium/enterprise-support)<i class="premium"></i>.

Please report issues to the relevant repository:

| Repository | Areas |
|----|----|
| [Metalama](https://github.com/metalama/Metalama/issues) | Issues with the Metalama framework, extensions, ready-made aspects, Visual Studio Tools for Metalama, or LINQPad driver. |
| [Metalama.Documentation](https://github.com/metalama/Metalama.Documentation/issues) | Issues with the documentation. |
| [Metalama.Samples](https://github.com/metalama/Metalama.Documentation/issues) | Issues with the samples. |

## Proposals and discussions

Proposals and discussions are held in [GitHub discussions](https://github.com/orgs/metalama/discussions) of the Metalama repository.

## Crafting a good bug report

To increase your chances of resolving your issue quickly, please consider including the following in your report:

* The version of the Metalama packages and Visual Studio Tools for Metalama you are using.
* The version of the .NET SDK and IDE you are using.
* The operating system you are using.
* If this is a code issue:
    - The full error message, including the full exception stack.
    - If the error message refers to a file, the content of this file.
    - If possible, a standalone project reproducing the issue.
    - If relevant, you may be asked for:
        - A binary build log (`msbuild.binlog`) produced by `dotnet build /bl`.
        - A log file produced by following [these instructions](https://doc.metalama.net/conceptual/configuration/creating-logs).
        - Exceptionally, a [crash report](https://doc.metalama.net/conceptual/configuration/process-dump) or a [profiling snapshot](https://doc.metalama.net/conceptual/configuration/profiling).
* If this is a UI issue:
    - The steps to reproduce the issue. What steps can a person who reads your bug report perform to get the same results? How do these results differ from your expectations?
    - Screenshots.

{: .warning }
Binary build logs (`msbuild.binlog`), other log files, and crash reports contain data that might identify you or your company and may leak fragments of source code.

## Existing issues

If the issue you're encountering is already being tracked, you can still help by providing additional information.

- Let us know how you're affected. If you can add more details, please leave a comment. Otherwise, adding a reaction to the original issue is a quick way to communicate that this is a recurring issue.
- Provide a workaround. This can help unblock others until a fix is identified.
- Send a pull request. If you think you can help with a fix, we'd be happy to see a PR! See also [Contributing code](contribute-code).
