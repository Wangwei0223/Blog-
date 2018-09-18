### CSS系列-12.CSS中布局之水平居中

#### margin: auto

```html
<!-- 水平居中 -->
<p>水平居中</p>
<div class="jusitify-middle-parent">
		<div class="jusitify-middle-item">
		</div>
</div>
```

```css
.jusitify-middle-parent{
	width: 200px;
	height: 300px;
	background-color: cadetblue;
	text-align: center;
}

.jusitify-middle-item{
	width: 30%;
	height: 30%;
	background-color: royalblue;
	margin: auto;
}
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/e94142f372e8e2cefb82ba9b1472841a.png)

#### text-align

```html
<p>在父元素中设置text-align:center实现行内元素水平居中</p>
<div class="jusitify-middle-parent">
		<div class="jusitify-middle-item-1">
			变为inline之后必须内容撑高
		</div>
</div>
```

```css
.jusitify-middle-parent{
	width: 200px;
	height: 300px;
	background-color: cadetblue;
	text-align: center;
}
.jusitify-middle-item-1{
		background-color: royalblue;
		display: inline;
}
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/f65956888ef0836a7fa8e6e282f3df06.png)

#### position:absoulte
```html
<p>position</p>
<div class="jusitify-middle-parent">
		<div class="jusitify-middle-item-2">
		</div>
</div>
```
```css
.jusitify-middle-item-2{
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/e94142f372e8e2cefb82ba9b1472841a.png)

