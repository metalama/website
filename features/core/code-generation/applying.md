---
title: Powerful Code Selection Mechanisms
summary: "Metalama provides powerful code selection mechanisms including custom attributes, fabrics, aspect inheritance, and cross-project fabrics for enhancing or validating declarations."
---

{: .intro }
From custom attributes to code queries, Metalama offers several powerful ways to select the declarations you want to enhance or validate.

These mechanisms include:

* **Custom attributes** for manual selection of declarations.
* **Fabrics** for programmatic LINQ-like code queries.
* **Aspect inheritance** for automatic propagation of aspects.
* **Cross-project fabrics** for applying aspects across multiple projects.

## Custom attributes

The simplest way to add an aspect to a class, member, or parameter is by using a custom attribute.

By default, aspects derive from the `System.Attribute` class.

Use this approach when you want to manually select each target—for example, when applying a caching aspect.

### Example

In the following snippet, `[Cache]` adds caching to the `GetOpenOrders` method.

```csharp
[Cache]
public IEnumerable<Order> GetOpenOrders( Guid accountId ) { ... }
```

## Fabrics

_Fabrics_ are special C# classes that run at compile time within the compiler or at design time within the IDE.

With fabrics, you can programmatically select declarations in bulk using a LINQ-like code query.

Use this approach when you want to select declarations based on rules that are easy to evaluate in the code model.

### Example

The `Fabric` class runs in the compiler and adds an exception handler to all public methods of public types in the current project.

```csharp
internal class Fabric : ProjectFabric
{
    public override void AmendProject(IProjectAmender amender) =>
        amender
            .SelectTypes()
            .Where( t => t.Accessibility == Accessibility.Public )
            .SelectMany( type => type.Methods )
            .Where( m => m.Accessibility == Accessibility.Public )
            .AddAspectIfEligible<EnrichExceptionAttribute>();
}
```

### Resources

* Reference documentation: [Adding many aspects simultaneously](https://doc.metalama.net/conceptual/using/adding-aspects-with-fabrics).

## Aspect inheritance

Some aspects can be marked as `[Inheritable]`. When applied to a class or interface (either via an attribute or a fabric), they are automatically applied to all derived classes.

Aspect inheritance also works across projects.

### Example

In the following example, the `[Observable]` aspect implements the `INotifyPropertyChanged` interface for the `Animal` class. The properties of both `Animal` and `Dog` are instrumented to raise the `PropertyChanged` event.

```csharp
[Observable]
public class Animal
{
   public string Species { get; set; }
}

public class Dog : Animal
{
    public string Breed { get; set; }
}
```

### Resources

* Reference documentation: [Applying aspects to derived types](https://doc.metalama.net/conceptual/aspects/aspect-inheritance).

## Cross-project fabrics

A `TransitiveProjectFabric` is a fabric that executes in any _referencing_ project. For example, you can create a logging library that automatically adds logging to the methods of all projects referencing this library, whether through a project or package reference.

You can also share fabrics across multiple projects, for instance, to configure several solutions at once.

### Example

In the following example, the `Fabric` class adds an exception handler to all public methods of public types, not in the current project, but in all projects referencing the current project. This works even if the project is compiled and referenced as a library or package.

```csharp
internal class Fabric : TransitiveProjectFabric
{
    public override void AmendProject(IProjectAmender amender) =>
        amender
            .SelectTypes()
            .Where( t => t.Accessibility == Accessibility.Public )
            .SelectMany( type => type.Methods )
            .Where( m => m.Accessibility == Accessibility.Public )
            .AddAspectIfEligible<EnrichExceptionAttribute>();
}
```

### Resources

* Reference documentation: [Adding aspects to multiple projects](https://doc.metalama.net/conceptual/using/amending-many-projects).

