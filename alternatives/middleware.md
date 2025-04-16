---
title: "Middleware and Dependency Injection"
summary: "This page shows how AOP can be implemented using middleware or dependency injection."
keywords:
- c# middleware
- c# custom middleware
- dependency injection c#
---

Many .NET libraries, such as dependency injection frameworks, ASP.NET action filters, and WCF behaviors, offer features akin to Aspect-Oriented Programming (AOP). Particularly noteworthy are those based on dependency injection frameworks. These frameworks, when an interface is requested, do not directly return the implementation; instead, they provide a _proxy type_, sometimes called a _dynamic proxy_ because it is generated at runtime during the application startup. This proxy, acting as an intermediary, implements the same interface, injects the desired aspects, and then proceeds to call the actual service implementation.

This approach is user-friendly and integrates seamlessly into the .NET ecosystem. However, it's important to recognize its limitations. These libraries offer a somewhat limited perspective on the capabilities of AOP, especially when compared to what is achievable with compiler-based AOP methods.

## Implementations

* [AspectCore](https://github.com/dotnetcore/AspectCore-Framework) is a basic but popular aspect-oriented framework based on dynamic proxies. It integrates with the `Microsoft.Extensions.DependencyInjection` namespace and Autofac. Some documentation is available in Chinese.

## Strengths

- **Simplified learning curve**: Middleware-based AOP frameworks align well with concepts like dependency injection and application server architectures. Their configuration mechanisms are intuitive, often mirroring the underlying principles of these environments, which makes them a natural fit. With a focus primarily on interception, these frameworks are more straightforward to understand. Their simplicity extends not just to their use but also to their internal implementation. This makes them accessible to a broader range of development teams, including those without specialized AOP expertise.

- **Runtime flexibility**: A key advantage of middleware-based AOP is its runtime adaptability. Aspects can be added, modified, or removed as the application runs, offering significant flexibility. This dynamic configurability, achievable through code or configuration files, allows for tailored application behavior under varying conditions. Furthermore, the ability to selectively apply aspects, such as excluding certain aspects during unit testing, enhances development and testing processes.

- **No need for special compilation**: One of the major conveniences of middleware-based AOP is the elimination of a specialized compilation step. Aspects are woven in at runtime, simplifying the build and deployment pipeline and reducing overall complexity in application setup.

- **Serviceability**: The simpler framework structure of middleware-based AOP becomes a significant advantage when it comes to maintenance and bug fixing. In contrast, compiler-based AOP frameworks are often considerably more complex, representing several man-years of development effort. This complexity can make them less serviceable by application developers, who may find it challenging to understand and modify such intricate systems.

## Limitations

Compared to statically-weaved AOP (whether implemented as MSIL or AST rewriting), middleware-based AOP presents the following limitations:

- **Limited code transformation features**: Proxy-based frameworks can only intercept calls at component boundaries, such as interfaces or virtual methods. Compiler-based frameworks, on the other hand, can override any declaration, including private fields or methods, or helper classes that are not part of the component facade. See Unique Qualities | Most comprehensive code generation.

- **Risk of over-modularization**: Because these libraries are only able to inject behaviors at component boundaries, you may be tempted to over-modularize just to make use of the injection abilities of the framework. This can increase the complexity and decrease the performance of the application. See Unique Qualities | Architecture agnostic.

- **Performance overhead**: Libraries performing runtime injection tend to be slower because they do their work at runtime. See Unique Qualities | Excellent runtime performance.

- **Lack of traceability and intelligibility**: Proxy-based AOP libraries lack visibility into the aspects being applied to the code. Compile-time frameworks have the potential to provide clearer visibility, allowing you to observe which code is being executed and comprehend the impact of aspects without executing or debugging the program. See Unique Qualities | Traceable and intelligible.

## Conclusion

In conclusion, middleware-based AOP frameworks in .NET provide user-friendly integration, runtime flexibility, and simplified serviceability without needing special compilation. However, they are limited in their transformation capabilities, risk inducing over-modularization, and may introduce performance overheads and challenges in aspect traceability.

On the other hand, compiler-based AOP methods offer broader aspect-weaving abilities and better performance, albeit with increased complexity. The choice between the two approaches should be based on the project's specific needs, balancing simplicity and integration against comprehensive aspect control and efficiency.
