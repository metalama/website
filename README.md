# Metalama Website

This is the source code of https://metalama.net/.

## Installing Jekyll on Windows

1. Install Ruby 3.2:

   ```
   winget install RubyInstallerTeam.RubyWithDevKit.3.2
   ```

   > It will NOT work with Ruby 3.1!

2. Restart the terminal so that `PATH` is reloaded.

3. In the Ruby prompt, do: 

   ```
   gem install jekyll bundler
   ```
   then:
   ```
   bundle install
   ```

## Running locally

On a command prompt, execute:

```
run-server.cmd
```

## Writing posts

### Drafts

Drafts that are _queued_ (not for immediate publication) must be created under the `_drafts` folder.

### Frontmatter


Here is an example:


```yml
layout: post
origin: postsharp
comments: false
title: "MemoryCache in C#: A Practical Guide"
date: 2024-04-23 08:00:01 +01:00
categories:
    - The Timeless .NET Engineer
permalink: /blog/memorycache
origin: https://blog.postsharp.net/memorycache
author: "Metalama Team"
image: /assets/images/2024/2024-05-memorycache/memorycache.svg
thumbnail: /assets/images/2024/2024-05-memorycache/memorycache.light.svg
summary: "What is MemoryCache? When should we use it? When to prefer distributed caching? How to integrate caching into your code without boilerplate and without making it too brittle? This Practical Guide answers all these questions."
keywords:
    - memorycache
    - C# memorycache
    - imemorycache
    - C# memory cache
source_url: https://github.com/postsharp/TimelessDotNetEngineer/tree/main/memorycache/part1
``` 
  

#### Required

* `layout`: Must be `new-post`.
* `categories`: Use only existing categories!
* `date`: Must be a past date.
* `permalink`: The path where the article is published.

#### SEO

* `title`: This is both the HTML title and the readable title.
* `keywords`
* `summary`

#### Images

* `image`: The image shown in the post page. Must have a dark purple background.
* `thumbnail`: Optional. The image shown in the home page or category page. Can have a different background.

### Source code

* `source_url`: typically the GitHub URL. When an article is published (not draft), the master branch must be used. When editing, you can use a local path by using the `file://` prefix, e.g. `file://c:/src...`


## Remote code snippets

We use a fork of `jekyll_include_plugin` to render snippets hosted on GitHub.

The typical use is the following:

```
{% include_file "{{page.source_url}}/Sample1/Program.cs" syntax="csharp" snippet="AddMemoryCache" %}
```

Notes:
* Always use `{{page.source_url}}` to refer to the source repo. The plug-in will transform the URL to point to the raw file.
* `syntax` is required
* `snippet` is optional and refers to a mark-up in the remote file. Here is an example:
    
    ```csharp
    using Microsoft.AspNetCore.Mvc.RazorPages;
    
    namespace Sample1.Pages;
    
    public class BaseModel : PageModel
    {
        // [<snippet currencies>]
        public IReadOnlyList<string> Currencies { get; } =
        [
            "bitcoin",
            "ethereum",
            "euro",
            "british-pound-sterling"
        ];
        // [<endsnippet currencies>]
    }
    
    ```

* `indent` is an optional attribute, set to an integer, which indents the snippet by the given number of spaces. This number must be equal than the indentation of the {% include_file %} snippet itself. This is useful to include snippets in lists. For instance:

    ```
    Some list:

        * Item 1
        * Item 2

            {% include_file "{{page.source_url}}/Sample1/Program.cs" syntax="csharp" indent="4" %}

    ```    


## Requirements for snippets

* Use remote snippets (not inline snippets) whenever possible.
* The code must compile without warning.
* The code must be nicely formatted with text width of 120 characters.