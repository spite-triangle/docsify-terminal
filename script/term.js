! function () {
    var generateSpan = function (className, content) {
        return `<span class="${className}">${content}</span>`;
    };

    // 复制按钮 
    var btn = ' <i class="fa fa-clipboard term_btn" data-command="text"></i> ';

    // 按钮提示
    window.$docsify.plugins = [].concat(window.$docsify.plugins, function (hook, vm) {
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
 
            if (parts.length > 1) {
                var command = parts[0];
                var annotation = content.substring(command.length + 2, content.length);
                return generateSpan('term_command', command) + btn.replace('text', command) + generateSpan('term_annotation', '//' + annotation);
            } else {
                return generateSpan('term_command', parts[0]) + btn.replace('text', parts[0]);
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
                // 拆分行
                var lines = pre.childNodes[0].innerHTML.split('\n');
                var convertedText = "";
                var outputText = "";
                var hasOutputText = false;
                var i = 0;
                for (i; i < lines.length; i++) {
                    var parts = lines[i].split('$ ');
                    
                    // 结果还是指令
                    if (parts.length > 1) {
                        // 检测到输出，将上一次的保存
                        if(hasOutputText == true){
                            if(outputText.length > 0){
                               convertedText = convertedText + '<code class = "output">' + outputText + "</code>";
                               outputText = "";
                            }
                            hasOutputText = false;
                        }

                        // 指令
                        var path = parts[0];
                        var command = lines[i].substring(path.length + 2, lines[i].length);
                        convertedText = convertedText + dealPath(path) + "$ " + dealCommand(command) + '</br>';
                    } else {
                        hasOutputText = true;
                        // 结果
                        outputText = outputText + lines[i] + '\n';
                    }
                }
                
                // 将最后一次输出保存
                if(outputText.length > 0){
                    convertedText = convertedText + '<code class = "output">' + outputText + "</code>";
                }
                
                pre.innerHTML = '<div class="cycles"> <div class="cycle term_cycle1"> </div> <div class="cycle term_cycle2"> </div> <div class="cycle term_cycle3"> </div>  </div> <code class="lang_term">' + convertedText + '</code>';
            });
        });

    });

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