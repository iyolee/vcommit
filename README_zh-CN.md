# vcommit

[![License](https://img.shields.io/npm/l/vcommit)](https://www.npmjs.org/package/vcommit)
[![NPM Version](https://img.shields.io/npm/v/vcommit)](https://www.npmjs.org/package/vcommit)

用其他语言阅读：[English](./Readme.md) | 简体中文

- [安装](#安装)
- [使用](#使用)
- [配置](#配置)
- [协议](#协议)

验证您的提交消息是否遵循这种格式：

``` bash
<type>(<scope>): <subject>
```

或者是否遵循这种格式：

``` bash
<type>: <subject>
```

## 安装

```bash
npm install -g vcommit
```

## 使用
```bash
cd [your project]

# 初始化
vcommit -s

# 生成 CHANGELOG.md
npm run changelog
# or 
yarn run changelog
```

其他参数：

```bash
vcommit [options]

-s, --setup    生成项目配置
-V, --version  查看版本信息
-h, --help     查看帮助信息
```

## 配置
您可以在`.vcmrc`中指定选项。
它必须是有效的JSON文件。
默认配置是：

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

这些是提交消息所允许的类型。 如果省略，则该值为上面显示的值。

您还可以指定：`"types": "*"` ，表示不希望验证类型。

#### scope

该对象定义提交消息的范围要求。可能的属性是：

##### 1. required

一个布尔值，用于定义是否所有提交消息都需要一个 `scope` 。

##### 2. allowed

提交消息允许的范围。

您也可以将其定义为“ *”，这是默认值，允许使用任何 `scope` 名称。

##### 3. validate

定义是否验证所提供范围。

##### multiple

定义是否允许多个范围。

#### warnOnFail

如果将其设置为“ true”，则错误将记录到控制台，但是提交仍将通过。

#### maxSubjectLength

控制 `scope` 的最大长度。

#### subjectPattern

可选，接受正则表达式来匹配提交的 `subject`。

#### subjectPatternErrorMsg

如果提供了“subjectPattern”，则在提交的 `subject`与模式不匹配时将显示此消息。

#### helpMessage

如果提供，则提交无效时将显示helpMessage字符串。

#### autoFix

如果将其设置为“ true”，则类型将自动固定为所有小写字母，`subject` 的首字母将小写，并且提交将通过（假设它没有其他问题）。

## 协议

[MIT](https://github.com/iyolee/vcommit/blob/master/LICENSE)