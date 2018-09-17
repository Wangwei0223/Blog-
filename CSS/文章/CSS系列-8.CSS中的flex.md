### CSS系列-8.CSS中的flex

下面一段摘抄自:[小火柴](https://xiaohuochai.site/CSS/layout/box/flex.html)

使用flex布局实现上是使元素FFC化(flex formatting context伸缩格式化上下文)，FFC是普通流的一种。而浮动流和定位流以及CSS其他属性对FFC是有影响的，主要表现在以下几点:
　　**[1]float、clear和vertical-align属性在伸缩项目上没有效果**
　　[2]伸缩容器的margin与其内容的margin不会重叠
　　[3]text-align属性在伸缩容器上没有效果，因为其只可应用于块级block容器
　　[4]另外，columns属性伸缩容器上没有效果

**display的父元素下面的子元素你用float没有用, position有用**

**flex盒子的结构**
![](https://pic.xiaohuochai.site/blog/CSS_grammer_flex.png)

**伸缩流方向**
**flex-direction: row[默认] | row-reverse | column | column-reverse**

```css
.parent{
	display: flex;
	background-color: aqua;
	flex-direction: row;
}

.child{
	height: 50px;
	flex: 1;
}
```

```html
<div class="parent">
		<div class="child" style="background-color:pink">
		</div>
		<div class="child" style="background-color:red">
		</div>
		<div class="child" style="background-color:black">
		</div>
		<div class="child" style="background-color:blue">
		</div>
</div>
```

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/3da305374c6f1f99ff5626f7af40cf97.png)

注意**flex-direction: column** 时候有坑
```css
.parent{
	display: flex;
	background-color: aqua;
	flex-direction: column;
}

.child{
	height: 50px;
	/*flex: 1; 不能加flex 1不然无效*/ 
}
```
**伸缩流换行**
**flex-wrap: nowrap[默认] | wrap | wrap-reverse**

```css
.parent{
	display: flex;
	background-color: aqua;
	flex-direction: row;
	flex-wrap: wrap;
}

.child{
	height: 50px;
	width: 50%; /*设置宽并且4个元素超过100%才会产生换行, 不能flex:1 不然平分剩余空间永远没换行*/
}
```

**伸缩流简写**
**flex-flow: <flex-direction> | <flex-wrap>**

**主轴对齐(有额外的宽度才能看见点效果)**
**justify-content:flex-start[默认] | center | flex-end | space-between | space-around**

**侧轴对齐(flex容器上定义高度, 不然高度撑开是没有效果的)**
**align-items:flex-start | center | flex-end | baseline | stretch[默认]**

```css
.parent{
    display: flex;
    background-color: aqua;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100px;
}

.child{
    height: 50px;
    width: 22%;
}
```

**伸缩项目**

**align-self:自身对齐**

**flex-basis:自身初始宽度**

**flex-grow:容器剩余宽为正数时可以分配的比例**

**flex-shrink:容器剩余宽为负数时可分配的比例**

**flex是简写 伸缩性:是扩展比率、收缩比率和伸缩基准值的缩写**

flex: none => flex: 0 0 auto;//表示宽度为原始宽度，不发生扩展或收缩
flex: auto => flex: 1 1 auto;//表示除了占据原先的宽度外，还要分配剩余宽度(包括扩展或收缩)
flex: 0 => flex: 0 1 0%;//表示收缩为最小宽度
flex: 1 => flex: 1 1 0%;//表示分配所有宽度(包括扩展或收缩)
flex: 0 auto => flex: 0 1 auto;(默认值)//表除了占据原先的宽度外，还要分配剩余宽度(只收缩，不扩展)
flex: 0 1 => flex: 0 1 0%;