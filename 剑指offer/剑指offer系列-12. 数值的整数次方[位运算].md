### 剑指offer系列-12. 数值的整数次方[位运算]

#### 题目:
>**给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方**

#### 思路:
可以用位运算...以后更..先写一个简单的方法占坑

#### 代码
```javascript
/**
 * 给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。
 * @param {*} base 
 * @param {*} exponent 
 */
function Power(base, exponent)
{
    // write code here
    if (exponent === 0) return 1;
    var result = 1, flag = false;
    if (exponent < 0) {
        exponent = Math.abs(exponent);
        flag = true;
    }

    while (exponent > 0) {
        result *= base;
        exponent--;
    }
    if (flag) result = 1 / result;
    return result;
}
```