### 简单的数学题-1.交叉熵, L1 L2, tanh, 伯努利的相关推导

好久没写博客的感觉..最近作业是有点狠毒...

拿几道Machine Learning的题记录一下最近写数学题的过程, 还是很有意思的...估计也没人看...硕神要是发现什么不对的地方还麻烦指点..

![](https://github.com/Wangwei0223/Blog-174/blob/master/%E6%9D%82%E9%A1%B9/image/2018-10-06%2023-41-49%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png?raw=true)

第一题证明这个L1 loss function在中位数的地方取得最小值, 注意这个和L1正则是不一样的东西.
L1 loss function 取曼哈顿距离, L2是差平方

思路:
这种绝对值可以拆成两个部分, 分别求导, 可知导为0的时候取极值

![](https://github.com/Wangwei0223/Blog-174/blob/master/%E6%9D%82%E9%A1%B9/image/2018-10-06%2023-48-33%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png?raw=true)

根据求导我们可以看出, J = K的时候, 最小, 故在中位数的地方取得最小值

![](https://github.com/Wangwei0223/Blog-174/blob/master/%E6%9D%82%E9%A1%B9/image/2018-10-06%2023-48-47%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png?raw=true)

第二题证明L1, L2正则的区别, 以及哪一个可以被用作特征选择
我们来看一下L1, L2分别和损失函数等高线的图像
![](https://github.com/Wangwei0223/Blog-174/blob/master/%E6%9D%82%E9%A1%B9/image/2018-10-06%2023-48-59%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png?raw=true)
![](https://github.com/Wangwei0223/Blog-174/blob/master/%E6%9D%82%E9%A1%B9/image/2018-10-06%2023-49-28%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png?raw=true)

由图像我们可以清楚地看见区别, L1和L2定义可知他们计算的内容..L1是所有权值矩阵的系数和, L2是所有权值矩阵系数的平方和.

L1可以用作特征选择, 为什么?
因为我们看到L1图像是直线, 那么我通过扩大/缩小斜率..(即调整w)..可以有**较大概率找到(0, w2)或(w1, 0)(假设二维)**

这样就可以产生很多包含值为0的矩阵, 故可以产生稀疏矩阵. 所以可以被用作特征选择.

![](https://github.com/Wangwei0223/Blog-174/blob/master/%E6%9D%82%E9%A1%B9/image/2018-10-06%2023-49-46%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png?raw=true)

一是证明交叉熵服从伯努利, 二是证明tanh可替代sigmoid
直接上结果比较直观, 毕竟都是推理过程.
![](https://github.com/Wangwei0223/Blog-174/blob/master/%E6%9D%82%E9%A1%B9/image/2018-10-06%2023-49-56%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png?raw=true)

![](https://github.com/Wangwei0223/Blog-174/blob/master/%E6%9D%82%E9%A1%B9/image/2018-10-06%2023-50-11%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png?raw=true)
第四题是证明可被用于multi-Classes的时候

第五题很简单, 证明sigmoid导数等于sigmoid*(1-sigmoid)
![](https://github.com/Wangwei0223/Blog-174/blob/master/%E6%9D%82%E9%A1%B9/image/2018-10-06%2023-50-20%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png?raw=true)