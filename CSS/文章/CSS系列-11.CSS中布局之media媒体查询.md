### CSS系列-11.CSS中布局之media媒体查询

**用在style标签上 media="screen"**

**screen         计算机屏幕（默认值)
tty            电传打字机以及使用等宽字符网格的类似媒介
tv             电视类型设备（低分辨率、有限的屏幕翻滚能力）
projection     放映机
handheld       手持设备（小屏幕、有限的带宽）
print          打印预览模式 / 打印页
braille        盲人用点字法反馈设备
aural          语音合成器
all            适合所有设备**

#### 媒体属性
**媒体属性是CSS3新增的内容，多数媒体属性带有“min-”和“max-”前缀，用于表达“小于等于”和“大于等于”**

#### @media(min-width:800px) || @media(max-width:800px)

```html
<div class="parent">
        parent
	<div class="child">
        child
     </div>
</div>
```

```css
/* 宽度大于800px时显示的样式 */
@media (min-width:800px) {
	.parent {
		height: 100px;
		width: 100px;
		background-color: lightgreen;
	}
}

/* 宽度小于800px时显示的样式 */
@media (max-width:800px) {
	.parent{
		height: 100px;
		width: 100px;
		background-color: red;
	}
}
```
**@media(min-height:800px)**
向高度大于800px的可视区域的设备应用样式表

**min-device-width / min-width 区别**
**min-device-width**真实屏幕宽
**min-width**渲染区域: 缩放有效

