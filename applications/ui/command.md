---
title: Command
summary: "Metalama.Patterns.Wpf automates WPF command implementation, enhancing productivity by reducing boilerplate code and supporting `CanExecute` logic."
---

One of the [best practices](https://blog.postsharp.net/wpf-best-practices-2024) in WPF is to implement the logic behind
buttons and menu items as a Command (`ICommand`) instead of a simple event handler. This keeps the command logic
separate from the UI code, achieving a better separation of concerns. It also allows the button or menu item to render
itself as grayed out when the command is not available, thanks to `CanExecute`.

The implementation of WPF commands requires some redundant code, especially to integrate the `CanExecute` logic.

The [Command](https://doc.postsharp.net/metalama/patterns/wpf/command) aspect of the `Metalama.Patterns.Wpf` open-source
package solves this problem by automatically generating the plumbing code. It integrates with
the [Observable](https://doc.postsharp.net/metalama/patterns/observability) aspect to provide support for the
`CanExecute` logic.

{: .note }
`Metalama.Patterns.Wpf` is a production-ready, professionally-supported and open-source aspect library. <i class="supported no-tooltip"></i>

{: .note }
Available for WPF only


## Example

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

## Benefits

* **Boost your productivity**. Minimize boilerplate code to implement ICommand properties.
* **Keep your code clean and concise**. Your business logic is easier to read and less entangled.

## Features

* Idiomatically C#: Metalama works _with_ your code, not against it.
* Supports simple, parameterized, async, and background commands.
* Integrates with the `[Observable]` aspect to handle the `CanExecute` functionality without boilerplate.
* Open source (MIT).

## Resources

* Blog post: [Implementing WPF Commands with Metalama](https://blog.postsharp.net/wpf-command-metalama).
* Reference documentation: [WPF Commands](https://doc.postsharp.net/metalama/patterns/wpf/command).
* Source
  code: [Metalama.Patterns.Wpf](https://github.com/postsharp/Metalama.Patterns/tree/HEAD/src/Metalama.Patterns.Wpf).
* NuGet package: [Metalama.Patterns.Wpf](https://www.nuget.org/packages/Metalama.Patterns.Wpf).


