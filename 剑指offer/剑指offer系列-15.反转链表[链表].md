### 剑指offer系列-15.反转链表[链表]

#### 题目:
>**输入一个链表，反转链表后，输出新链表的表头**

#### 思路:
借用三指针

#### 代码:
```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/

/**
 * 输入一个链表，反转链表后，输出新链表的表头。
 * @param {*} pHead 
 */

function ReverseList(pHead)
{
    // write code here
    if (pHead == null || pHead.next == null) return pHead;
    var prev = null;
    var next = null;
    while (pHead != null) {
        next = pHead.next;
        pHead.next = prev;
        prev = pHead;
        pHead = next;
    }
    return prev;
}
```