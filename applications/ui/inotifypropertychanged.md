---
title: INotifyPropertyChanged
---

Most modern UI applications rely on binding data classes to UI classes. The `INotifyPropertyChanged` interface is the
standard way to achieve this. However, implementing this interface manually can be cumbersome and error-prone,
particularly when dealing with a large number of properties.

Thanks to Metalama's [Observable](https://doc.postsharp.net/metalama/patterns/observability) aspect of the
`Metalama.Patterns.Observability` open-source package, you can implement the `INotifyPropertyChanged` interface
automatically. The plumbing code is generated on-the-fly when you compile, so your source code remains clean and
concise.

{: .note }
`Metalama.Patterns.Observability` is a production-ready, professionally-supported and open-source aspect library. <i class="supported no-tooltip"></i>

{: .note }
Available for all UI frameworks


## Example

In the following code, the `[Observable]` aspect is applied to two classes: `Customer` (the Model class) and
`CustomerViewModel`.

```csharp
// THAT'S ALL. These classes implement INotifyPropertyChanged
// Thanks to the [Observable] aspect.

[Observable]
public partial class Customer
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}

[Observable]
public partial class CustomerViewModel
{
    // YES. This property can change.
    public Customer Customer { get; set; }

    // YES. This property depends on a property of a property.
    public string FullName
        => $"{this.Customer.FirstName} {this.Customer.LastName}";
}
```

## Benefits

* **Boost your productivity**. Eliminate 95% of the `INotifyPropertyChanged` repetitive code, as most cases are handled
  automatically.
* **Avoid errors**. Never forget to call `OnPropertyChanged` again.
* **Keep your code clean and concise**. Your business logic is no longer hidden behind the observability plumbing.

## Features

* Idiomatically C#: Metalama works _with_ your code, not against it.
* Recursive code analysis algorithm that detects dependencies of properties on fields and other properties within.
* Support for complex dependencies, such as properties depending on properties of child objects or of the base class.
* Customizable. Take control when needed to handle corner cases.
* Compatible with MVVM frameworks.
* Open source (MIT).

## Resources

* Blog
  post: [Implementing INotifyPropertyChanged with Metalama](https://blog.postsharp.net/inotifypropertychanged-metalama).
* Reference documentation: [Metalama.Patterns.Observability](https://doc.postsharp.net/metalama/patterns/observability).
* Source
  code: [Metalama.Patterns.Observability](https://github.com/postsharp/Metalama.Patterns/tree/HEAD/src/Metalama.Patterns.Observability).
* NuGet package: [Metalama.Patterns.Observability](https://www.nuget.org/packages/Metalama.Patterns.Observability).