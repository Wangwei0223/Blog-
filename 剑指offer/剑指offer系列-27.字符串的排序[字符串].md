### 剑指offer系列-27.字符串的排序[字符串]
#### 题目:
>**输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba**

#### 思路 
全排列问题, 回溯, 解决重复项可以直接使用es6中的Set完成一波偷鸡
**res = [...new Set(res)];**

#### 代码:
```javascript
function Permutation(str) {
    // write code here
    if (str.length === 0) return [];
    var res = [];
    dfp(str, [], res, str.length);
    res.sort();
    res = [...new Set(res)];
    return res;
}

function dfp(str, stack, res, n) {
    if (stack.length === n) {
        res.push(stack.join('').slice());
    }
    for (let i = 0; i < str.length; i++) {
        stack.push(str[i]);
        var temp = str;
        var arr = str.split('');
        arr.splice(i, 1);
        var str = arr.join('');
        dfp(str, stack, res, n);
        str = temp;
        stack.pop();
    }
}

console.log(Permutation('cba'));
```