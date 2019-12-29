# vcommit

[![License](https://img.shields.io/npm/l/vcommit)](https://www.npmjs.org/package/vcommit)
[![NPM Version](https://img.shields.io/npm/v/vcommit)](https://www.npmjs.org/package/vcommit)

Read this in other languages: English | [简体中文](./README_zh-CN.md)

- [Installation](#installation)
- [Usage](#Usage)
- [Configuration](#Configuration)
- [Licence](#Licence)

Validates that your commit message follows this format:

``` bash
<type>(<scope>): <subject>
```

Or without optional scope:

``` bash
<type>: <subject>
```

## Installation

```bash
npm install -g vcommit
```

## Usage
```bash
cd [your project]

# init
vcommit -s

# generate CHANGELOG.md file
npm run changelog
# or 
yarn run changelog
```

other options:

```bash
vcommit [options]

-s, --setup    Generate project configuration.
-V, --version  output the version number
-h, --help     output usage information
```

## Configuration
You can specify options in `.vcmrc`.
It must be valid JSON file.
The default configuration object is:

```json
{
  "types": ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"],
  "scope": {
    "required": false,
    "allowed": ["*"],
    "validate": false,
    "multiple": false
  },
  "warnOnFail": false,
  "maxSubjectLength": 100,
  "subjectPattern": ".+",
  "subjectPatternErrorMsg": "subject does not match subject pattern!",
  "helpMessage": "",
  "autoFix": false
}
```

#### types

These are the types that are allowed for your commit message. If omitted, the value is what is shown above.

You can also specify: `"types": "*"` to indicate that you don't wish to validate types.

#### scope

This object defines scope requirements for the commit message. Possible properties are:

##### 1. required

A boolean to define whether a scope is required for all commit messages.

##### 2. allowed

An array of scopes that are allowed for your commit message.

You may also define it as `"*"` which is the default to allow any scope names.

##### 3. validate

A boolean to define whether or not to validate the scope(s) provided.

##### 4. multiple

A boolean to define whether or not to allow multiple scopes.

#### warnOnFail

If this is set to `true` errors will be logged to the console, however the commit will still pass.

#### maxSubjectLength

This will control the maximum length of the subject.

#### subjectPattern

Optional, accepts a RegExp to match the commit message subject against.

#### subjectPatternErrorMsg

If `subjectPattern` is provided, this message will be displayed if the commit message subject does not match the pattern.

#### helpMessage

If provided, the helpMessage string is displayed when a commit message is not valid. This allows projects to provide a better developer experience for new contributors.

The `helpMessage` also supports interpolating a single `%s` with the original commit message.

#### autoFix

If this is set to `true`, type will be auto fixed to all lowercase, subject first letter will be lowercased, and the commit will pass (assuming there's nothing else wrong with it).

## License

[MIT](https://github.com/iyolee/vcommit/blob/master/LICENSE)