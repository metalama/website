---
title: Memoization
---

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