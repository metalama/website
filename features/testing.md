---
title: Test Frameworks
summary: "Metalama provides testing libraries for code generation and diagnostics, supporting xUnit and integrating with diff tools for efficient testing."
keywords: "code generation, Metalama testing frameworks, aspect testing, code validation, xUnit integration, diff tools, compile-time testing, unit testing, error reporting"
---

{: .intro }
As the author of an aspect, it's your responsibility to thoroughly test both the code generation and code validation logic under various conditions. Thanks to Metalama's testing frameworks, you can effectively test both code generation patterns and the reporting of warnings and errors.

Metalama includes two testing libraries:

- **`Metalama.Testing.AspectTesting`.** Enables you to test code generation (including templates) and diagnostic reporting logic. Each file in the test project is compiled into a standalone project, and the aspects are executed. The aspect outputs, which include the transformed code and diagnostics, are compared to their expected values. You can use your favorite diff tool to compare, reject, or accept changes.

- **`Metalama.Testing.UnitTesting`.** Allows you to unit-test compile-time code (typically queries on the code model) without executing the aspects themselves.

## Benefits

- **Test code generation patterns.** Compare the actual generated code with the expected one.

- **Test warnings and errors.** Diagnostics are prepended to the output, making it easy to check if the validation went as expected.

- **Isolate tests in autonomous mini-projects.** Debugging aspects in production projects is cumbersome because all aspect instances are executed concurrently. It can be difficult to step into the execution of a specific aspect instance. Test projects allow you to run and debug a single aspect instance at a time.

## Features

- **Compatible with xUnit.** Works with all test runners that support xUnit, including Rider and Resharper.

- **Test cross-project behaviors.** Easily create tests that involve several projects without needing to create any scaffolding.

- **Integrates with diff viewers.** Uses [DiffEngine](https://github.com/VerifyTests/DiffEngine) to open your favorite diff tool when a test output does not meet expectations.

- **Bulk accept.** Includes a command-line tool to apply changes in bulk when you prefer to use `git` to track acceptance of test results.

## Resources

- **Reference documentation.** [Testing the aspect's code generation and error reporting](https://doc.metalama.net/conceptual/aspects/testing/aspect-testing).
