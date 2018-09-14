### 剑指offer系列-28.数组中出现次数超过一半的数字[数组]
#### 题目:
>**数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0**

#### 思路:
首先这题...肯定不能排序阿不然都是废话了...排序降维打击达到不到训练目的..
首先我们想极端情况,  1, 2, 3, 2, 4, 2, 5, 2 看出点端倪没有?
如果一个数字超过一半, 那么绝逼有相同数字连起来的情况..毕竟极端是隔一个放置一个, 正好一半, 超出一半必定有相连的!
所以我们定义一个变量: time来记录我们预见的元素的个数, time等于0时重新更新参考点, 具体代码如下, 一看就懂了

#### 代码:
```javascript
/**
 * 找数量过半数的数字
 * @param {*} numbers 
 */
function MoreThanHalfNum_Solution(numbers) {
    // write code here
    // 找数量过半数的数字 最极端的情况就是 1, 2, 3, 2, 4, 2, 5, 2 所以可以采用如下方法
    // 必须大于1/2 length 等于都不行, 等于的时候是找不到 [1, 2, 3, 2, 4, 2, 5, 2]
    var res = numbers[0], time = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (time === 0) {
            res = numbers[i];
            time++;
        }
        else if (numbers[i] === res) {
            time++;
        } else {
            time--;
        }
    }
    var time = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === res) {
            time++;
        }
    }
    if (time * 2 > numbers.length) return res;
    return 0;
}

console.log(MoreThanHalfNum_Solution([1, 2, 3, 2, 4, 2, 5, 2, 2]));
```