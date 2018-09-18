### CSS系列-15.CSS中布局之单列定宽单列自适应

#### float + margin

```html
<div>
		<div class="left">内容撑开</div>
		<div class="right">内容撑开</div>
</div>
```
```css
.left{
		background-color: cornflowerblue;
		width: 200px;
		float: left;
}

.right{
		margin-left: 220px;
		background-color: red;
}
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/d531decb5ebcb8d2c64f3c3137033659.png)

#### inline-block

**注意点: 一般来说，要解决inline-block元素之间的间隙问题，要在父级设置font-size为0，然后在子元素中将font-size设置为默认大小**

```css
.inline-left{
	width: 200px;
	display: inline-block;
	background-color: cornflowerblue;
	margin-right: 20px;
	font-size: 16px;
}

.inline-right{
	display: inline-block;
	background-color: red;
	width: calc(100% - 220px);
	font-size: 16px;
}
```

```html
<div style="font-size:0px">
		<div class="inline-left">内容撑开</div>
		<div class="inline-right">内容撑开</div>
</div>
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/63471cad7769dce21fa2141eafb2a4df.png)

#### position:absolute 
**注意父元素高度若是被子元素撑开的话要重新设置**

```html
<div style="position:relative">
		<div class="absolute-left">内容撑开</div>
		<div class="absolute-right">内容撑开</div>
</div>
```

```css
.absolute-left{
	position: absolute;
	background-color: blueviolet;
	width: 200px;
	left: 0;
}

.absolute-right{
	position: absolute;
	background-color: aquamarine;
	left: 220px;
	right: 0;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/9c3d7bc6555eb5c8b2ed7c763df366d8.png)

#### flex
```html
<div style="display:flex">
		<div class="flex-left">内容撑开</div>
		<div class="flex-right">内容撑开</div>
</div>
```

```css
.flex-left{
	width: 200px;
	background-color: royalblue;
	margin-right: 20px;
}

.flex-right{
	flex: 1;
	background-color: crimson;
}
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/a68df3dd410248867fe1be0435f59000.png)

