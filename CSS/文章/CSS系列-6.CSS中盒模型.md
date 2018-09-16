### CSS系列-6.CSS中盒模型

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/67e1a5fab634f01f1bd7ddfabf8780c5.png)

看firefox这开发者工具怎么感觉比chrome的还牛逼呢...

#### **width**
<length> | <%> | auto(初始值) | inherit

初始值是 **auto** 一句话概括 **尽可能的宽** 高度设置为auto，**则会尽可能的窄**

应用于: **块级元素和替换元素**
继承性: 无
百分数: 相对于**包含块**的width/height
计算值: 对于auto和百分数值，根据指定确定；否则是一个绝对长度，除非元素不能应用该属性(此时为auto)

#### **padding**
<length> | <%>  | inherit
初始值: 未定义
应用于: **所有元素**
继承性: 无
百分数: 相对于**包含块**的width, **不管是padding什么, 都是已父width来的**

[注意]对于普通元素来说，**包含块**就是块级父级元素，对于定位元素来说，包含块是定位父级。所以，普通元素的margin百分比相对于块级父级元素的width，定位元素的margin百分比相对于定位父级的width

这样的话就可以写配合了, 首先移动端不存在绝对的长度, 都是百分比
因为width参考的父级宽度, 但是height是父级高度.

所以此时可以用padding-top + width 实现自适应占位

```html
<body>
	<div class="container">
	</div>
</body>
```

```css
/* padding-top自适应容器 */
.container{
	background-color: royalblue;
	width: 50%; /*div 默认是尽可能宽, 50%取body一半*/
	padding-top: 50%; /*也取body一半*/
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/2dce07079e816b2be4447fd423bf01b1.png)

**应用: 图片填充完整代码**
```html
<body>
	<div class="container placeholder">
		<img src="https://raw.githubusercontent.com/Wangwei0223/markdown_photos/master/test-image/J.fla.png">
	</div>
	<br />
	<div class="container placeholder_">
		<img src="https://raw.githubusercontent.com/Wangwei0223/markdown_photos/master/test-image/J.fla.png">
	</div>
</body>
```
```css
/* padding-top自适应容器 */
.container{
	background-color: royalblue;
	width: 50%; /*div 默认是尽可能宽, 50%取body一半*/
	position: relative;
	overflow: hidden;
}

.placeholder{
	padding-top: 50%; /*也取body一半*/
}

.placeholder_::after{
	content: "";
	display: block;
	padding-top: 100%; /*padding 作用在伪元素是after前的那个类的width*/
}

img{
	position: absolute;
	width: 100%;
	top:0;
}
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/34750b6b0b9b3af8d0b0e0032ec59093.png)

**多个图片**
```css
.container{
	float: left; /*div并排*/
	background-color: white;
	width: 50%; /*div 默认是尽可能宽, 50%取body一半*/
	position: relative;
	overflow: hidden;
	margin-bottom: 1%;
}
.placeholder{
	padding-top: 50%; /*也取body宽一半*/
}
.placeholder_::after{
	content: "";
	display: block;
	padding-top: 100%; /*padding 作用在伪元素是after前的那个类的width*/
}
img{
	position: absolute;
	width: 100%; /*容器一样宽*/
	top:0;
	left: 3%; /*留左边空白*/
}
```
**效果, 可以看出自适应而且图片坏掉的时候有占位**
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/3ef9046aafdd5bf13473959e385eeeee.png)

#### **margin**
值:[<length> | <percentage> | auto {1,4} | inherit
初始值: 未定义
应用于: 所有元素
继承性: 无
百分数: 相对于**包含块**的width

[注意]对于普通元素来说，包含块就是块级父级元素，对于定位元素来说，包含块是定位父级。所以，普通元素的margin百分比相对于块级父级元素的width，定位元素的margin百分比相对于定位父级的width.

**四值顺序**
【1个值】margin: top|right|bottom|left;
【2个值】margin: top|bottom left|right;
【3个值】margin: top left|right bottom;
【4个值】margin: top right bottom left;

摘抄自[小火柴](https://xiaohuochai.site/CSS/layout/box/box.html)

#### border
```css
.test{
	border-style: dashed;
	border-top-width: 10px;
	border-color:red
}
```
#### box-sizing
box-sizing
值: content-box | bordrer-box | padding-box | inherit
初始值: content-box
应用于: 块级元素和替换元素
继承性: 无
[注意1]只有firefox浏览器支持padding-box属性值
