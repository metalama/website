---
title: Extensibility Features
summary: "Metalama offers extensibility through Roslyn SDK integration, a Code Query API, and easy removal via the \"divorce\" feature."
keywords: "Roslyn SDK integration, Metalama, extensibility, Code Query API, custom aspect weavers, code references, LINQPad, divorce feature"
---

{: .intro }
We hate lock-ins just as much as you do. You can utilize the underlying Roslyn SDK or integrate Metalama from any process. We even made it possible to remove Metalama from your projects when necessary.

| Feature | Description |
|----------|----------|
| [Roslyn Extensibility](roslyn) | Overcome Metalama limitations by directly accessing the Roslyn API. Analyze method bodies or run custom aspect weavers. |
| [Code Query API](code-query) | Query your code like a database and explore code references using LINQPad. Access the Metalama object model to diagnose how aspects and fabrics affect your code. |
| [Divorce](divorce) | Metalama makes it easy to part ways when needed. Run the `metalama divorce` command to commit the generated code into your source code, and revert to using Microsoft's plain compiler. |


