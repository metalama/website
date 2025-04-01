---
title: Code Validation
toc: false
---

{: .intro }
When enhancing a class or method, it is crucial to validate that the target code meets your assumptions. If it does not, a clear and appropriate error message should be reported. In Metalama, aspects not only have the ability to generate code but also to _validate_ it. You can even create aspects that serve purely as validators without any code generation logic.

Metalama provides two mechanisms for validation:

- _Define eligibility conditions_ to specify which declarations the aspect can be applied to. If eligibility conditions are violated, an error is reported, and the aspect is not applied. Additionally, the refactoring menu in the IDE will only suggest adding eligible aspects.
- _Programmatically report warnings and errors_ when specific conditions are encountered.

Both approaches can report warnings and errors in real-time as you type or during the build process.

## Benefits

- **Least Astonishment.** As an aspect author, it is your responsibility to ensure that users of your aspects receive clear and meaningful error messages.
- **Fail Fast, Early.** Avoid exceptions in your aspect logic or confusing C# errors due to invalid generated code.

## Example

The following aspect makes two assumptions about the method it is applied to:

- The method must be non-static. This is an eligibility condition because the aspect should not appear in the lightbulb menu for static methods.
- The containing class must have a field named `_logger`. If this condition is not met, an error will be reported.

```cs
internal class LogAttribute : OverrideMethodAspect
{
    private static readonly DiagnosticDefinition<INamedType> _error = new(
        "MY001",
        Severity.Error,
        "The type {0} must have a field named '_logger'." );

    public override void BuildEligibility( IEligibilityBuilder<IMethod> builder )
    {
        base.BuildEligibility( builder );

        // Ensure the target method is non-static; otherwise, do not
        // suggest the aspect in the lightbulb menu.

        builder.MustNotBeStatic();
    }

    public override void BuildAspect( IAspectBuilder<IMethod> builder )
    {
        base.BuildAspect( builder );

        if ( !builder.Target.DeclaringType.Fields.OfName( "_logger" ).Any() )
        {
            // Report an error if the '_logger' field is missing.
            builder.Diagnostics.Report(
              _error.WithArguments( builder.Target.DeclaringType ) );
        }
    }

    public override dynamic? OverrideMethod()
    {
        meta.This._logger.WriteLine( $"Executing {meta.Target.Method}." );

        return meta.Proceed();
    }
}
```

## Resources

* Reference documentation:
    - [Reporting and suppressing diagnostics](https://doc.metalama.net/conceptual/aspects/diagnostics)
    - [Defining the aspect eligibility](https://doc.metalama.net/conceptual/aspects/eligibility)