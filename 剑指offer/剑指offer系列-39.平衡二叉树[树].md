### 剑指offer系列-39.平衡二叉树[树]
#### 题目:
>**输入一棵二叉树，判断该二叉树是否是平衡二叉树**
#### 思路:
高度都会了...每层高度差小于一就行了
注意: 不能只判断一次! 整体左右高度差在1内不行, 每个子树高度差都必须小于1
#### 代码:
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
/**
 * 平衡二叉树
 * @param {*} pRoot 
 */
function IsBalanced_Solution(pRoot)
{
    // write code here
    if(pRoot === null) return true;
    if(Math.abs(height(pRoot.left) - height(pRoot.right)) > 1) return false;
    else{
        return IsBalanced_Solution(pRoot.left) && IsBalanced_Solution(pRoot.right); // 子树也要满足
    }
}

function height(root){
    if(root === null) return 0;
    return 1 + Math.max(height(root.left), height(root.right));
}
```