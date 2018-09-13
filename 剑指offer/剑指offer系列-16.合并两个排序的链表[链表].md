### 剑指offer系列-16.合并两个排序的链表[链表]

#### 题目:
>**输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则**

#### 思路:
利用递归的思想, 每一次递归先初始化一个空节点, 空节点指向谁呢? 
空节点指向当前两个链表中小值(从大到小就为大值) 之后递归可得

#### 代码:
```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
/**
 * 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
 * @param {*} pHead1 
 * @param {*} pHead2 
 */
function Merge(pHead1, pHead2)
{
    // write code here
    if(!pHead1 && pHead2) return pHead2;
    if(pHead1 && !pHead2) return pHead1;
    if(!pHead1 && !pHead2) return null;
    var merged = null;
    if(pHead1.val < pHead2.val){
        merged = pHead1;
        merged.next = Merge(pHead1.next, pHead2);
    }else{
        merged = pHead2;
        merged.next = Merge(pHead1, pHead2.next);
    }
    return merged;
}
```