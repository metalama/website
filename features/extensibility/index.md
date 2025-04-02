---
title: Extensibility Features
---

{: .intro }
We have lock-ins just as you do. You can use the underlying Roslyn SDK or use Metalama from any process. We even made it possible to remove Metalama from your projects.

| Feature | Description |
|----------|----------|
| [Roslyn Extensibility](roslyn) | Overcome Metalama limitations by directly accessing the Roslyn API. Analyze method bodies or run custom aspect weavers. |
| [Code Query API](code-query) | Query your code as a database and explore code references using LINQPad. Access the Metalama object model to diagnose how aspects and fabrics affect your code. |
| [Divorce](divorce) | Metalama makes it easy to part ways when needed. Run the `metalama divorce` command to commit the generated code into your source code, and go back to the plain Jane Microsoft's compiler. |