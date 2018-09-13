### 剑指offer系列-3.从尾到头打印链表[链表]

#### 题目:
> **输入一个链表，按链表值从尾到头的顺序返回一个ArrayList**

#### 思路:
可以借助JS中数组的unshift(), 相当于入栈

#### 代码:
```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    // write code here
    var stack_ = [];
    while(head){
        stack_.unshift(head.val);
        head = head.next;
    }
    return stack_;
}
```