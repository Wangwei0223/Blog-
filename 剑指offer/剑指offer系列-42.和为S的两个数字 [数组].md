### 剑指offer系列-42.和为S的两个数字 [数组]
#### 题目:
>**输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的**

#### 思路:
两个指针一个指头一个指尾对着扫呗, 要乘积最小, 间隔远正好最小, 所以转换为碰见第一个就break.

#### 代码:
```javascript
/**
 * 和为S的字符串
 * @param {*} array 
 * @param {*} sum 
 */
function FindNumbersWithSum(array, sum)
{
    // write code here
    if(array.length < 2) return [];
    var left = 0;
    var right = array.length - 1;
    var res = [];
    while(left < right){
        if(array[left] + array[right] < sum){
            left++;
        }
        else if(array[left] + array[right] > sum){ // else if
            right--;
        }
        else{
            res.push(array[left], array[right]);
            break;
        }
    }
    return res;
}
```