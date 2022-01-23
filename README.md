# 作用

一个`doscify`的插件，用于控制台指令显示。

# 效果

<center>

![普通](/image/普通样式.jpg)

![simple](/image/simple样式.jpg)

</center>

# 使用

从仓库中下载文件`css/term.css`与`script/term.js`， 然后在`index.html`中的`head`与`body`内分别添加以下内容

```html
<head>
    <link rel="stylesheet" href="./css/term.css">
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
</head>
```

```html
<body>
    <script src="./script/term.js"></script>
</body>
```

# 说明

指令与路径的分隔是靠`"$ "`进行区分，`$`之后还有一个空格。

```javascript
    var parts = lines[i].split('$ ');
```

# 详细配置

`markdown`语法规则：

<center>

![markdown](/image/markdown.jpg)

</center>

`index.html`配置


<center>

![index](/image/index.jpg)

</center>
