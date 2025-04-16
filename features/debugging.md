---
title: Transformed Code Debugging
summary: "Metalama's `LamaDebug` configuration enables debugging of transformed code, allowing breakpoint setting and inspection in any IDE."
keywords: "debugging transformed code, LamaDebug configuration, breakpoint setting, inspection in IDE, Metalama, source code, transformed code, generated code, build configuration"
---

{: .intro }
Metalama allows you to choose whether to step into the _source_ code or the _transformed_ code. Simply switch to the `LamaDebug` build configuration.

When you build with the `LamaDebug` configuration, the transformed code is stored under the `obj/LamaDebug/metalama` directory. This makes it easy to inspect the generated code and set breakpoints directly in it.

## Benefits

* Focus on the abstraction level relevant to your current task.
* Works with all IDEs.
* Produces readable, well-formatted code.
* Allows you to set breakpoints in the generated code.
