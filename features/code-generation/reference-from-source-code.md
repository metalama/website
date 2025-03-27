---
title: Reference Generated Code From Source Code
toc: false
---

{: .intro }
With Metalama, your source code can reference generated code as if it were itself source code. This is a significant advancement from the previous MSIL-based generation, whose code additions were not visible from source code.


## Example

For instance, if an aspect implements the Memento pattern for the `Fish` class, source code will "see" that the class
implements the `IMementoable` interface and will be able to invoke the generated `SaveToMemento` and `RestoreMemento`
methods. Intellisense and design-time code verification will work normally.

Suppose we have the following class in source code:

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

Another part of the source code can use the `IMementoable` interface and its two methods as if they were defined in
source code:

```cs
var fish = new Fish() { Name = "Hannibal", Species = "Tilapia" };

// Save by using the generated SaveToMemento method.
var memento = fish.SaveToMemento();

// Change
fish.Name = "Shark";

// Undo change by using the generated RestoreMemento method.
fish.RestoreMemento(memento);
```

