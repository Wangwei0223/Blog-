### 剑指offer系列-2.替换空格[字符串]

#### 题目:
> **请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy**

#### 思路:
正则表达式(以后会专门写一篇博文讲解正则表达式)

#### 代码:
```javascript
/**
 * 请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
 */
function replaceSpace(str)
{
    // write code here
    return str.replace(/ /g, '%20');
}
```