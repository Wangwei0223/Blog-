### 剑指offer系列-38.二叉树的深度[树]
#### 题目:
>**求二叉树的深度**
#### 思路:
注意是Max, 取左右中高的那个
#### 代码:
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function TreeDepth(pRoot)
{
    // write code here
    if(pRoot === null) return 0;
    return 1 + Math.max(TreeDepth(pRoot.left), TreeDepth(pRoot.right));
}
```