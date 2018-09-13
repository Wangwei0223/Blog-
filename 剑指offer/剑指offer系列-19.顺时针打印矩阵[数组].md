### 剑指offer系列-19.顺时针打印矩阵[数组]

#### 题目:
>**输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下4 X 4矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.**

#### 思路:
不能真的顺时针去打印这个矩阵不然非得累死...
我们为了图写起来方便, 牺牲部分空间, 每次构建新的矩阵
每次都是打印矩阵的第一行, 之后把最后一列, 变为第一行, 倒数第二列变为第二行....
画一张图你就能明白, 之后每次做这种旋转矩阵的操作, 达到顺时针打印矩阵的目地.

#### 代码
```javascript
/**
 * 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下4 X 4矩阵： 
 * 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.
 * @param {*} matrix 
 */
function printMatrix(matrix)
{
    // write code here
    if(!matrix) return;
    var res = [];;
    res = res.concat(matrix.shift());  // 直接res = [firstrow] 会出现 [[]]
    while(matrix.length > 0){
        matrix = reverse(matrix);
        res = res.concat(matrix.shift());
    }
    return res;
}

function reverse(matrix){
    if(matrix[0].length === undefined)return matrix;
    var col = matrix[0].length;
    var row = matrix.length;
    var newMatrix = [];
    for(let j = col - 1; j >= 0; j--){
        var temp = [];
        for(let i = 0; i < row; i++){
            temp.push(matrix[i][j]);
        }
        newMatrix.push(temp);
    }
    return newMatrix;
}

console.log(printMatrix([[1,2],[3,4]]));
```
