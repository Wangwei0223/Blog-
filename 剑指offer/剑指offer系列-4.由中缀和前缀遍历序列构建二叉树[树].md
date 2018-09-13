### 剑指offer系列-4.由中缀和前缀遍历序列构建二叉树[树]

终于迎来了第一道剑指offer里还算有点难度的题.

#### 题目
>**输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。**

#### 思路
这道题值得好好分析了, 首先我们从前缀表达式中能得到什么信息? 
##### 1. 第一项就为根!
##### 2. 找到中缀中第一项出现的位置 (知道为什么题目中说不重复了吧..不然可没法找到底是哪个)
##### 3. 左边就为左子树, 右边就为右子树, 递归. 关键点是计算左子树开头和右子树开头在前缀中的位置.
##### 4. 左子树好找, 直接前缀中+1即可, 右子树需要把左子树的个数算出来

#### 代码(仔细阅读注释, 很好地说明了如何计算右子树在前缀序列中的位置)
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
/**
 * 
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。
 * @param {*} pre 
 * @param {*} vin 
 */
function reConstructBinaryTree(pre, vin)
{
    // write code here
    return helper(0, 0, vin.length - 1, pre, vin);
}

// preStart: 前序序列中的坐标(从前序序列的第几个开始找) inStart inEnd 中序序列中的开始节点和结束节点
function helper (preStart, inStart, inEnd, preorder, inorder){
    if (preStart > preorder.length - 1 || inStart > inEnd) {
        return null
    }
    var root = new TreeNode(preorder[preStart]);
    var inIndex = 0;
    for (let i = inStart; i <= inEnd; i++) {
        if (inorder[i] === root.val) {
            inIndex = i; // 找到当前节点在中序中的位置, 为的是分割左右子树
        }
    }
    root.left = helper(preStart + 1, inStart, inIndex - 1, preorder, inorder); //左子树在前序序列中的位置就是当前位置+1
    root.right = helper(preStart + inIndex - inStart + 1, inIndex + 1, inEnd, preorder, inorder); //右子树在前序序列的位置需要算, 要把左子树的先腾出来
    /**
     * 如何从前序序列中找右子树的位置:
     * 以 5, 3, 8, 6为例
     * (inIndex - inStart) 3前面有几个数(3左子树节点个数)
     * preStart + (inIndex - inStart): 3 + 3的左子树的个数
     * preStart + (inIndex - inStart) + 1: 下一个就是3右子树的位置
     */
    return root;
}
```