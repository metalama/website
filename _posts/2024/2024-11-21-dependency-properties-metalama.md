---
layout: new-post
title: "Implementing WPF dependency properties with Metalama"
date: 2024-11-22 00:30:00 +01:00
categories: [The Timeless .NET Engineer]
permalink: /blog/wpf-dependency-property-metalama
author: "Darío Macchi"
summary: "Learn how to implement custom WPF dependency properties with minimal manual effort using Metalama, demonstrated through an example application."
source_url: https://github.com/postsharp/TimelessDotNetEngineer/tree/main/src/wpf/dependencyproperties
keywords:
- wpf dependency property
- c# dependency property
- wpf dependency property example
- custom wpf dependency property
related_articles:
- /wpf-dependency-property
- /inotifypropertychanged-metalama
- /wpf-command-metalama
image: /assets/images/2024/2024-11-wpf-dependency-properties-metalama/dependency-properties-dark.svg
---

When building user controls in WPF, it's [best practice](/wpf-best-practices-2024) to expose dependency properties in addition to normal C# properties. Unfortunately, implementing custom dependency properties requires a fair amount of redundant code. In this article, we'll explore how to use Metalama to eliminate this boilerplate code.

[Dependency properties](/wpf-dependency-property) allow WPF to assign these properties to a _source_ of values, enabling the UI to refresh when the source changes or implement animations -- a mechanism called _data binding_. In contrast, C# properties are directly assigned to a _value_, one time. The downside of dependency properties is that implementing them manually can be tedious and error-prone. It requires writing significant boilerplate code to register the property (using `DependencyProperty.Register`) and manage property-changed and validation callbacks.

In this article, we'll show how to reduce redundant code using Metalama, a powerful tool that automates repetitive coding tasks using aspects, thus simplifying the creation of custom dependency properties. This reduces development time and improves code consistency. Specifically, we'll demonstrate the `[DependencyProperty]` aspect and show how to add validation and callbacks.

## Example app

In this article, we'll use the example of a simple custom control called `LimitedTextBox`. This control has two dependency properties: `MaxLength` and `Text`. The `MaxLength` property specifies the maximum number of characters allowed in the text box, while the `Text` property holds the text entered by the user. As the user types into the `LimitedTextBox` control, it automatically updates the counter showing the number of characters remaining to reach the limit.

<p align="center">
  <img src="/assets/images/2024/2024-11-wpf-dependency-properties-metalama/dependency-properties-sample_project.png#unzoom150" alt="WPF HighlightedText app"/>
</p>

If you were to implement the `MaxLength` dependency [manually](/wpf-dependency-property), you'd end up with the following _three_ snippets:

{% include_file "{{page.source_url}}/LimitedTextBox_Manually/LimitedTextBox.xaml.cs" syntax="csharp" snippet="MaxLength_Property" %}
{% include_file "{{page.source_url}}/LimitedTextBox_Manually/LimitedTextBox.xaml.cs" syntax="csharp" snippet="OnMaxLengthChanged" %}
{% include_file "{{page.source_url}}/LimitedTextBox_Manually/LimitedTextBox.xaml.cs" syntax="csharp" snippet="ValidateMaxLength" %}

{% include get-source-code.html %}

Aside from the complexity of the `DependencyProperty.Register` method, you can see how this manual implementation can easily lead to errors and inconsistencies, especially as the number of properties grows. This is where Metalama comes in to simplify the process and reduce the amount of manual work required to implement dependency properties.

Let's see how we can simplify this using Metalama.

## Implementing dependency properties with Metalama

