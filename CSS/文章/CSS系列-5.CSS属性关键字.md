### CSS系列-5.CSS中属性关键字
#### initial
各个属性的**默认初始值**

#### **inherit**
表示元素的**直接父元素**对应属性的**计算值**

**color和一些带值的表现不一样**

```html
<div class="parent">
	parent
	<div class="child">
			child
	</div>
	<div class="in">
			<div class="child">
				child
			</div>
	</div>
</div>
```

```css
.parent {
	background-color: black;
	color: red;
	border: 1px solid whblackite;
	padding: 10px;
	width: 100px;
}

.child {
	border: inherit;
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/c783add68bfeaccf7393c8e0e6122f96.png)

**可以看出差别吧**, color, background-color 直接**不管是不是直接父元素(这叫继承)**, 都统统**继承**过来. 
**inherit不是继承的意思, border是不可继承的, 继承都是自动的, inherit只是把直接父元素的拿过来了**

#### **unset**
如果该属性可继承, **那就为inherit, 不可以继承为initial**, 感觉和写一样

#### **all**
all值得说一下是重设属性值
```css
.test {
	all: initial; /*.test类中所有属性设为inital*/
	all: inherit; /*所有属性设置为inherit*/
	all: unset; /*所有属性设置为unset*/
}
```
