### 剑指offer系列-10.矩形覆盖[动态规划]

#### 题目:
>**我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？**

#### 思路:
a[n - 1] 覆盖一个竖着的 + a[n - 2] 覆盖两个横着的. 状态转移方程已经出来了 a[n] = a[n - 2] + a[n - 1]

#### 代码:
```javascript
/**
 * 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
 * @param {*} number 
 */

function rectCover(number)
{
    // write code here
    if(number <= 0) return 0;
    if(number === 1) return 1;
    if(number === 2) return 2;
    var arr = [0, 1, 2];
    for(let i = 3; i <= number; i++){
        arr[i] = arr[i - 2] + arr[i - 1]; // 就是上一个加上竖着放一个 + 上两个加上横着放两个
    }
    return arr[number];
}
```