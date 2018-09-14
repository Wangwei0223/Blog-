### CSS系列-1.引入CSS
赶紧更CSS..
昨天做了套题发现自己的裸写CSS能力已经菜成瓜皮...
故不可忍..开更, 从头开始...
不得不说在爱奇艺2个月只写了JS...CSS能力得到了急速退化..

废话不多说, 开更

#### CSS - 引入CSS

##### 引入CSS的方法:
1. @import引用方法
```html
<style type="text/css" media="screen">
@import url("http://www.taobao.com/home/css/global/v2.0.css?t=20070518.css") all;
</style>
```
2. HTML中的引用方法
```html
<head>
<link rel = "stylesheet" type="text/css" href = ""your css url" />
</head>
```
3. 内联
```html
<div style="width:600px;"></div>
```
4. 在页面中直接写入样式
```html
<style>
</style>
```

##### 外部引入CSS的区别:
1. 内联与其他两个有优先级关系.
2. @import加载顺序是在link之后, 故后者可能会覆盖前者. 其他方面, @import的时候, 页面先加载, CSS出来的慢与link, 可能出现不好的体验.
3. 如果用dom操作, 用JS操作dom的style, 只能用link去引用
4. @import是CSS 2.1支持的, 一些老浏览器如IE5以下不支持
5. link标签除了可以加载CSS外，还可以做很多其它的事情，比如定义RSS，定义rel连接属性等，根据media改变, alternate stylesheet 备选, @import就只能加载CSS了.也可以media 控制
6. 其实link和@import的最根本区别就是，**link是一个html的一个标签，而@import是css的一个标签**
7. 服务对象不一样, @import服务于css文件, link服务于html文件. 这么讲可能不直观..比如说你有10个页面, 每个页面都引用了10个css文件..那么用link一个个写会变得很冗长, 所以可以只引用一个css, 这个css中@import了其余的css.

##### 内部引入CSS的区别:
style标签写在head里面 or 外面?
写在head里面先加载

##### 新增scoped, 只在包含块内生效
![](https://upload-images.jianshu.io/upload_images/2147008-72537759d14a6c21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/604/format/webp)


