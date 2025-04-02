---
title: Reference Generated Code From Source Code
---

{: .intro }
With Metalama, your source code can reference generated code as if it were part of the original source. This marks a significant step forward from previous MSIL-based generation methods, where code additions remained invisible to the source code.

## Benefits

* **Idiomatically C#.** No need for cumbersome constructs like in MSIL-based approaches.
* **IntelliSense.** Code completion works seamlessly with generated code.

## Example

Consider a scenario where an aspect implements the Memento pattern for the `Fish` class. In this case, the source code will "recognize" that the class implements the `IMementoable` interface, allowing you to invoke the generated `SaveToMemento` and `RestoreMemento` methods. IntelliSense and design-time code verification will function as expected.

Suppose we have the following class in the source code:

```cs
[Memento]
public sealed partial class Fish
{
    public string? Name { get; set; }
    public string? Species { get; set; }
    public DateTime DateAdded { get; set; }
}
```

The `[Memento]` aspect automatically implements the `IMementoable` interface, defined as follows:

```cs
public interface IMementoable
{
  IMemento SaveToMemento();
  void RestoreMemento( IMemento memento );
}
```

Another part of the source can use the `IMementoable` interface and its methods as if they were defined directly in the source code:

```cs
var fish = new Fish() { Name = "Hannibal", Species = "Tilapia" };

// Save by using the generated SaveToMemento method.
var memento = fish.SaveToMemento();

// Change
fish.Name = "Shark";

// Undo change by using the generated RestoreMemento method.
fish.RestoreMemento(memento);
```
