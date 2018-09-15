### CSS系列-2.CSS选择器

#### 写在前面的话
为了就仅仅是展示CSS. 以后统一用如下html结构

```html
<!DOCTYPE html>
<!-- 告诉浏览器解析标准 -->
<html>
    <head>
        <!-- 告诉浏览器解析类型 -->
        <meta http-equiv="content-type" content="text/html;charset=UTF-8">
        <style>

        </style>
    </head>

    <body>

    </body>
</html>
```

#### 一般选择器
##### 通配符选择器
```css
*{color: blueviolet;}
```
```html
<body>
    <p>我是王维</p>
    <h1>h1</h1>
    <h2>h2</h2>
</body>
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/cb2006297f469508019f3240d3433b77.png)

##### 元素选择器
```css
p{color:red}
h1{color:yellow}
h2{color:green}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/45e991461d8e6fecb9cbecfff7906945.png)

##### 类选择器
```css
.div1, .div3{ /*逗号分割同级选择器 div1 div3 同级 */
	background-color: aqua;
}
.div1 .div2{  /*空格分割 特指div1包含的子div2的样式, 不是div1孩子的div2不受影响 */
	background-color: yellow;
}
.div1.div2{ /*必须同时存在class = "div1 div2" */
	background-color:blue;
}
.div2{ /*单独存在class = "div2" */
	background-color: green;
}
```

```html
<div class="div1">
	div1
	<div class="div2">div2</div>
	<div class="div1 div2">div1 div2</div>
</div>
<div class="div2">div2</div>
<div class="div3">div3</div>
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/028cf2dddc644e4f0d91e4def3057875.png)

#####  属性选择器
```css
div[class]{
	background-color: coral;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/2ab3e0181f7d13088b75075cc420440d.png)

可以看出来属性选择器优先级大于类, 但是对 .div.div2和 .div .div2 这种是覆盖不了的(覆盖不了后代和多个class的情况)

#####  兄弟选择器
相邻兄弟:
```html
<div>
	<p class="bro">1</p>
	<p>相邻兄弟</p>
	<p>不相邻兄弟</p>
</div>
```
```css
.bro + p{
	background-color: cornflowerblue;
}
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/705076e8da46268b8abd51a4cbc3f43d.png)

通用兄弟:
```css
.bro ~ p{
	background-color: cornflowerblue;
}
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/234df5b524b56a193905224eb2d7e3ab.png)

#### 伪类和伪元素选择器
##### 伪类选择器
伪类顺序：link-visited-focus-hover-active

1. **静态伪类**
静态伪类只能应用在超链接
```html
<div>
	<a class="first" href="http://www.baidu.com">百度</a>
</div>
```
```css
.first:link{
	color: cyan;
}
.first:visited{
	color: chartreuse;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/e08de520dc50cfbd6c00bfb9a9d5fef2.png)

2. **动态伪类**
严格按照focus - hover - active 不然无效
```css
.dynamic:hover{ /*鼠标悬浮*/
	background-color: crimson;
}
.dynamic:active{ /*正被点击*/
	background-color: blueviolet;
}
.dynamic-input:focus{ /*获得焦点*/
	background-color: aquamarine;
}
```
3. **目标伪类**
原来一直没有搞懂目标伪类的意思
比如下面的代码是在 #target1 成为目标时(url + '#target1'), id为target1的这个元素的样式
比较常用, 比如一个侧边的导航栏, 我点击哪个, 进入哪个对应的页面, 哪个选项变色
```css
#target1:target{
	color: cornflowerblue;
	background-color: blueviolet;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/6a762b22dcfe4af11eab5a64abd1c3f2.png)

4. **UI元素伪类(IE8-不支持)**
```html
<input class="ul"/>
<input class=".checked" type="checkbox" />
```
```css
.ul:enabled{
	background-color: blue;
}
.ul:disabled{
	background-color: burlywood;
}
.checked:checked{
	color: darkcyan; /*只有opera支持*/
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/d4a3fc5c036a0318c0ee1f4c71c6267e.png)

5. **结构伪类**
E:first-child(IE6-不支持) **父元素的第一个子元素,且该子元素是E**，与E:nth-child(1)等同
E:last-child(IE6-不支持) 父元素的最后一个子元素，**且该子元素是E**，与E:nth-last-child(1)等同
**上述情况父子同类**
E F:nth-child(n)     选择父元素的第n个子元素，**父元素是E，子元素是F**
E F:nth-last-child(n)     选择父元素的倒数第n个子元素，**父元素是E，子元素是F**
```html
<div class="parent">
		<div class="structure">第一个孩子</div>
		<div class="structure">第二个孩子</div>
</div>
```
```css
.parent .structure:first-child{
	background-color: burlywood;
}
.parent .structure:nth-child(2){
	background-color: blueviolet;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/afe86369643214c08fbaffb5e0533a1d.png)

##### 伪元素选择器
和伪类的区别是, 伪元素更..细...可以为了方便理解为作用在innerHTML上的

**first-letter, first-line** , **只能作用在块级元素, 且first-line覆盖不了first-letter**

```html
<div>
		<div class="element">@...1111伪元素选择器 <br /> 第二行</div>
</div>
```
```css
.element::first-letter{
	/* 第一个非标点的, 有标点包括标点 */
	color: red;
}

.element::first-line{
	color: blue;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/83758b67cd863730e3b08ed645a6ef05.png)

**before和after选择器, 默认这个伪元素是行内元素, 非块级可用**
```html
<span class="be-af">before 和 after 选择器</span>
```
```css
.be-af::before{
	content: '插在前面的话';
	color: red;
	background-color: black;
}

.be-af::after{
	content: '插在后面的话';
	color: darkorange;
	background-color: black; 
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/c27dd6e49b610a7b8b9618d5c72ac847.png)

**::selection 匹配被用户选择的部分, 目前只支持::**
firefox加 -moz-: **-moz-selection::** **目前只支持 color和background两个属性**
```css
.be-af::-moz-selection{
	content: '选中后添加';
	color: cornflowerblue;
	background-color: black;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/3994d11b59fe6247f8c1be0f11da241b.png)