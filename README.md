# 作用

`doscify`的插件，控制台样式显示。

# 效果

<center>

![普通](/image/普通样式.jpg)

![simple](/image/simple样式.jpg)

</center>

# 使用

在`index.html`中的`head`与`body`内分别添加以下内容

```html
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/spite-triangle/docsify-terminal@latest/css/term.css"/>
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
```

```html
    <script src="https://cdn.jsdelivr.net/gh/spite-triangle/docsify-terminal@latest/script/term.min.js"></script>
```

# 说明

```txt
\`\`\`term
user@path$ command // annotation
\`\`\`
command output
```

`user@path`与`command`的分隔是靠`"$ "`进行区分，`$`之后还有一个空格，且在 `command` 中支持 `\/` 转义

```javascript
    var parts = lines[i].split('$ ');
```

# 详细配置

- `markdown`语法规则：

    <center>

    ![markdown](/image/markdown.jpg)

    </center>

- `index.html`配置


    <center>

    ![index](/image/index.jpg)

    </center>
