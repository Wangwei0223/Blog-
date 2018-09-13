### 剑指offer系列-14.链表中倒数第k个结点[链表]

#### 题目:
>**输入一个链表，输出该链表中倒数第k个结点**

#### 思路:
双指针, 先让前面的指针走k - 1步, 之后两个指针一起走, 前面的指针走到链表末尾, 后一个指针指向的即为倒数第K个节点

#### 代码:
```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
/**
 * 输入一个链表，输出该链表中倒数第k个结点。
 * @param {*} head 
 * @param {*} k 
 */
function FindKthToTail(head, k)
{
    // write code here
    if(k <= 0 || head === null) return null;
    var p = head, q = head;
    for(let i = 0; i < k - 1; i++){
        q = q.next;
        if(!q) return null;
    }

    while(q.next){
        q = q.next;
        p = p.next;
    }
    return p;
}
```