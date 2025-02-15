---
title: Report Warnings and Errors
toc: false
---

Metalama is not just a code generation tool. It is a comprehensive meta-programming framework where units of behavior
are called _aspects_. Examples of aspects are `[Retry]`, `[Memento]`, or `[MeasureExecutionCount]`. Aspects don't only
encapsulate code generation but also code _validation_. For instance, the `[MeasureExecutionCount]` aspect relies on
dependency injection to pull the metrics object. Therefore, it can only be applied to non-static methods. Aspects in
Metalama also have the ability to validate code and report errors and warnings.

There are two validation mechanisms in Metalama. You can:

- _Define eligibility conditions_ on which declarations the aspect can be applied. When eligibility conditions are
  violated, an error is reported, and the aspect is not applied. Also, the refactoring menu in the IDE would only
  suggest adding eligible aspects.
- _Programmatically report warnings and errors_ when any situation occurs.

Both approaches can report warnings and errors immediately as you type or at the build.

## Example

The following aspect makes two assumptions about the method to which it is applied:

- It assumes the method to be non-static, which is an eligibility condition.
- It requires the class to contain a field named `_logger` and will report an error if it does not.

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

        builder.MustNotBeStatic();
    }

    public override void BuildAspect( IAspectBuilder<IMethod> builder )
    {
        base.BuildAspect( builder );

        if ( !builder.Target.DeclaringType.Fields.OfName( "_logger" ).Any() )
        {
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