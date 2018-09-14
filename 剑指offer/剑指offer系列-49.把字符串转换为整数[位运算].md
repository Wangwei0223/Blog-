### 剑指offer系列-49.把字符串转换为整数[位运算]
#### 题目:
>**题目描述
将一个字符串转换成一个整数(实现Integer.valueOf(string)的功能，但是string不符合数字要求时返回0)，要求不能使用字符串转换整数的库函数。 数值为0或者字符串不是一个合法的数值则返回0**
#### 思路:
妈的位运算太难了, 各种不懂
**res = (res << 1) + (res << 3) + (str[i] & 0xf);//res=res*10+str[i]-'0';**
**关键是这一步 左一1位, 相当于乘2, 左移3位相当于乘8, 加一起等于乘10**
#### 代码:
```javascript
/**
 * 字符转整数
 * @param {*} str 
 */
function StrToInt(str) {
    let res = 0, flag = 1;
    let n = str.length;
    if (!n) return 0;
    if (str[0] == "-") {
        flag = -1;
    }
    for (let i = (str[0] == "+" || str[0] == "-") ? 1 : 0; i < n; i++) {
        if (!(str[i] >= "0" && str[i] <= "9")) return 0;
        res = (res << 1) + (res << 3) + (str[i] - "0");
    }
    return res * flag;
}
console.log(StrToInt('345'));
```