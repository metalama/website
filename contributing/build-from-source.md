---
title: How to Build from Source
toc: true
---

## Requirements

To build Metalama, you'll need:

- Windows
- PowerShell
- .NET SDK (check the specific version in the `global.json` file of each repository).

## Checking out source code

### 1. Clone the repo with symbolic links

Metalama uses symbolic links for `.editorconfig`. Ensure you enable symbolic links when cloning the repo:

```powershell
git clone --config core.symlinks=true https://github.com/metalama/Metalama.git
```

If you encounter numerous formatting warnings during the build, it indicates that symbolic links are not properly enabled. To resolve this, enable symbolic links, delete `.editorconfig`, and execute `git reset --hard`.

### 2. Check out the right branch

For each `YYYY.N` version, there are two branches with different purposes:

- The _release branch_ (e.g., `release/YYYY.N`) corresponds to the last deployed build for this version. This is also the default branch and usually the one you want to check out. In this branch, NuGet dependencies point to the versions that have been pushed to NuGet.org for this specific version.

- The _development branch_ (e.g., `develop/YYYY.N` or `dev/YYYY.N`) contains work in progress. NuGet dependencies in these branches are inconsistent; they typically point to the _previous_ release branch. These branches must be built using a cross-repo local build, as documented below.

For more details, see our [branching strategy](branching).

## Performing a local (development) build

To build Metalama, run this script from PowerShell:

```powershell
./Build.ps1 build
```

The packages are placed into the `artifacts/publish/private` directory.

This command creates _development builds_ to be used on your development machine only. Every time you call `Build.ps1 build`, a new package version number is generated.

## Consuming local builds

Once you have a successful local build, it's easy to use it in any project:

1. Add the following code to your `Directory.Build.props`:

    ```xml
    <Import Path="path/to/Metalama/Metalama.Imports.props">
    ```

2. Use the `$(MetalamaVersion)` property to reference the version number of any package produced by this repo:

    ```xml
    <PackageReference Include="Metalama.Framework" Version="$(MetalamaVersion)"/>
    ```

3. Perform a `dotnet restore` after completing a new local build.

Each time you build the repo using `./Build.ps1 build`, a new version number is generated, so you don't have to worry about clearing the cache and restarting your IDE.

## Running tests

Execute this script from PowerShell:

```powershell
./Build.ps1 test
```

## Performing a local multi-repo build

Metalama consists of several repositories with dependencies between them. When building a repository, you'll want to build dependent repositories as well.

Metalama uses [PostSharp.Engineering](https://github.com/postsharp/PostSharp.Engineering), a custom multi-repo build front-end, to manage dependencies to other repos.

By default, dependency artifacts are downloaded from NuGet for the last build of the chosen version. When performing a multi-repo local build, you need to override the dependency source from NuGet to `local`.

Here's how to proceed:

### 1. Check out all repositories in the same parent directory

For the multi-repo build to work, check out all required Metalama repositories under the same parent directory. For instance:

- `c:\src\Metalama-2025.1\Metalama.Compiler`
- `c:\src\Metalama-2025.1\Metalama`
- `c:\src\Metalama-2025.1\Metalama.Samples`

### 2. Listing the dependencies

To list the dependencies of a repo, execute:

```powershell
./Build.ps1 dependencies list
```

For instance, the `Metalama` repo has two dependencies:

1. `PostSharp.Engineering`
2. `Metalama.Compiler`

### 3. Change the dependency source to `local`

Execute the following command:

```powershell
./Build.ps1 dependencies set local <id>
```

where `<id>` is the name or the ordinal of the dependency.

For example, if you have a custom build of `Metalama.Compiler` and want to build the `Metalama` repo, do this in the `Metalama` repo:

```powershell
./Build.ps1 dependencies set local Metalama.Compiler
```

### 4. Repeat for each repository

You need to repeat this process for all repositories you want to build, starting from the root repository and iterating with the next level of dependencies:

1. Configure local dependencies using `./Build.ps1 dependencies set local`.
2. Build this repo using `./Build.ps1 build`.
3. Proceed to the next repository.

Specifically, you should process the repositories in the following order:

1. `Metalama.Compiler`
2. `Metalama`
3. `Metalama.Premium` (requires an enterprise subscription)
4. `Metalama.Samples`
5. `Metalama.Documentation`

## Building with Docker

We use Docker as a reference build environment to ensure all dependencies are explicit.

The Metalama build requires .NET Framework, which requires a Windows Server Core image.

Follow these steps:

1. Switch to Windows containers.
2. Create the `artifacts` directory:

    ```powershell
    md artifacts
    ```

3. Create the `build-metalama` image:

    ```powershell
    docker build . -t build-metalama
    ```

4. Run the build:

    ```powershell
    docker run -v ".\artifacts:c:/src/artifacts" build-metalama pwsh ./Build.ps1 build
    ```

The packages are then placed into the `artifacts/publish/private` directory.
