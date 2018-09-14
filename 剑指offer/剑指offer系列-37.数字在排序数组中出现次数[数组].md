### 剑指offer系列-37.数字在排序数组中出现次数[数组]
#### 题目:
>**统计一个数字在排序数组中出现的次数**
#### 思路:
这种统计个数的一律可以用hash表
```javascript
/**
 * 统计一个数字在排序数组中出现的次数。
 * @param {*} data
 * @param {*} k
 */

function GetNumberOfK(data, k) {
    // write code here
    var hash = {};
    for (let i = 0; i < data.length; i++) {
        if (hash[data[i]]) {
            hash[data[i]]++;
        } else {
            hash[data[i]] = 1;
        }
    }
    return hash[k] === undefined ? 0 : hash[k];
}
```