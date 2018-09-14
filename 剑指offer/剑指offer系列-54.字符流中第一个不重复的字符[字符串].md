### 剑指offer系列-54.字符流中第一个不重复的字符[字符串]
#### 题目:
>**请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"**

#### 思路:
统计的问题都可以用hash表

#### 代码:
```javascript
/**
 * 字符流中第一个不重复的数字
 */

//Init module if you need
let map;
function Init()
{
    // write code here
    map = {};
}
//Insert one char from stringstream
function Insert(ch)
{
    // write code here
    if(!map[ch]){
        map[ch] = 1;
    }else{
        map[ch]+=1;
    }
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce()
{
    // write code here
    for(let i in map){
        if(map.hasOwnProperty(i)){
            if(map[i] === 1){
                return i;
            }
        }
    }
    return '#';
}
```