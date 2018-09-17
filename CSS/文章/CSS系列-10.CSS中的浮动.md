### CSS系列-10.CSS中的浮动

#### float

浮动元素脱离普通流，然后按照指定方向，向左或者向右移动，碰到父级边界或者另外一个浮动元素停止
值: left | right | none | inherit
初始值: none
应用于: 所有元素
继承性: 无

**形成包裹性且后面元素给前面让位**

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/64cf3569ae459e7b6c2c73f169a6bd36.png)

#### 清浮动
**clear:both**
clear 清除
值: left | right | both | none | inherit
初始值: none
应用于: 块级元素(块级元素指block元素，不包括inline-block元素)
继承性: 无

**left:左侧不允许存在浮动元素
right:右侧不允许存在浮动元素
both:左右两侧不允许存在浮动元素
none:允许左右两侧存在浮动元素*

```html
<div class="parent">
		parent
</div>
<div class="child">
		child
</div>
```

```css
.parent{
	float: left;
	background-color: aqua;
	color: red;
}

.child{
	color: white;
	background-color: black;
	clear:both; /*是在child这里清浮动, 意思是child两边不存在浮动元素*/
}
```
**但是parent的包裹性还在**

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/2b737453413505319ce090ddf5e4d360.png)

**触发包含块的BFC**
```html
<div style="overflow:hidden">
		<div class="parent">
			parent
		</div>
</div>

<div class="child">
	child
</div>
```

**::after清除浮动, 一定要注意after写在哪个元素上**
```html
<div class="clearfix">
		<div class="parent">
			parent
		</div>
		<div class="parent">
			parent
		</div>
</div>

<div class="child">
	child
</div>
```

```css
.clearfix::after{
	content: ""; 
	display: block; 
	clear: both; 
}

.clearfix {
	/* 触发 hasLayout */ 
	zoom: 1; 
}
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/a3f46834134552522f2de7fc6e753741.png)

