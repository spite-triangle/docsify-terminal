! function () {

    var HtmlUtil = {
        /*1.用正则表达式实现html转码*/
        htmlEncodeByRegExp:function (str){  
             var s = "";
             if(str.length == 0) return "";
             s = str.replace(/&/g,"&amp;");
             s = s.replace(/</g,"&lt;");
             s = s.replace(/>/g,"&gt;");
             s = s.replace(/ /g,"&nbsp;");
             s = s.replace(/\'/g,"&#39;");
             s = s.replace(/\"/g,"&quot;");
             return s;  
       },
       /*2.用正则表达式实现html解码*/
       htmlDecodeByRegExp:function (str){  
             var s = "";
             if(str.length == 0) return "";
             s = str.replace(/&amp;/g,"&");
             s = s.replace(/&lt;/g,"<");
             s = s.replace(/&gt;/g,">");
             s = s.replace(/&nbsp;/g," ");
             s = s.replace(/&#39;/g,"\'");
             s = s.replace(/&quot;/g,"\"");
             return s;  
       }
    };

    var generateSpan = function (className, content) {
        return `<span class="${className}">${HtmlUtil.htmlEncodeByRegExp(content)}</span>`;
    };

    // 复制按钮 
    var btn = ' <i class="fa fa-clipboard term_btn" data-command="text"></i> ';

    // 按钮提示
    window.$docsify.plugins = [].concat( function (hook, vm) {
        // 处理路径
        var dealPath = function (content) {
            // 划分用户名与路径
            var parts = content.split(':');
            return generateSpan('term_user', parts[0]) + ':' + generateSpan('term_path', parts[1]);
        };
        
        // 处理指令
        var dealCommand = function (content) {
            // 划分用户名与路径
            var parts = content.split('//');
            
            // command 中识别 \/ 转义符号
            var command = parts[0];
            command = command.replace(/\\\//g, '/');

            if (parts.length > 1) {
                var annotation = content.substring(command.length + 2, content.length);
                return generateSpan('term_command', command) + btn.replace('text',  command) + generateSpan('term_annotation', '//' + annotation);
            } else {

                return generateSpan('term_command', command) + btn.replace('text', command);
            }
        };
        var getElementByAttr = function (tag, dataAttr, reg) {
            var aElements = document.getElementsByTagName(tag);
            var aEle = [];
            for (var i = 0; i < aElements.length; i++) {
                var ele = aElements[i].getAttribute(dataAttr);
                if (reg.test(ele)) {
                    aEle.push(aElements[i]);
                }
            }
            return aEle;
        };

        hook.doneEach(function () {
            // 查找所有的term
            var pres = getElementByAttr('pre', 'data-lang', /term/);
            // 遍历所有的term
            pres.forEach(function (pre, index) {

                // 修改 pre 标签
                pre.setAttribute('class', 'window_term');
                
                // 修改 code 标签
                // 1. 将 innerHTML 中的 tag 删除
                // 2. 将转义字符还原
                // 3. 拆分文本
                var lines = HtmlUtil.htmlDecodeByRegExp(pre.childNodes[0].innerHTML.replace(/<[^>]*>/g, "")).split('\n');
                var convertedText = "";
                var outputText = "";
                var hasOutputText = false;
                var i = 0;
                var pathRegx = /.*@.*:.*/;
                for (i; i < lines.length; i++) {
                    var parts = lines[i].split('$ ');

                    
                    // 结果还是指令
                    if (parts.length > 1) {
                        // 指令
                        var path = parts[0];
                        var command = lines[i].substring(path.length + 2, lines[i].length);
                        
                        // 检测 path 格式 xxx@xxx:xxx
                        if(pathRegx.test(path)){
                                // 检测到输出，将上一次的保存
                                if(hasOutputText == true){
                                    if(outputText.length > 0){
                                    convertedText = convertedText + '<code class = "output">' + outputText + "</code>";
                                    outputText = "";
                                    }
                                    hasOutputText = false;
                                }
        
                                convertedText = convertedText + dealPath(path) + "$ " + dealCommand(command) + '</br>';
                                continue;
                        }
                    }

                    hasOutputText = true;
                    // 结果，特殊字符转义
                    outputText = outputText +  HtmlUtil.htmlEncodeByRegExp(lines[i]) + '</br>';
                }
                
                // 将最后一次输出保存
                if(outputText.length > 0){
                    convertedText = convertedText + '<code class = "output">' + outputText + "</code>";
                }
                
                pre.innerHTML = '<div class="term_title"> <div class="cycle term_cycle1"> </div> <div class="cycle term_cycle2"> </div> <div class="cycle term_cycle3"> </div>  </div> <code class="lang_term">' + convertedText + '</code>';
            });
        });

    }, window.$docsify.plugins);

    // 按钮提示
    window.$docsify.plugins = [].concat(window.$docsify.plugins, function (hook, vm) {
        hook.doneEach(function () {
            // 获取所有的指令按钮
            var term_btns = document.querySelectorAll('.term_btn');
            // 遍历所有按钮
            term_btns.forEach(function (btn,index){
                btn.addEventListener('click', function(e){

                    // 防止多次点击
                    if(e.target.className == 'fa fa-thumbs-up term_btn') return;

                    // 将指令复制到剪贴板
                    var aux = document.createElement("input"); 
                    aux.setAttribute("value", e.target.getAttribute("data-command")); 
                    document.body.appendChild(aux); 
                    aux.select();
                    document.execCommand("copy"); 
                    document.body.removeChild(aux);

                    // 修改图标
                    e.target.setAttribute('class','fa fa-thumbs-up term_btn');

                    // 定时器改回来
                    setTimeout(()=> {
                        e.target.setAttribute('class','fa fa-clipboard term_btn');
                    },500);

                });
            });
        });

    });
}();