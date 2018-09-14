### 剑指offer系列-48.不用加减乘除做加法[位运算]

#### 题目:
>**写一个函数，求两个整数之和，要求在函数体内不得使用+、-、* 、/四则运算符号**

#### 思路:
位运算, 我是还没完全明白

#### 代码:
```javascript
/**
 * 写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。
 * @param {*} n 
 */

function Add(num1, num2)
{
    // write code here
    while(num2 != 0){
        var temp = num1 ^ num2;
        var num2 = (num1 & num2) << 1;
        num1 = temp;
    }
    return num1;
}
```