### 剑指offer系列-9.变态跳台阶[数学降维打击 & 动态规划]

### 题目:
>**一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法**

### 思路:
观察与上一道有啥差别? 就是当前台阶可以由下面的任意一个台阶跳上来
a[n]=a[n-1]+a[n-2]+......+a[1];..........................①
a[n-1]=        a[n-2]+......+a[1];..........................②
两式相减：a[n]=2*a[n-1];

### 代码:
```javascript
/**
 * 变态跳台阶, 能条N级
 * @param {*} number 
 */
function jumpFloorII(number)
{
    // write code here
    if(number <= 0) return 0;
    if(number === 1) return 1;
    if(number === 2) return 2;
    var arr = [0, 1, 2];
    // arr[n] = 2*arr[n - 1];
    /**
     *  a[n]=a[n-1]+a[n-2]+......+a[1];..........................①
        a[n-1]=        a[n-2]+......+a[1];..........................②
        两式相减：a[n]=2*a[n-1];
     */
    for(let i = 3; i <= number; i++){
        arr[i] = 2*arr[i - 1];
    }
}

console.log(jumpFloorII(3));
```