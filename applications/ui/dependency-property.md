---
title: Dependency Properties
summary: "Metalama.Patterns.Wpf is an open-source library for WPF, enhancing productivity by generating dependency properties without boilerplate code."
keywords: "dependency properties, boilerplate code, Metalama.Patterns.Wpf, WPF, C# automatic properties, productivity, open-source library, validation rules, OnPropertyChanged callbacks"
---

TODO

{: .note }
`Metalama.Patterns.Wpf` is a production-ready, professionally-supported and open-source aspect library. <i class="supported no-tooltip"></i>


{: .note }
Available for WPF only


## Example

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

## Benefits

* **Boost your productivity**. Generate dependency properties from C# automatic properties without boilerplate code.

## Features

* Integrates with [Metalama.Patterns.Contracts](https://doc.postsharp.net/metalama/patterns/contracts) to set validation
  rules without reinventing the wheel.
* Fully customizable: add your own validation or `OnPropertyChanged` callbacks.
* Open source (MIT).

## Resources

* Blog
  post: [Implementing WPF Dependency Properties with Metalama](https://blog.postsharp.net/wpf-dependency-property-metalama).
* Reference
  documentation: [WPF Dependency Properties](https://doc.postsharp.net/metalama/patterns/wpf/dependency-property).
* Source
  code: [Metalama.Patterns.Wpf](https://github.com/postsharp/Metalama.Patterns/tree/HEAD/src/Metalama.Patterns.Wpf).
* NuGet package: [Metalama.Patterns.Wpf](https://www.nuget.org/packages/Metalama.Patterns.Wpf).

