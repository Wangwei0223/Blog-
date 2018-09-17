### CSS系列-8.CSS中的margin重叠

#### margin重叠的条件
1. float为none
2. block元素(不包括inline-block, absolute, float)
3. 只发生在垂直方向上 

#### margin重叠的几种情况
1. 兄弟

```html
<div class="parent">
		<div class="child">
			内容
		</div>
		<div class="child">
			内容
		</div>
</div>
```

```css
.child{
	width: 50%;
	height: 50%; /*高度是内容撑开的, 要记得height是尽可能小*/
	background-color: royalblue;
	margin: 5px 0px;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/44b8dad7781435f6b4aa874a98e9dbdf.png)

2. 父子 子明明有上margin但是没体现出来

```css
.parent{
	background-color: coral;
}
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/4ab036a3edf15440e12344da4a5a0a33.png)

**条件**
相对比相邻兄弟元素margin重叠来说，父子级margin重叠需要满足以下几个条件(以margin-top重叠为例)：
**a、父元素不是BFC元素
b、父元素没有padding-top值
c、父元素没有border-top值
d、父元素和第一个子元素之间没有inline元素分隔**

```css
.child{
	width: 50%;
	height: 50%; /*高度是内容撑开的, 要记得height是尽可能小*/
	background-color: royalblue;
	margin: 5px 0px;
}

.parent{
	/*float: left;/*注意float变BFC的包裹性*/
	background-color: coral;
	overflow: hidden;
	margin: 2px;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/522e8b5cd096dbdf641391954b270de0.png)

把父级改为BFC的话, 可见父子直接的margin回来了.

3. 空的block 可以看出来margin 20px上下 没有撑开

```html
<div class="box">
		<div class="void"></div>
</div>
```

```css
.box{
	background-color: lightgreen;
	overflow: hidden;
}

.void{
	margin: 20px 0;
}
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/53da05fb7fa77a93a4791e4d679be0f4.png)

出现可以直接控制是否要重叠的新属性
```css
-webkit-margin-collapse: <collapse>(默认重叠) | <discard>(取消) | <separate>(分隔)
```
需要注意的是: **身处两个不同BFC的元素margin不重叠(两个蓝色内容块), 但是两个外层BFC(两个桔黄色块直接的margin还是重叠的)**
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/3e6e66a577441663d9298dc48781e38a.png)

