### CSS系列-13.CSS中布局之垂直居中

#### line-height 针对单行文本

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/e1ee444f102622886fae2b1c5e27f430.png)

#### vertical-align 

**注意vertical-align 只对行内元素有效，对块级元素无效, 要用用display:table-cell**

```html
<p>table-cell + vertical-align</p>
<div class="vertical-middle-parent">
		<div class="vertical-middle-item"></div>
</div>
```
```css
.vertical-middle-parent{
	width: 100px;
	height: 300px;
	background-color: coral;
	display: table-cell;
	vertical-align: middle;
}

.vertical-middle-item{
	width: 30%;
	height: 30%;
	background-color: cornflowerblue;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/17e97732bb1f660881f25cc9aca72c3c.png)

#### absolute
和水平居中一样, 不再赘述

#### flex
**align-items: center**