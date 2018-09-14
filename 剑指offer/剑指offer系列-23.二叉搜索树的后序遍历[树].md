### 剑指offer系列-23.二叉搜索树的后序遍历[树]
#### 题目:
>**输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同**

#### 思路:
这个题画一个图就出来了
1. 给定一个后续序列, 如: [1, 6, 5, 13, 17, 15, 10, 25, 35, 30, 20];
2. 确认根就是当前序列的最后一个.
3. 从后向前找, 找到第一个比根小的数字, 就是10.10为20的左子树的根, 现在10成了新的根(递归)
4. 右子树就是30, 因为是后续遍历, 前一个肯定是右子树.
5. 递归

#### 代码:
```javascript
/**
 * 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。
 * @param {*} sequence 
 */
function VerifySquenceOfBST(sequence) {
    // write code here
    if (sequence.length === 0) return false;
    return helper(sequence);
}

function helper(sequence) {
    if (sequence.length <= 1) return true;

    var n = sequence.length - 1;
    var root = sequence[n];
    var left;
    for (let i = n - 1; i >= 0; i--) {
        if (sequence[i] < root) {
            left = i;
            break;
        }
    }

    for (let j = 0; j <= left; j++) {
        if (sequence[j] > root) return false;
    }

    return helper(sequence.slice(0, left + 1)) && helper(sequence.slice(left + 1, n));
}
```