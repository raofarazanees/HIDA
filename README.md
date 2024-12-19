# cdx-seed-application

## Overview

A starter kit for developing with Angular and Angular Material with all the necessary build configurations implemented out of the box with full support for [CDX](http://www.cdx.clarivate.io) based development.

> For all developers, it is recommended to go through the Local Development Environment Setup guide from the website and our [technology and skillsets wiki page](https://wiki.clarivate.io/display/CDX/Technology+Stack+and+Skillset).

## Setup

To get started, please follow the our [guide](https://cdx.clarivate.io/guides/starting-a-new-app) on Starting a New UI Application.

## CDX

The CDX comes pre-installed in this project, including default Clarivate branded styling and the Auth and Analytics components.  You can find resources on maintaining your project on the CDX website in our [Maintainer's Handbook.](https://cdx.clarivate.io/guides/maintainers-handbook)

## Project Structure

The CDX Seed project structure is mostly inspired by the [Angular style guide][]. It deviates a bit to accommodate the scalability required by larger applications. Ultimately, a project's structure should be based on your application's needs. Whatever you choose, be consistent.

```shell
<project root>/
|
├── src/
|   ├── app/
|   |   ├── core/
|   |   |   ├── ...
|   |   |   ├── core-http-interceptor.providers.ts
|   |   |   ├── core.config.ts
|   |   |   ├── core.module.ts
|   |   |   ├── services/
|   |   |   |   ├── singleton.service.ts|spec.ts
|   |   |   |   └── ...
|   |   |   └── factories/
|   |   |       ├── analytics-config.factory.ts
|   |   |       └── ...
|   |   |
|   |   ├── shared/
|   |   |   ├── ...
|   |   |   ├── shared.module
|   |   |   ├── pipes/
|   |   |   |   ├── safe-src.pipe.ts|spec.ts
|   |   |   |   └── ...
|   |   |   └── components/
|   |   |       └── ...
|   |   |
|   |   ├── services/
|   |   |   ├── ...
|   |   |   └── hello/
|   |   |       └── hello.service.ts|spec.ts
|   |   |
|   |   ├── features/
|   |   |   ├── ...
|   |   |   ├── header/
|   |   |   |   ├── header.component.ts|html|scss|spec.ts
|   |   |   |   └── header.module.ts
|   |   |   ├── layout/
|   |   |   |   └── ...
|   |   |   └── footer/
|   |   |       ├── footer.component.ts|html|scss|spec.ts
|   |   |       └── footer.module.ts
|   |   |
|   |   └── pages/
|   |   |   ├── home/
|   |   |   |   ├── home.component.ts|html|scss|spec.ts
|   |   |   |   └── home.module.ts|routing.module.ts
|   |   |   ├── about/
|   |   |   |   └── ...
|   |   |   └── unauthorized/
|   |   |       ├── unauthorized.component.ts|html|scss|spec.ts
|   |   |       └── unauthorized.module.ts|routing.module.ts
|   |   |
|   |   ├── app.component.ts|html|scss|spec.ts
|   |   ├── app.module.ts
|   |   └── app-routing.module.ts
|   |
|   ├── ...
|   └── index.html
|
├── ...
├── node_modules/
├── angular.json
└── package.json
```

### Core

The _core/_ folder's `CoreModule` is imported once in the `AppModule` and never again by other modules. The `CoreModule` ensures this by throwing an error when it is imported more than once. The `CoreModule` handles any logic required during app initialization immediately after the bootstrap phase.

> **Note:** Services provided in the `CoreModule` have only one instance that last over the lifetime of the application _(even for lazy-loaded modules)_. E.g. `AuthenticationService` and `AnalyticsService`

### Shared

The _shared/_ folder should include a `SharedModule` that declares components, directives, and pipes only when those items will be re-used and referenced by the components declared in other feature modules.

1. A shared component should be a basic building block used by other modules (features/pages). E.g. button component
1. Avoid providing services in the `SharedModule`, since you don't want each module to have it's own instance of singleton services. These services should be provided in the `CoreModule`
1. All modules required by the assets in the `SharedModule`; for example, `CommonModule`, `FormsModule`, `ReactiveFormsModule` and other (3rd-party) modules you need
1. What if my module only requires a small subset of components declared in the `SharedModule`?

    - From the [docs](https://angular.io/guide/ngmodule-faq#what-if-i-import-the-same-module-twice), it's not a problem

### Pages (lazy-loaded)

A module in the _pages/_ folder contains a routing component, its child components, and their related assets and modules. A page module is distinct from other modules in that it is a lazy-loaded part of the application.

### Features

With feature modules, you can keep code related to a specific functionality or feature separate from other code. Feature modules help you partition the app into focused areas, while still collaborating with the `RootModule` and other modules e.g. `SharedModule` (for dependencies). The `HeaderModule` and `FooterModule` fits this description, since they are self-contained and don't share real-estate with any other component.

The [Angular style guide][] suggests using the "Folders-by-feature structure" to keep components flat (not in a dedicated folder) to reduce folder nesting. However, organizing feature modules under a _feature/_ folder makes more sense for large applications.

### Services (optional)

The _services/_ folder should only include reusable, but **stateless** services that provide a single responsibility; that is, the consumers of the service aren't impacted by new instances. Services with utility methods generally fall into this category.

The `HelloService` is stateless, since it doesn't store mutable properties, and exposes a `sayHello` method that expects a `string` value and returns a new `string`.

```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class HelloService {
  sayHello(name: string): string {
    return `Hello ${name}`;
  }
}
```

Singleton services that are provided once for the entire application or in a particular feature module, should be organized inside the _core/services/_ and _feature/_ folders respectively.

## Workflows

### Development

These are the following `npm` scripts that can be run to automate certain development related workflows:

- `yarn develop` - start a local development server (JiT)
- `yarn test` - run tests.  Add `--watch` flag for "TDD" mode
- `yarn build` - generate a production build (AoT)
- `yarn serve` - run a production build and serve it locally

## Release Management

While most of the process is automated, requiring limited manual involvement, it is worth detailing the different release use cases and what is happening under the hood.

### Environment

Certain assumptions can be made about the Jenkins build environment.  Please review them in detail
[here](https://thelens.clarivate.com/docs/DOC-3346814#jive_content_id_ReleaseManagement)

### Pre-Release Pipeline (Stable Job - For QA)

- Incremental pre-release candidate builds are intended for QA for testing as part of the week's release.
- All QA releases should be built through the project's respective Stable job in Jenkins.
- The project's version will get auto-bumped incrementally using a prerelease convention.  (e.g. `x.y.z-rc.N`) and also CDNize the build (e.g. use CloudFront URLs in JS / CSS asset paths.).

### Release Pipeline (Merge / Release / Stable Job - For Production)

- Production should just be a matter of following the documented release procedure for all applications, which is to run the Merge job (which then triggers the Release job with params, which then triggers the Stable job with params).
- The project's version (_package.json_, _gradle.properties_, etc) will be set to whatever `$APPLICATION_VERSION` input is provided by the Release Manager at the time the Merge job is run.
- In this pipeline, there is no incremental prerelease bump, the Release job sets the value of **version** in
_package.json_ and the Stable job will CDNize the build.

[//]: # (Resources)

[Angular style guide]: https://angular.io/guide/styleguide
[feature modules]: https://angular.io/guide/feature-modules
