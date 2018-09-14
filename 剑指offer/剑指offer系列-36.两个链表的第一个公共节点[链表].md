### 剑指offer系列-36.两个链表的第一个公共节点[链表]
#### 题目:
>**输入两个链表，找出它们的第一个公共结点**

#### 思路:
和链表找环很像, 仔细观察代码起始是把两个链表接在一起了
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
8 -> 9 -> 10 -> 11 -> 4 -> 5 -> 6 -> 7


#### 代码:
```javascript
/**
 * 输入两个链表，找出它们的第一个公共结点。
 */

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindFirstCommonNode(pHead1, pHead2)
{
    // write code here
    var p1 = pHead1;
    var p2 = pHead2;
    while (p1 != p2) 
    {
        p1 = (p1 === null ? pHead2 : p1.next);
        p2 = (p2 === null ? pHead1 : p2.next);
    }
    return p1;
}
```