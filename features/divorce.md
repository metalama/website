---
title: Divorcing from Metalama
summary: "Metalama provides tools and procedures for removing its dependency, allowing projects to revert to the standard C# compiler."
keywords: "Metalama dependency, removing Metalama, reverting to C# compiler, Metalama Divorce procedure, generated code tools, standard C# compiler, vendor lock-in."
---

{: .intro }
We understand the risks you're taking by depending on Metalama, so we've made it as simple as possible to remove it from your projects.

We provide a [procedure](https://doc.metalama.net/conceptual/divorcing) and tools to write the generated code back into your source code repository. You can then use any `git` tool to review the changes and commit the generated code back into your source repository.

{: .warning }
Metalama Divorce is not designed for regular execution. Like any divorce, breaking up from Metalama can be challenging and might take anywhere from hours to days, depending on the size of your projects. We've aimed to make the process as smooth as _possible_.

## Benefits

* No vendor lock-in. You can revert to the standard C# compiler at any time.

## Resources

* Reference documentation: [Divorcing from Metalama](https://doc.metalama.net/conceptual/divorcing)
