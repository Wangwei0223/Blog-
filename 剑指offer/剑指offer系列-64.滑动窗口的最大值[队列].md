### 剑指offer系列-64.滑动窗口的最大值[队列]
#### 题目:
>**给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}； 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个： {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， {2,3,4,[2,6,2],5,1}， {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}**

#### 思路:
有更好的方法, 我第一次是直接按题意暴力解

#### 代码:
```javascript
/**
 * 滑动窗口最大值
 * @param {*} num 
 * @param {*} size 
 */
function maxInWindows(num, size) {
    // write code here
    if (num.length === 0 || size === 0) return [];
    if (size > num.length) {
        num.sort(function (a, b) {
            return b - a;
        });
        return num[0];
    }

    var res = [];
    var max = num[0];
    var queue = [];
    //初始化队列
    for (let i = 0; i < size; i++) {
        queue.push(num[i]);
        max = max > num[i] ? max : num[i];
    }
    res.push(max);
    for (let j = size; j < num.length; j++) {
        queue.shift();
        queue.push(num[j]);
        console.log(queue);
        if (queue.indexOf(max) !== -1) {
            max = max > num[j] ? max : num[j];
        } else {
            var temp = queue.slice();
            temp.sort(function (a, b) {
                return b - a;
            });
            max = temp[0] > num[j] ? temp[0] : num[j];
        }
        res.push(max);
    }
    return res;
}

maxInWindows([2, 3, 4, 2, 6, 2, 5, 1], 3);
```