### 剑指offer系列-57.二叉树的下一个节点[树]

#### 题目:
>**给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针**

#### 思路:
**断送我offer的一道题, 改变我命运的一道题, 可能是我这辈子最恨的题也不为过.**

中序分情况
1. 当前节点有右
	1.1 有左, 右子树的第一个左
	1.2 没左, 就是右节点

2. 当前节点无右
	2.1 当前节点是父亲的左, 下一个就是父亲
	2.2 当前节点是父节点的右子节点, 找到第一个是父亲是爷爷的左节点

#### 代码:
```javascript
/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/
function GetNext(pNode)
{
    // write code here
   if(!pNode)return null;
   if(pNode.right != null){ //第1种
        pNode = pNode.right;
        while(pNode.left != null){
            pNode = pNode.left;
        }
        return pNode;
    }
    while(pNode.next != null){ //第2种 无右, 找到第一个是父亲是爷爷的左节点
        if(pNode == pNode.next.left){
            return pNode.next;
        }
        pNode = pNode.next;
    }
    return null;
}
```