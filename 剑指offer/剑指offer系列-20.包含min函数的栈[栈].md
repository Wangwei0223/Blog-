### 剑指offer系列-20.包含min函数的栈[栈]
#### 题目:
>**定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1)**
#### 思路:
keep一个栈, 每次压栈的时候, 判断当前当前和栈顶大小, 向栈中压其中小的元素, 最后返回这个栈顶即为min.

#### 代码:
```javascript
/**
 * 定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。
 */
var stack_ = [], curMin = [], temp = null;
function push(node)
{
    // write code here
    if(!temp){
        temp = node;
    }
    if(node !== null){ // if(node) 在 node为0会出错
        stack_.push(node);
        if(temp > node){
            temp = node;
        }
        curMin.push(temp);
    }
    return stack_.length;
}
function pop()
{
    // write code here
    curMin.pop();
    return stack_.pop();
}

function top()
{
    // write code here
    return stack_[stack_.length - 1];
}

function min()
{
    // write code here
    return curMin[curMin.length - 1];
}
```