### 剑指offer系列-66.机器人的运动范围[回溯]
#### 题目:
>**地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？**

#### 思路:
暴力回溯

#### 代码:
```javascript
function movingCount(threshold, rows, cols) {
    // write code here
    let visited = [];
    for (let i = 0; i < rows; i++) {
        visited.push([]);
        for (let j = 0; j < cols; j++) {
            visited[i][j] = false;
        }
    }
    return helper(0, 0, rows, cols, visited, threshold);
}

function helper(m, n, rows, cols, visited, threshold) {
    if (m < 0 || m === rows || n < 0 || n === cols || visited[m][n]) {
        return 0;
    }

    let sum = 0;
    let tmp = m + "" + n;
    for(let k = 0; k < tmp.length; k++){
        sum += +tmp[k];
    }
    if(sum > threshold){
        return 0;
    }
    visited[m][n] = true;

    return 1 + helper(m + 1, n, rows, cols, visited, threshold)
        + helper(m, n + 1, rows, cols, visited, threshold)
        + helper(m - 1, n, rows, cols, visited, threshold)
        + helper(m, n - 1, rows, cols, visited, threshold);
}

```