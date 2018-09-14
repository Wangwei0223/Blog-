### 剑指offer系列-59.按之字形打印二叉树[树]

#### 题目:
>**请实现一个函数按照之字形打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右至左的顺序打印，第三行按照从左到右的顺序打印，其他行以此类推**

#### 思路:
层序遍历套一个马甲而已...把每一层队列退干净了就行

#### 代码:
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Print(pRoot)
{
    // write code here
    if (!pRoot) return [];
    var queue_ = [pRoot];
    var flag = true; //true 正向
    var res = [];
    while(queue_.length > 0){
        var len = queue_.length; // 必须先保存当前层的大小, 因为后面还要往队列里进
        var level = [];
        while(level.length < len){
            var cur = queue_.shift();
            level.push(cur.val);
            if(cur.left){
                queue_.push(cur.left);
            }
            if(cur.right){
                queue_.push(cur.right);
            }
        }
        if(flag){
            res.push(level);
        }else{
            res.push(level.reverse());
        }
        flag = !flag;
    }
    return res;
}
```