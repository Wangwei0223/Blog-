### 剑指offer系列-47.求1 + 2 + 3 + ... + n[递归]

#### 题目:
>**求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）**

#### 思路:
不让用if判断递归终点, 我们可以发现递归终点就是0, 0正好是一个"假值"

#### 代码:
```javascript
/**
 * 求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）
 * @param {*} n 
 */
function Sum_Solution(n)
{
    // write code here
    return n&&Sum_Solution(n-1) + n; //用&&判断0终止
}
```