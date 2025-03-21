---
keywords: "architecture validation, architecture erosion"
summary: ""
title: "Architecture Erosion"
---

{: .intro }
"*Software architecture erosion refers to the gap between the planned and actual architecture of a software system as
observed in its implementation... [It] can result in lower quality, increased complexity, and harder-to-maintain
software. As these changes happen, it becomes more and more difficult to understand the originally planned software
architecture*", Sean Barow.

## Why does it happen?

Architecture erosion occurs when the planned architecture of a software system does not align with its actual
architecture during its implementation. Although the code can look clean at first sight, it is more complex than it
should be. This discrepancy may arise due to a lack of automatic validation of source code against architecture, design,
and pattern guidelines. Architecture erosion occurs when architecture is expressed in a non-executable form, such as
documentation.

As erosion intensifies, the architectural qualities of the codebase deteriorate, which can result in brittle code that
is challenging to repair or enhance. The **broken window syndrome** may also occur, which is the idea that visible signs
of neglect, unaddressed warnings, or other violations can encourage further neglect or disrepair. This can ultimately
lead to a further decline in overall code quality and an increase in technical debt.

## What does it cost to you?

Architecture erosion can have significant consequences on the quality and complexity of the software system, resulting
in increased costs and reduced productivity.

- **Increasing complexity.** As the architecture erodes, the codebase becomes more complex and less organized. This
  makes it increasingly difficult for developers to understand and modify the code. Keeping complexity down is the holy
  grail of any sizable software project. High complexity is a frequent source of bugs.

- **Cumulative technical debt:** Architecture erosion often leads to the accumulation of technical debt. This debt
  represents the cost of addressing issues that have been deferred or ignored due to time constraints or complexity.
  Over time, technical debt can compound, resulting in higher maintenance costs to address it.

- **Higher maintenance costs.** With time, the architecture no longer fulfills its role. A decrease in modularity and
  separation of concerns will cause a decrease in the ability of the architecture to respond to changes in requirements,
  increasing maintenance costs.

- **Failure to meet new requirements.** Ultimately, architecture decay may lead to the inability to implement new
  features in the codebase.

## What causes architecture erosion?

Researchers and practitioners have identified the following causes of architecture erosion:

- **Architecture design defects.** The architecture designed in the first phase of the project might be incorrect,
  forcing developers to work around it.
- **Inappropriate architecture changes.** When the project is in maintenance, new requirements may not be compatible
  with the original architecture. Unless the design is updated, developers will be forced to depart from the original
  architectural design.
- **Disconnection between architects and developers.** Developers may not be aware of the intended architecture,
  especially if they were not involved in the architecture team, if the architecture was incompletely documented, or
  simply not communicated to them.
- **Knowledge vaporization.** The initial developers may leave the team, taking their architectural knowledge with them.
  This cause is even more acute if the architecture is not properly documented.
- **Documentation decay.** Over time, as the codebase evolves, the existing architectural documentation may no longer
  accurately reflect the current state of the system. This discrepancy makes it harder for developers to rely on
  documentation for understanding and modifying the code.

## Learn more

To learn more about architecture erosion, check the following references:

* [Understanding architecture erosion: the practitioners’ perspective](https://arxiv.org/pdf/2103.11392)
* [Understanding software architecture erosion: A systematic mapping study](https://arxiv.org/pdf/2112.10934)
