### 剑指offer系列-40.数组中只出现一次的数字[数组]
#### 题目:
>**一个整型数组里除了两个数字之外，其他的数字都出现了偶数次。请写程序找出这两个只出现一次的数**
#### 思路:
hash表统计个数
#### 代码:
```javascript
function FindNumsAppearOnce(array)
{
    // write code here
    // return list, 比如[a,b]，其中ab是出现一次的两个数字
    var hash = {};
    for (let i = 0; i < array.length; i++) {
        if (!hash[array[i]]) {
            hash[array[i]] = 1;
        } else {
            hash[array[i]] += 1;
        }
    }
    var res = [];
    for (let j in hash) {
        if (hash.hasOwnProperty(j) && hash[j] === 1) {
            res.push(+j);
        }
    }
    return res;
}
```