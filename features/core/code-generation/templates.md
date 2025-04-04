---
title: C#-to-C# Templates
summary: "Metalama's T# offers a C#-to-C# template language with syntax highlighting, code completion, and no runtime overhead for seamless code generation."
---

{: .intro }
Classic code generators are just _text_ generators. They don't offer syntax highlighting, code completion, or error checking for generated code. Metalama is a true, strongly-typed _object-oriented code generator_ that features T#, a unique C#-to-C# template language.

T# templates are pure C# methods and expressions, 100% compatible with any C# editor. They differ from regular C# methods solely in how they are compiled.

With T#, you can seamlessly blend generated code with hand-written code.

Benefits of T# include:

- **Full Intellisense support.** Enjoy syntax highlighting, code completion, member list, and error detection.
- **100% C# compatible.** Use any C# editor of your choice.
- **High performance.** Generate high-performance code without any runtime overhead.
- **No need to learn MSIL.** It's just the C# you already know.
- **Completely debuggable.** Step into the code you generate. [Learn more](../debugging).
- Additional syntax highlighting is available as a premium feature via Visual Studio Tools for Metalama.

## Example

Consider this aspect:

```csharp
public class RetryAttribute : OverrideMethodAspect
{
    public override dynamic? OverrideMethod()
    {
        for ( var i = 0;; i++ )
        {
            try
            {
                return meta.Proceed();
            }
            catch ( Exception e ) when ( i < 3 )
            {
                Console.WriteLine( $"{meta.Target.Method} failed: {e.Message}" );
                Thread.Sleep( 100 );
            }
        }
    }
}
```

The `OverrideMethod` is a T# template:

- `meta.Proceed()` is replaced by the implementation of the method being overridden.
- `meta.Target.Method` is the object model of the method being overridden. Here, we are calling the `ToString` method.

Now let's apply this template to a method:

```csharp
[Retry]
public async Task<decimal> GetExchangeRate()
{
    using var client = new HttpClient();
    var url = $"https://api.example.com/exchange?base=CZK&target=USD";

    var response = await client.GetAsync(url);
    response.EnsureSuccessStatusCode();

    var responseString = await response.Content.ReadAsStringAsync();
    return decimal.Parse(responseString);
}
```

During compilation, Metalama will apply the `[Retry]` template to the `GetExchangeRate` method and generate the following code:

```csharp
[Retry]
public async Task<decimal> GetExchangeRate()
{
    for ( var i = 0;; i++ )
    {
        try
        {
            using var client = new HttpClient();
            var url = $"https://api.example.com/exchange?base=CZK&target=USD";

            var response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            return decimal.Parse(responseString);
        }
        catch ( Exception e ) when ( i < 3 )
        {
            Console.WriteLine( $"CurrencyService.GetExchangeRate() failed: {e.Message}" );
            Thread.Sleep( 100 );
        }
    }
}
```

## How does it work?

{% raw %}
T# templates differentiate between *compile-time* and *run-time* code execution. Since there are no tags like `{% %}` or `<% %>` to distinguish compile-time C# from run-time C#, Metalama relies on inference rules to determine which statements and expressions are compile-time and which ones are run-time.
{% endraw %}

By default, all APIs are considered run-time. Compile-time APIs (like the `meta` class) must be tagged with the `[CompileTime]` custom attribute. When Metalama encounters a compile-time API call in your template, it uses complex inference rules to determine which parts of the template should execute at compile-time.

For example, in the snippet below, `meta.Target` is tagged as compile-time. By inference, `meta.Target.Method.Parameters` is compile-time, making the `parameters` variable and the `foreach` loop compile-time as well. In `$"{p.Name} = '{p.Value}'"`, `p.Name` is compile-time, but `p.Value` is a compile-time expression returning a run-time expression.

```csharp
public override dynamic? OverrideMethod()
{
    var parameters = meta.Target.Method.Parameters;

    foreach ( var p in parameters )
    {
        Console.WriteLine( $"{p.Name} = '{p.Value}'");
    }

    return meta.Proceed();
}
```

Most of the `Metalama.Framework` namespace is compile-time. You can extend T# with your own classes and methods by tagging them with the `[CompileTime]` or `[RunTimeOrCompileTime]` attributes.

## Features

- Compile-time local variables, `foreach`, `if`, `switch`.
- Access unknown members through C# `dynamic` typing.
- Template parameters.
- Call a template from another template (including virtual calls).
- Complete API to reflect on the code being compiled.
- APIs to dynamically build interpolated strings, `switch` statements.
- Serialization from compile-time objects to run-time expressions.

