<p align="center">
  <img alt="HestiaLabs" src="https://hestialabs.org/assets/img/hestialabs-logo+text.svg" width="480">
</p>

<br>

<p align="center">
  <a href="https://lerna.js.org/"><img alt="Lerna" src="https://img.shields.io/badge/Lerna-3E3E3E?style=for-the-badge&logo=lerna&logoColor=white"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"></a>
  <a href="https://webpack.js.org/"><img alt="webpack" src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white"></a>
  <a href="https://eslint.org"><img alt="ESLint" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"></a>
  <a href="https://prettier.io/"><img alt="Prettier" src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"></a>
  <a href="https://babeljs.io/"><img alt="Babel" src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white"></a>

</p>

# Instructions

Read the following instructions carefully before getting started.

## Setup

Install all packages:

```sh
npm install
```

Set up pre-commit hooks:

```
npm run prepare
```

## Develop

Start developing:

```sh
npm run dev
```

This runs webpack in watch mode, building the packages once and then watching all files for changes. If one file is updated, the code is recompiled so you don’t have to run the full build manually.

## Build

Build all packages:

```sh
npm run build
```

## Test

Run tests for all packages:

```sh
npm test
```

Run test for one or more packages:

```sh
npm run test:ts-node -- <package1> [<package2> ...]
```

## Package management

This section explains how packages are created and updated

### Create a new package

1. Create a new folder in the `packages` directory. By convention, the folder name is also the package name.

2. Add a `src` folder with the required `index.ts` entry file.

3. Add a `package.json` that looks like this:

```json
{
  "name": "@hestiaai/<NAME>",
  "version": "0.0.0",
  "main": "dist/index",
  "type": "module",
  "files": ["dist"],
  "repository": {
    "type": "git",
    "url": "https://github.com/hestiaai/hestialabs",
    "directory": "packages/<NAME>"
  },
  "publishConfig": {
    "access": "public"
  },
  "author": "",
  "license": "UNLICENSED"
}
```

Replace `<NAME>` with the package name.

4. Add the package name to the `experiences` Array in [dev.json](https://github.com/hestiaAI/hestialabs-experiences/blob/master/config/dev.json#L2).

5. Add an export statement for the package in [`packages.ts`](./packages.ts). This ensures [tests](./test.ts) are run for the package.

6. Re-link the packages workspace to the `hestialabs-experiences` repo:

```sh
npm link --workspaces
cd ../hestialabs-experiences
npm install
```

### Authenticate to GitHub Packages

Follow these instructions to authenticate to GitHub Packages with a personal access token (PAT).

1. [Create a PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Select the scopes (permissions) `write:packages` and `delete:packages`. Never share your PAT with anybody. You may also use the shared PAT for the organization.

2. [Authenticate](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token). The simplest recommended way is to add your PAT to your `~/.npmrc` file in your **home directory**. Your `.npmrc` should look like this:

```
//npm.pkg.github.com/:_authToken=TOKEN
@hestiaai:registry=https://npm.pkg.github.com
```

**IMPORTANT SECURITY NOTE**

Your personal token is a secret that must not be shared with others. The shared organization token may be shared internally with relevant personnel. Never add the token to the `.npmrc` file in the repository. Tokens must never be pushed to GitHub.

### Bump version of packages changed since the last release

```sh
npm run lerna:version
```

[Documentation of lerna’s `version` command](https://github.com/lerna/lerna/tree/main/commands/version)

You can pass extra arguments to the npm script:

```sh
npm run lerna:version -- --no-push
npm run lerna:version -- --force-publish=*
```

### Publish packages

```sh
npm run lerna:publish
```

[Documentation of lerna’s `publish` command](https://github.com/lerna/lerna/tree/main/commands/publish)

# Sources

- [Lerna docs](https://github.com/lerna/lerna)
- [webpack docs](https://webpack.js.org/concepts/)
- [TypeScript docs](https://www.typescriptlang.org/docs/)
- [Working with the npm registry - GitHub Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)

# Notes

- Passing arguments from the command line to npm scripts works in PowerShell if you [enclose the `--` in quotation marks](https://stackoverflow.com/a/65530483/8238129). For example,

```sh
$ npm run lerna:version "--" --force-publish
```
