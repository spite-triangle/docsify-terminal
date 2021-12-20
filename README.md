# 作用

一个`doscify`的插件，用于控制台指令显示。

# 效果

<center>

![普通](/image/普通样式.jpg)

![simple](/image/simple样式.jpg)

</center>

# 使用

需要在`index.html`文件中的`head`与`body`下分别添加以下内容

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