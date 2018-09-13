### 剑指offer系列-5.用两个栈来实现一个队列[栈&队列]

#### 题目:
>**用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型**

#### 思路:
复习一下栈: 先进后出 队列:先进先出. 整体没什么难度

#### 代码:
```javascript
var stack_1 = [], stack_2 = [];
/**
 * 
用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。
 * @param {*} node 
 */
function push(node)
{
    // write code here
    stack_1.push(node);
    return stack_1.length;
}
function pop()
{
    // write code here
    return stack_1.shift();
}
```