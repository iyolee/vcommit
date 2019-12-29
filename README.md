# vcommit

### 配置文件
##### types
提交消息所允许的类型

##### warnOnFail
如果将此设置为true，错误将记录到控制台，但是提交仍将通过。

##### maxSubjectLength
这将控制对象的最大长度。

##### subjectPattern
接受一个RegExp来匹配提交消息主题。

##### subjectPatternErrorMsg
如果提供subjectPattern，则在提交消息主题与模式不匹配时将显示此消息。

##### helpMessage
如果提供，则提交消息无效时将显示helpMessage字符串。

##### autoFix
如果将其设置为true，则类型将自动固定为所有小写，主题的首字母将小写，并且提交将通过（假设它没有其他问题）。