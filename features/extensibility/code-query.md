---
title: Code Query API
---

{: .intro }
Query your code as a database using the `Metalama.Framework.Workspaces` package. Run interactive queries in LINQPad or host them in any .NET application.

While Metalama is primarily designed to execute within the compiler or IDE process, you also use its powerful and intuitive code API from any .NET application.

## Use cases

- **Diagnose the Metalama compilation process.** Inspect aspects and their effect on source code.
- **Interactively investigate a code base.** Run queries in LINQPad and search for types or members according to any criteria.
- **Validate architecture.** Detect anomalies in your architecture by running code queries and reporting errors from your CI/CD pipeline.

## Features

- **LINQPad driver.** Execute code queries interactively from LINQPad.
- **Hostable in any application.** After all, it's just a .NET API.
- **Open projects and solutions.** Simply open `csproj` or `sln` files.
- **Query code references and dependencies.** Access the dependency graph from the API.

## Resources

* Reference documentation:
    - [Querying code with or without LINQPad](https://doc.metalama.net/conceptual/introspection/linqpad)
    - [Introspection API](https://doc.metalama.net/api/introspection-api)