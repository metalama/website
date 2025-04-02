---
title: Code Query API
---

{: .intro }
Query your code like it's a database using the `Metalama.Framework.Workspaces` package. Whether you're running interactive queries in LINQPad or hosting them in any .NET application, it's all possible.

Although Metalama is primarily designed to run within the compiler or IDE process, you can also leverage its powerful and intuitive code API from any .NET application.

## Use cases

- **Diagnose the Metalama compilation process.** Inspect aspects and see their effects on source code.
- **Interactively investigate a codebase.** Run queries in LINQPad and search for types or members based on any criteria.
- **Validate architecture.** Spot anomalies in your architecture by running code queries and reporting errors from your CI/CD pipeline.

## Features

- **LINQPad driver.** Execute code queries interactively from LINQPad.
- **Hostable in any application.** After all, it's just a .NET API.
- **Open projects and solutions.** Easily open `csproj` or `sln` files.
- **Query code references and dependencies.** Access the dependency graph through the API.

## Resources

* Reference documentation:
    - [Querying code with or without LINQPad](https://doc.metalama.net/conceptual/introspection/linqpad)
    - [Introspection API](https://doc.metalama.net/api/introspection-api)
