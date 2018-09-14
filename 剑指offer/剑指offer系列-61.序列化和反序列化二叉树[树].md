### 剑指offer系列-61.序列化和反序列化二叉树[树]

#### 题目:
>**请实现两个函数，分别用来序列化和反序列化二叉树**

#### 思路:
序列化的过程: 用一个arr保存前序遍历的结果, 递归前序遍历
反序列化的过程: 退栈. 递归推栈
#### 代码:
```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
/**
 * 请实现两个函数，分别用来序列化和反序列化二叉树
 */
var arr = [];
function Serialize(pRoot)
{
    // write code here
    if(pRoot){
        arr.push(pRoot.val);
        Serialize(pRoot.left);
        Serialize(pRoot.right);
    }else{
        arr.push('$');
    }
}
function Deserialize()
{
    // write code here
    var node = null;
    if(arr.length < 1){
        return null;
    }
    var num = arr.shift();
    if(typeof num === 'number'){
        node = new TreeNode(num);
        node.left = Deserialize();
        node.right = Deserialize();
    }
    return node;
}
```