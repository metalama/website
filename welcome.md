---
title: Welcome to Metalama!
layout: plain
---

<style>
form {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Added shadow */
}

form > div {
    padding: 20px !important;
}
</style>

<script>
  new MutationObserver((m, o) => {
    const boxes = document.querySelectorAll('input[type="checkbox"]');
    const input = document.querySelector('input[type="text"]');
    if (boxes.length && input) {
      boxes.forEach(cb => cb.checked = true);
      input.focus();
      o.disconnect();
    }
  }).observe(document.body, { childList: true, subtree: true });
</script>



🎉 **Welcome to Metalama!**

We're absolutely thrilled to have you here.

Metalama opens the door to advanced and efficient meta-programming, excelling in code generation and validation. Think of it as a modern reinvention of aspect-oriented programming for .NET. Our motto: _If it's repetitive, it can be automated._ Say goodbye to tedious tasks and cumbersome boilerplate. Welcome to clean, maintainable, and DRY code.

## 📩 Free Email Course & Newsletter

Don't miss out on the latest updates, tips, and tricks! Subscribe to our newsletter today:

<script async data-uid="9dd40aa45d" src="https://postsharp.kit.com/9dd40aa45d/index.js"></script>

## 🚀 Getting Started with Metalama

Let's get you started on this exciting journey:

- 🌟 **[Using Metalama](https://doc.metalama.net/conceptual/using):** Start here if, like most developers, you will use Metalama but won't author your own aspects.
- 🛠️ **[Building Aspects](https://doc.metalama.net/conceptual/getting-started):** Ready to build your own aspects? This is your launchpad.
- 🛒 **[Metalama Marketplace](/marketplace):** Discover pre-built aspect libraries to save time and effort.
- 📚 **[Use Cases](/applications):** Learn when Metalama is the right tool for the job (and when it isn't).

Happy coding!

{: .note }
Metalama collects usage data to help us improve your experience. This data is securely gathered by PostSharp Technologies and handled in accordance with their [privacy policy](https://www.postsharp.net/company/legal/privacy-policy). If you prefer not to share this data, you can easily opt out. Simply set the `METALAMA_TELEMETRY_OPT_OUT` environment variable to `1` or `true` in your shell, or use the `metalama telemetry` CLI tool. For detailed instructions, visit our [telemetry documentation](https://doc.metalama.net/conceptual/configuration/telemetry).

