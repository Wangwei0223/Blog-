### 剑指offer系列-58.对称的二叉树[树]

#### 题目:
>**请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的**

#### 思路:
递归判断每一层左 === 右

#### 代码:
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function isSymmetrical(pRoot)
{
    // write code here
    if(!pRoot) return true;
    return Sym(pRoot.left, pRoot.right);
}

function Sym(p, q){
    if(!p&&!q) return true;
    if(p&&!q) return false;
    if(!p&&q) return false;
    if(p.val !== q.val) return false;
    return Sym(p.left, q.right) && Sym(p.right, q.left);
}
```