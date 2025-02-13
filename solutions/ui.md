---
summary: "Shows different use cases of Metalama in writing UI apps (like WPF)."
keywords:
- inotifypropertychanged
- c# code contracts
- c# preconditions
- wpf command
- wpf dependency property
- undo redo
- c# change tracking
---

# Metalama for UI Apps

{: .intro }
Metalama can save you a significant amount of redundant code and reduce errors when implementing UI apps, whether they
run on desktop, mobile, or browser through WASM. UI apps are often complex, requiring a lot of boilerplate code to make
them reactive to user input. Metalama aids in implementing observability (allowing the UI framework to react to data
changes), input validation, memoization, and framework-specific constructs such as dependency properties or commands in
WPF.

## INotifyPropertyChanged

{: .note }
Available for all UI frameworks

Most modern UI applications rely on binding data classes to UI classes. The `INotifyPropertyChanged` interface is the
standard way to achieve this. However, implementing this interface manually can be cumbersome and error-prone,
particularly when dealing with a large number of properties.

Thanks to Metalama's [Observable](https://doc.postsharp.net/metalama/patterns/observability) aspect of the
`Metalama.Patterns.Observability` open-source package, you can implement the `INotifyPropertyChanged` interface
automatically. The plumbing code is generated on-the-fly when you compile, so your source code remains clean and
concise.

### Example

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

### Benefits

* **Boost your productivity**. Eliminate 95% of the `INotifyPropertyChanged` repetitive code, as most cases are handled
  automatically.
* **Avoid errors**. Never forget to call `OnPropertyChanged` again.
* **Keep your code clean and concise**. Your business logic is no longer hidden behind the observability plumbing.

### Features

* Idiomatically C#: Metalama works _with_ your code, not against it.
* Recursive code analysis algorithm that detects dependencies of properties on fields and other properties within.
* Support for complex dependencies, such as properties depending on properties of child objects or of the base class.
* Customizable. Take control when needed to handle corner cases.
* Compatible with MVVM frameworks.
* Open source (MIT).

### Resources

