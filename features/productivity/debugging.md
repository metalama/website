---
title: Transformed Code Debugging
---

{: .intro }
Metalama allows you to choose whether to step into the _source_ code or _transformed_ code. All you need to do is to switch to the `LamaDebug` build configuration.

When you build with the `LamaDebug` configuration, transformed code is stored under the `obj/LamaDebug/metalama` directory. You can easily inspect the generated code and put breakpoints into it.

## Benefits

* Focus on the level of abstraction that's relevant to the task at hand.
* Compatible with all IDEs.
* Generates readable, nicely-formatted code.
* Put breakpoints in generated code.