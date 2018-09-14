### 剑指offer系列-56.删除链表中的重复节点[链表]

#### 题目:
>**在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5**

#### 思路:
双指针 + 自建头节点方便处理第一个就为重复的情况

#### 代码:
```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function deleteDuplication(pHead)
{
    // write code here
    if(!pHead || !pHead.next) return pHead;
    let Head = new ListNode(0);//重要，方便处理第一个、第二个节点就是相同的情况。
    Head.next = pHead;
    var cur = Head.next;
    var pre = Head;

    while(cur!=null){
        if(cur.next != null && cur.val == cur.next.val){
            while (cur.next != null && cur.val == cur.next.val) {
                cur = cur.next;
            }
            pre.next = cur.next;
            cur = cur.next;
        }else{
            cur = cur.next;
            pre = pre.next;
        }
    }
    return Head.next;
}
```