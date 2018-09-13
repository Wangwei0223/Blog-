### 杂谈-我写的MD怎么就变成了html?

托知昊的福也算把积攒的干货有机会写成博文给老铁们分享, 今天用了用wordpress, 发现还是比原先直接写在github里顺眼一点, wordpress也是支持md文档格式的, 输出就是html文件.

正好我原来自己搭博客的时候也是先写成md, 在转换成html.., 所以今天就说说我在点击发布的时候发生了什么.

是首先祭出半年前写的MD转HTML的插件..基本都快忘了怎么写了...所以说写完得赶紧记录下来...不然真是一时爽..之后全忘干净...

```javascript
const fs = require('fs');
const path = require('path');
const md = require('marked'); //npm install marked
const browser_sync = require('browser-sync');

const target = path.join(__dirname, process.argv[2] || './Network.md');
var filename = target.replace(path.extname(target), '.html');
//通过browsersync 创建一个文件服务器
browser_sync({
    server: path.dirname(target),
    index: path.basename(filename)
});

fs.watchFile(target, (curr, prev) => {
    if (curr.mtime === prev.mtime) {
        return false;
    }
    fs.readFile(target, 'utf8', (err, data) => {
        if (err) throw err;
        var html = md(data);
        fs.readFile(path.join(__dirname, './github.css'), (err, css) => {
            if(err) throw err;
            html = template.replace('{content}', html).replace('{style}', css);
            fs.writeFile(filename, html, 'utf8', () => {
                browser_sync.reload(path.basename(filename));
                console.log('@update' + new Date());
            });
        });
    });
});

const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Markdown to Html</title>
    <style>{style}</style>
</head>
<body>
    <div class='vs'>
    {content}
    </div>
</body>
</html>`;
```
首先得介绍一下 browser_sync 这个东西..顾名思义阿, 就是我写东西可以事实地反应到html的变化, 
比如我们写md文档, 右边窗口就事实地把html文件给我们展示出来了.

```javascript
browser_sync({
    server: path.dirname(target),
    index: path.basename(filename)
});
```
首先这就是一个文件服务, 自带的api是reload, 猜到了吧, 就是重新载入我们写的文件.
我们用node.js自带的fs文件模块, 监听我们目标md文件的变化.

md模块 就是把md直接按各种md中的标签**直接**转为对应的html标签...为什么说直接...你转个table就明白了..
```javascript 
const md = require('marked'); //npm install marked
```
那怎么就变成漂漂亮亮的html了呢, 起始就是替换了style文件, 这里读取的是github的css, 所以生成后就和github里写md文件的样式一样啦
仔细研究一下这插件你会发现起始非常简单, 当然原理是这样, 写成可以直接使用的还是有很多可以改进的..

包括频繁读写, 缓存区等等问题, 当然我也不会...菜是原罪,的确不知道这种知识从哪里摄取.