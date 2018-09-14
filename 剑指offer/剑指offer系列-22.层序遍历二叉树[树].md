### 剑指offer系列-22.层序遍历二叉树[树]
#### 题目:
>**从上往下打印出二叉树的每个节点，同层节点从左至右打印**
#### 思路:
说了半天就是层序遍历, 队列直接秒
#### 代码:
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function PrintFromTopToBottom(root)
{
    // write code here
    if(!root) return [];
    var queue = [root], res = [];
    while(queue.length > 0){
        var cur = queue.shift();
        res.push(cur.val);
        if(cur.left) queue.push(cur.left);
        if(cur.right) queue.push(cur.right);
    }
    return res;
}
```