[Metalama](https://www.postsharp.net/metalama) is a tool that facilitates real-time code generation and validation in C# through the use of aspects. Aspects are special classes that work within the compiler to dynamically transforms code when you build, never committing the changes to your source code. This tool helps automate the creation of repetitive code, such as implementing dependency properties, [INotifyPropertyChanged](/inotifypropertychanged-metalama), [WPF commands](/wpf-command-metalama), and many others.

If you need to generate boilerplate code for a specific situation (like this one), you can create an aspect from scratch for it. However, as this task is quite common among WPF developers, Metalama simplifies it by offering a built-in solution.

The `[DependencyProperty]` aspect is one of the many open-source, production-ready aspects provided by Metalama. This aspect is specifically designed to automate the generation of the boilerplate code needed to implement dependency properties while maintaining flexibility. If you're interested in exploring more of these aspects, be sure to check out the [Metalama Marketplace](https://www.postsharp.net/metalama/marketplace).

Basically, the `[DependencyProperty]` turns a plain old C# automatic property into a dependency property.

To use the `[DependencyProperty]` aspect in your project, you must:

1. Add the [Metalama.Patterns.Wpf](https://www.nuget.org/packages/Metalama.Patterns.Wpf) package to your project.
2. Add the `[DependencyProperty]` custom attribute to a standard C# automatic property. Note that the containing type of the property must be derived from `DependencyObject`.

Let's see how the `MaxLength` property can be implemented using the `[DependencyProperty]` aspect:

{% include_file "{{page.source_url}}/LimitedTextBox_Metalama/LimitedTextBox.xaml.cs" syntax="csharp" snippet="MaxLength_Property" %}

In the code snippet above, we use the `[DependencyProperty]` aspect to decorate the `MaxLength` property in the `LimitedTextBox` class. Note that the property should be auto-implemented (no backing field required), and the default value is set directly in the property declaration. The aspect takes care of generating the necessary boilerplate code, including the property registration, metadata, and validation callbacks.

You can take a look at what the generated code will look like using our [Metalama Diff tool](https://doc.metalama.net/conceptual/using/understanding-your-code-with-aspects#metalama-diff) (included in [Visual Studio Tools for Metalama](https://marketplace.visualstudio.com/items?itemName=PostSharpTechnologies.PostSharp)).

![Metalama Diff tool](/assets/images/2024/2024-11-wpf-dependency-properties-metalama/dependency-props-metalama_diff.png#unzoom150)

By using the `[DependencyProperty]` aspect, we eliminate the need to manually implement the dependency property registration, metadata, and validation callbacks. This approach significantly reduces the amount of boilerplate code and ensures consistency across different dependency properties in the project.

## Adding validation with an attribute

If you've implemented dependency properties manually, you're likely familiar with _validation callback_ methods. With Metalama, validating a property can often be done using a simple _contract_ custom attribute from the [Metalama.Patterns.Contracts](https://doc.metalama.net/patterns/contracts) package.

Some examples are the [[Email], [Phone], and [Url]](https://doc.metalama.net/patterns/contracts/contract-types#email-phone-and-url), or [[NotEmpty]](https://doc.metalama.net/patterns/contracts/contract-types#notempty) contracts.

Here you can see an example where we apply the [[StrictlyGreaterThan]](https://doc.metalama.net/api/metalama-patterns-contracts-strictlygreaterthanattribute) contract to the `MaxLength` property:

{% include_file "{{page.source_url}}/LimitedTextBox_Metalama/LimitedTextBox.xaml.cs" syntax="csharp" snippet="MaxLength_Property_WithContract" %}

This approach results in compact and readable source code.

## Adding a validation callback

Let's now turn to the second dependency property: `Text`. We want to validate that the text is only made of letters or whitespaces. Although we could implement this requirement by using the [[RegularExpression]](https://doc.metalama.net/api/metalama-patterns-contracts-regularexpressionattribute) contract, we'll show here how to do this using a callback method.

Validation callbacks are methods that run _before_ the property is set. If they fail, the property is not set. There are two ways to add a validation contract:

* _Implicitly_ by following a _naming convention_ and creating a method whose name corresponds to the property name, plus the `Validate` prefix. In this case, the property name is `Text`, so the validation method should be named `ValidateText`.
* _Explicitly_, by setting the `ValidateMethod` parameter of the `[DependencyProperty]` type.

Metalama supports [several signatures](https://doc.metalama.net/patterns/wpf/dependency-property#adding-validation-through-a-callback-method) for the validation callback.

Here is the validation callback for the `Text` property:

{% include_file "{{page.source_url}}/LimitedTextBox_Metalama/LimitedTextBox.xaml.cs" syntax="csharp" snippet="ValidateText" %}

```csharp
[DependencyProperty(ValidateMethod = "WhateverValidationMethodNameYouWant")]
public string Text { get; set; }
```

Unlike the method used in the `DependencyProperty.Register`, the validation method used by Metalama doesn't return a boolean value; instead, it throws an exception if the value is invalid.

## Adding a PropertyChanged callback

Property-changed callbacks are invoked _after_ the value of a dependency property has changed. As with the validation callback, there are two ways to specify it:
* _Implicitly_ by following a naming convention. For example, the name of our property is `MaxLength`, so the PropertyChanged method should be named `OnMaxLengthChanged`. The same applies to the `Text` property and the `OnTextChanged` method. Metalama will automatically detect and use them as property-changed callbacks.
* _Explicitly_ by setting the `PropertyChangedMethod` of the `[DependencyProperty]` attribute.

As with the validation callback, there are several signatures for the `PropertyChanged` method (see them in the [documentation here](https://doc.metalama.net/patterns/wpf/dependency-property#adding-validation-through-a-callback-method)), so you can choose the one that best fits your needs. An important detail compared to the method used in the manual implementation (using the `DependencyProperty.Register`) is that the `PropertyChanged` method does not need to be static and can access the instance of the class.

Here are the `PropertyChanged` methods for our dependency properties:

{% include_file "{{page.source_url}}/LimitedTextBox_Metalama/LimitedTextBox.xaml.cs" syntax="csharp" snippet="OnPropertyChanged" %}

## Why use the Metalama approach?

The Metalama approach to implementing dependency properties offers several advantages over the manual approach. Here are some key benefits.

### Improved code readability and maintainability

By using the `[DependencyProperty]` aspect, you can eliminate the (ugly) boilerplate code typically associated with dependency property registration. This results in cleaner, more concise code that is easier to read and maintain.

The use of idiomatic C# code with aspects makes it easier for developers to understand the purpose of the code and its intended behavior. 

### Enhanced developer productivity

By leveraging Metalama, developers can focus on more critical aspects of their application, rather than getting bogged down in repetitious tasks. The automation provided by Metalama allows for quicker implementation of common patterns, leading to faster development cycles and more reliable code.
The Metalama approach significantly reduces the amount of manual work needed to implement dependency properties. This isn't just due to the reduction in boilerplate code but also because contracts from the `Metalama.Patterns.Contracts` package can help avoid reinventing the wheel by providing common validation methods.

This approach not only minimizes the likelihood of errors but also makes code maintenance and readability easier. By automatically generating the necessary code using aspects like `DependencyProperty` and contracts, developers can focus more on core functionality rather than repetitive code. As a result, development processes are sped up, and overall efficiency in software projects is improved.

## Conclusion

Manually implementing custom dependency properties in WPF can be a complex and error-prone task. It demands meticulous attention to detail, which can be time-consuming and may lead to inconsistencies or errors if not managed carefully.

However, tools like Metalama can significantly streamline this process. By using the `[DependencyProperty]` aspect, developers can automate the generation of the required code to implement dependency properties. This automation ensures consistency and reduces the potential for errors, simplifying the development of custom controls. It also allows developers to concentrate more on the core functionality of their applications, rather than getting bogged down by repetitive coding tasks.
