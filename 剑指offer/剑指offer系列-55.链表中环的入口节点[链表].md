### 剑指offer系列-55.链表中环的入口节点[链表]

#### 题目:
>**给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null**

#### 思路:
快慢指针, 有环的话快指针一定能追上慢指针, 且多走N圈. 相遇之后, 把快指针移动到head, 快慢同时同步走, 下次相遇即为环的入口 (画图便知)

#### 代码:
```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
/**
 * 链表判环找入口
 * @param {*} pHead 
 */
function EntryNodeOfLoop(pHead)
{
    // write code here
    if(!pHead && !pHead.next) return null;
    var f = pHead;
    var s = pHead;
    while(f && f.next){
        f = f.next.next;
        s = s.next;
        if(f === s){
            f = pHead;
            while(f !== s){
                f = f.next;
                s = s.next;
            }
            return f;
        }
    }
    return null;
}
```