* Blog
  post: [Implementing INotifyPropertyChanged with Metalama](https://blog.postsharp.net/inotifypropertychanged-metalama).
* Reference documentation: [Metalama.Patterns.Observability](https://doc.postsharp.net/metalama/patterns/observability).
* Source
  code: [Metalama.Patterns.Observability](https://github.com/postsharp/Metalama.Patterns/tree/HEAD/src/Metalama.Patterns.Observability).
* NuGet package: [Metalama.Patterns.Observability](https://www.nuget.org/packages/Metalama.Patterns.Observability).

## Code contracts

{: .note }
Available for all UI frameworks

Metalama's [code contracts](https://doc.postsharp.net/metalama/patterns/contracts) are a simple mechanism to validate
the value assigned to properties, fields, or parameters. When applied to Model or ViewModel properties, code contracts
can be used to implement _user input validation_.

Code contracts can also be used to implement __defensive programming__: a strategy where individual components (even
non-user-facing ones) do not trust each other and aggressively check their preconditions. Defensive programming prevents
the propagation of defects from one component to another, easing the diagnostic of exceptions.

Code contracts are similar to
the [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations)
namespace, but can be applied to _any_ class and not just ASP.NET ones.

### Example

The following snippet shows contracts applied to properties of the `Customer` class.

```csharp
public class Customer
{
    [Phone]
    public string? Phone { get; set; }

    [Url]
    public string? Url { get; set; }

    [Range( 1900, 2100 )]
    public int? BirthYear { get; set; }

    public string? FirstName { get; set; }

    [Required]
    public string LastName { get; set; }
}
```

Here we have a contract applied to an `out` parameter.

```csharp
public interface ICustomerService
{
    // Returns the name of a given customer or null if it cannot be found,
    // but never returns an empty string.
    bool TryGetCustomerName( int id, [NotEmpty] out string? name );
}
```

This code will check the value of _all_ non-nullable parameters in the current project.

```csharp
internal class Fabric : ProjectFabric
{
    public override void AmendProject( IProjectAmender amender )
    {
        amender.VerifyNotNullableDeclarations();
    }
}
```

### Benefits

* Validate user inputs while keeping your code concise and readable.
* Implement defensive programming and prevent the propagation of bugs from one component to another.

### Features

* Preconditions: input parameter values, field/property setter values.
* Postconditions: output parameter values, return values, property getter values.
* Invariants: method executed before exiting any public method.
* Global null-checking with one line of code thanks to fabrics.
* Customizable and localizable: change the `throw` statement at will.
* Open source (MIT).

### Resources

* Reference documentation: [Code Contracts](https://doc.postsharp.net/metalama/patterns/contracts).
* Source
  code: [Metalama.Patterns.Contracts](https://github.com/postsharp/Metalama.Patterns/tree/HEAD/src/Metalama.Patterns.Contracts).
* NuGet package: [Metalama.Patterns.Contracts](https://www.nuget.org/packages/Metalama.Patterns.Wpf).

## Command

{: .note }
Available for WPF only

One of the [best practices](https://blog.postsharp.net/wpf-best-practices-2024) in WPF is to implement the logic behind
buttons and menu items as a Command (`ICommand`) instead of a simple event handler. This keeps the command logic
separate from the UI code, achieving a better separation of concerns. It also allows the button or menu item to render
itself as grayed out when the command is not available, thanks to `CanExecute`.

The implementation of WPF commands requires some redundant code, especially to integrate the `CanExecute` logic.

The [Command](https://doc.postsharp.net/metalama/patterns/wpf/command) aspect of the `Metalama.Patterns.Wpf` open-source
package solves this problem by automatically generating the plumbing code. It integrates with
the [Observable](https://doc.postsharp.net/metalama/patterns/observability) aspect to provide support for the
`CanExecute` logic.

### Example

In the following example, the `[Command]` aspect will generate an `ExecuteSaveCommand` property based on the
`ExecuteSave` method and the `CanExecuteSave` property.

```csharp
[Observable]
public partial class MainWindow : Window
{
    public bool HasChanges { get; private set; };

    [Command]
    public void ExecuteSave()
    {
        // Details skipped.
    }

    public bool CanExecuteSave => this.HasChanges;
}
```

### Benefits

* **Boost your productivity**. Minimize boilerplate code to implement ICommand properties.
* **Keep your code clean and concise**. Your business logic is easier to read and less entangled.

### Features

* Idiomatically C#: Metalama works _with_ your code, not against it.
* Supports simple, parameterized, async, and background commands.
* Integrates with the `[Observable]` aspect to handle the `CanExecute` functionality without boilerplate.
* Open source (MIT).

### Resources

* Blog post: [Implementing WPF Commands with Metalama](https://blog.postsharp.net/wpf-command-metalama).
* Reference documentation: [WPF Commands](https://doc.postsharp.net/metalama/patterns/wpf/command).
* Source
  code: [Metalama.Patterns.Wpf](https://github.com/postsharp/Metalama.Patterns/tree/HEAD/src/Metalama.Patterns.Wpf).
* NuGet package: [Metalama.Patterns.Wpf](https://www.nuget.org/packages/Metalama.Patterns.Wpf).

## Dependency property

{: .note }
Available for WPF only

### Example

```csharp
public partial class FancyTextBlock : UserControl
{
    public FancyTextBlock()
    {
        InitializeComponent();
    }

    [Required]
    [DependencyProperty]
    public string Text { get; set; } = "Hello, world.";

    [DependencyProperty]
    public Brush FancyBorderBrush { get; set; }

    public void OnFancyBorderBrushChanged() { /* Handle changes here. */}
}
```

### Benefits

* **Boost your productivity**. Generate dependency properties from C# automatic properties without boilerplate code.
* **Keep your code clean and concise**. Your business logic is easier to read and less entangled.

### Features

* Integrates with [Metalama.Patterns.Contracts](https://doc.postsharp.net/metalama/patterns/contracts) to set validation
  rules without reinventing the wheel.
* Fully customizable: add your own validation or `OnPropertyChanged` callbacks.
* Open source (MIT).

### Resources

* Blog
  post: [Implementing WPF Dependency Properties with Metalama](https://blog.postsharp.net/wpf-dependency-property-metalama).
* Reference
  documentation: [WPF Dependency Properties](https://doc.postsharp.net/metalama/patterns/wpf/dependency-property).
* Source
  code: [Metalama.Patterns.Wpf](https://github.com/postsharp/Metalama.Patterns/tree/HEAD/src/Metalama.Patterns.Wpf).
* NuGet package: [Metalama.Patterns.Wpf](https://www.nuget.org/packages/Metalama.Patterns.Wpf).

## Memoization

{: .note }
Available for all UI frameworks
In high-performance apps or components, [memoization](https://doc.postsharp.net/metalama/patterns/memoization) is the
technique of "remembering" the value of a read-only property of an object to avoid subsequent evaluations. Memoization
is helpful when a property always returns the same value for the same object. Unlike caching, memoization does not rely
on an external caching component or a string-based key but is implemented directly in the property, making it very fast.

High-performance implementations of the memoization pattern can be tricky to implement due to multi-threading issues.

Metalama's [Memoize](https://doc.postsharp.net/metalama/patterns/memoization) aspect makes this process trivial,
effectively turning a standard read-only property into a memoized one without any boilerplate.

### Example

In the following snippet, the `PatternBrush` property is memoized, ensuring it is created only once.

```csharp
public class ExpensiveResourceViewModel : DependencyObject
{
    [Memoize]
    public VisualBrush PatternBrush => new VisualBrush
    {
        TileMode = TileMode.Tile,
        Viewport = new Rect(0, 0, 20, 20),
        ViewportUnits = BrushMappingMode.Absolute,
        Visual = CreatePatternVisual()
    };

    private DrawingVisual CreatePatternVisual()
    {
        var visual = new DrawingVisual();
        using (var context = visual.RenderOpen())
        {
            context.DrawRectangle(Brushes.LightGray, null, new Rect(0, 0, 20, 20));
            context.DrawLine(new Pen(Brushes.Blue, 2), new Point(0, 0), new Point(20, 20));
            context.DrawLine(new Pen(Brushes.Blue, 2), new Point(20, 0), new Point(0, 20));
        }
        return visual;
    }
}
```

### Benefits

* Improve your application's performance.
* Avoid common mistakes in implementing the memoization code pattern.
* Keep your code clean and concise.

### Resources

* Reference documentation: [Memoization](https://doc.postsharp.net/metalama/patterns/memoization).
* Source
  code: [Metalama.Patterns.Memoization](https://github.com/postsharp/Metalama.Patterns/tree/HEAD/src/Metalama.Patterns.Memoization).
* NuGet package: [Metalama.Patterns.Memoization](https://www.nuget.org/packages/Metalama.Patterns.Memoization).

## Change tracking

When programming UIs, especially "transactional" UIs with _Ok_ buttons, it's necessary to detect whether a data object
has been modified. This feature is often called the _Dirty Flag_. It allows, for instance, enabling or disabling the
_Save_ button. In .NET, this behavior is abstracted by the `IChangeTracking` interface. Another interface,
`IRevertibleChangeTracking`, supports the _Reset_ feature.

Here is the definition of these system interfaces:

```csharp
public interface IChangeTracking
{
  bool IsChanged { get; }
  void AcceptChanges();
}

public interface IRevertibleChangeTracking : IChangeTracking
{
  void RejectChanges();
}
```

Implementing these interfaces manually requires a lot of work because it is necessary to instrument every property
setter or any method modifying fields.

Generating code in properties and fields is exactly where Metalama excels.

You can create an aspect that adds the `IChangeTracking` or `IRevertibleChangeTracking` interface to the target type and
instruments all fields and properties to set the `IsChanged` property.

### Example

Implementing `IChangeTracking` or even `IRevertibleChangeTracking` in the following classes can be as easy as adding a
`[TrackChanges]` custom attribute. We made a slight modification to the .NET pattern: we require an `IsTrackingChanges`
property to be enabled for change tracking to work.

```csharp
[TrackChanges]
public partial class Comment
{
    public Guid Id { get; init; }
    public required string Author { get; set; }
    public required string Content { get; set; }
}

public class ModeratedComment : Comment
{
    public bool? IsApproved { get; set; }
}
```

Let's see this aspect in action.

```csharp
var comment = new ModeratedComment
{
    Id = Guid.NewGuid(),
    Author = "Cicero",
    Content = "Non nobis solum nati sumus",

    // Must be the last one.
    IsTrackingChanges = true
};

Console.WriteLine($"IsChanged={comment.IsChanged}");

comment.IsApproved = true;
Console.WriteLine($"IsChanged={comment.IsChanged}");

comment.AcceptChanges();
Console.WriteLine($"IsChanged={comment.IsChanged}");
```

The program prints the following text:

```text
IsChanged=False
IsChanged=True
IsChanged=False
```

{: .show-more }
Show me how it works!

The [TrackChanges](https://doc.postsharp.net/metalama/examples/change-tracking/change-tracking-1) aspect transforms the
`Comment` class into this:

```csharp
public partial class Comment : ISwitchableChangeTracking, IChangeTracking
{
    private string _author;
    private string _content;

    public required Guid Id { get; init; }

    public required string Author
    {
        get => this._author;
        set
        {
            if (value != this._author)
            {
                this._author = value;
                OnChange();
            }
       }
    }

    public required string Content
    {
        get => this._content;

        set
        {
            if (value != this._content)
            {
                this._content = value;
                OnChange();
            }
        }
    }

    public bool IsChanged { get; private set; }
    public bool IsTrackingChanges { get; set; }

    public void AcceptChanges()
    {
        IsChanged = false;
    }

    protected void OnChange()
    {
        if (IsTrackingChanges)
        {
            IsChanged = true;
        }
    }
}
```

A [more complex variant](https://doc.postsharp.net/metalama/examples/change-tracking/change-tracking-3) of the aspect
can integrate with the `INotifyPropertyChanged` interface or implement the `RejectChanges` functionality.

### Metalama benefits

### Resources

* Example: [Change tracking](https://doc.postsharp.net/metalama/examples/change-tracking)

## Undo/redo

Undo/redo is always a popular feature, especially in UIs that do not rely on pushing the _Ok_ button. A common way to
implement it is to follow the Memento pattern, originally formalized by the famous "Gang of Four's" Design Patterns
book.

For details, see the [Memento Pattern](design-patterns#memento) on this website.
