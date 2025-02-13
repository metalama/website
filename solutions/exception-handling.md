---
summary: "This article shows how to use Metalama to improve the resilience and performance of .NET/C# apps by adding exception handling, caching, and other policies."
keywords:
- .net resilience
- c# exception handling
- polly c#
- .net polly
---

# Exception Handling & Resilience

{: .intro }
Resilience refers to a system's ability to recover gracefully from failures, handle unexpected situations, and continue
delivering what it's supposed to do. To achieve this, engineers use key resilience patterns like circuit breakers,
retries, fallbacks, and throttling.

Adding resilience into a codebase usually requires writing boilerplate code, which is often tedious, unproductive, and
error-prone.

Let's see how Metalama helps.

## With Polly

Polly is the go-to library for implementing resilience in .NET. It implements the most-used policies, is actively
maintained, and there is probably no need to reinvent the wheel.

However, adding Polly to your code can still require some boilerplate code: you still need to pull dependencies and wrap
all methods into delegate calls—for each method.

With Metalama, you can add Polly without any boilerplate.

### Benefits

Compared to adding Polly manually, adding it with Metalama has the following benefits:

- **Clean code**: There's no need to wrap your code in a delegate call, so it remains crystal clear and is easier to
  maintain.
- **Easily modify the pattern**: You can easily replace Polly with another library or remove it altogether if you want.

### Example

You can create a `[AddPolicy]` Metalama aspect that pulls the Polly dependency and wraps your method into a delegate
code:

```cs
public class CalculatorService
{
    [AddPolly( "MyPolicy" )]
    public int Add( int a, int b )
    {
        // Your code here
        return a + b;
    }
}
```

See [this commented example](https://doc.postsharp.net/metalama/examples/exception-handling/retry/retry-5) to learn how
to create such aspects.

{: .show-more }
Show me my transformed code!

Here is what the `[AddPolly]` aspect may do to your code.

{% raw %}
```cs
internal class CalculatorService
{
   private ILogger _logger;
   private IPolicyFactory _policyFactory;

    public CalculatorService(ILogger<RemoteCalculator> logger, IPolicyFactory? policyFactory)
    {
        this._logger = logger;
        this._policyFactory = policyFactory;
    }

    public int Add(int a, int b)
    {
        object? ExecuteCore()
        {
            try
            {
                // Your code here.
                return a + b;
            }
            catch (Exception e)
            {
                _logger.LogWarning(
                    $"CalculatorService.Add(a = {{{a}}}, b = {{{b}}}) has failed: {e.Message}");
                throw;
            }
        }

        var policy = _policyFactory.GetPolicy(PolicyKind.Retry);
        return (int)policy.Execute(ExecuteCore);
    }
}
```
{% endraw %}

### Resources

* Example: [Implementing an auto-retry aspect that uses Polly](https://doc.postsharp.net/metalama/examples/exception-handling/retry/retry-5)
* Blog: [5 practical ways to add Polly to your application](https://blog.postsharp.net/polly)

## Without Polly

You can, of course, create exception-handling aspects without Polly.
See [these examples](https://doc.postsharp.net/metalama/examples/exception-handling) to get some inspiration.
