### CSS系列-4.CSS中的各种单位

别看单位不起眼, 面试笔试中还真碰见了不少

#### 绝对长度单位

**px**: 像素, 其余的单位甭管相对还是绝对之后通过某种计算都会成为px. 浏览器默认的字体大小为16px

**英寸in(inches)**: 用法为 1in; 96px.

**厘米cm**: 用法为 1cm; 37.8 px

**毫米mm**:用法为 1mm; 3.78px

**1/4毫米 q(quarter-millimeters)**: 用法为 1q;

**点pt(points)**: 用法为 1pt; 1/72 in

**派卡pc(picas)**: 用法为 1pc; 12 pt; 12 pt = 12 / 72 in = 96px * 12 / 72 = 16px **这么看字体默认16px是有点道理的...**

#### 相对长度单位
em & ex & ch & rem
**em**  注意不一定都是父级的font-size, **仅仅是作用在子元素的font-size上1em才是父元素的font-size**. 作用在其他的比如**width, height 上 那么1em是自身的font-size**
```html
<div class="parent">
	parent
		<div class="child">
			child
		</div>
</div>
```
```css
.parent{
	font-size: 20px;
}
.child{
	color: white;
	background-color: black;
	font-size: 2em; /*作用在font-size的时候是父font-size 40px*/
	height: 2em; /*作用在非font-size时是自身的font-size 80px*/
}
```
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/4ea3a6bb0cdd9e65247df0a3d5b8ea68.png)

**rem** 为 html 的 font-size, **之后什么用rem都是参考根**
```css
html{
		font-size: 2rem;
}
```
**ex**
ex是指所用字体中小写x的高度。不同字体x的高度可能不同, 但很多浏览器取em值一半作为ex值

**ch**
ch与ex类似，被定义为数字0的宽度。当无法确定数字0宽度时，取em值的一半作为ch值

#### 视口相关相对长度单位
vh & vw & vmin & vmax
**vh**
视口高度的1/100
**vw**
视口宽度的1/100
**vmin**
视口高 & 宽中小的那个的1/100
**vmax**
视口高 & 宽中大的那个的1/100
