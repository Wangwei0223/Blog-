### 剑指offer系列-1.二维数组的查找[数组]

今天开始更新剑指offer系列, 算法不必太急, 老铁们每天来个3, 4道就行, 为以后跳槽作准备吧, 剑指offer比leetcode整体难度还是下降不少的, 适合复习知识用.

相关代码可以到 https://github.com/Wangwei0223/leetcode_JS 查看

#### 题目:
> **在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。**

#### 思路:
首先这道题很简单, 简单在从上到下从左到右都是已经构成有序序列.
##### 1. 设m为行, n为列. 从arr[m][0] 开始找, 即从每列行第一个开始找, 小于当前行的第一个, m-=1, 大于m行第0个了, n+=1 开始从列寻找.
##### 2. 找到返回true, 找不到返回false

#### 代码:

```javascript
/**
 * 
 * @param {*在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。} target 
 * @param {*} array 
 */
function Find(target, array)
{
    // write code here
    var m = array.length - 1;
    var n = 0;
    if(m === -1) return;

    while(m >=0 && n < array[0].length){
        var cur = array[m][n];
        if(target < cur){
            m--;
        }
        else if(target > cur){
            n++;
        }else{
            return true;
        }
    }
    return false;
}

console.log(Find(7, [[1,2,8,9],[2,4,9,12]]))
```
