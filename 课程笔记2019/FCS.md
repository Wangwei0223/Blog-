1. 1 + 2 + .... n = 190
2. LAN handshake problem
3. 可否被2整除
4. 可否被4整除
5. 三角形

pandy arithmatic

1. even + even = 2n + 2m = 2(n + m) ====> even number
2. odd + odd  = (2n + 1) + (2n + 1) = 2(n + m + 1) even
3. even + odd = 2n + 2m + 1 = 2(n + m) + 1 odd
4. even * even = 2n*2m = 2(2nm) even

The multipcation principle (The product rule)

The collection of things can be separate tinto m different types, and if each of these types can be separate into k different subtypes.
Then there are mk different types in all;

Suppose that a proceduce can be broken down into a sequence of two tasks. If there are n1 ways to do the first task, and for each of these ways of doing the first task, there are n2 ways to do the second task, then there are n1*n2 ways to do the procedure.

Problem: The car lincense plates have letter, not numbers
BQJ or CCT and DWD

How many unique lincese plades are possible
26*26*26
no duplicate 26*25*24

Problem: If duplicates are allowed, how many lincese start with letter A
1*26*26
no duplicate 1*25*24

if no duplicate how many start with AA

doesnt begin with A

set S {1, 2, 3, ...9}
How many distinct 9-digit number with distinct digit be be generate
9*8*7*6*5*4*3*2*1
How many of those numbers are disisible by 2 ?
8*7*6*5*4*3*2*1 * 4(2468结尾)

how....divisible by three?

Set R = {0, 1, 2, 3, 4, 5, 6, 7, 8}
set T = {0 ,1, ...9}


第三节
Problem:
given a set S = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

a. How many distinct 9-digit numbers with distinct digit can be created ?
b. How many of them are divisible by 2 ?
c. ..................................3 ?
d. ..................................5 ?

被4整除: 后两位能被4整除
被8乘除: 后三位能被8整除

a. 0 结尾 LSD position 9*8*7*6*5*4*3*2*1 
   0 不结尾 8*8*7*6*5*4*3*2*1*4 4代表4个选择(2468)

Problem:
.....do not sit next to each other

GPST

A set is a collection of object
Set A = {1, 2} We say set A has two elements, namedy 1 and 2 and write 2 属于 A
Order does not matter, meaning {1, 2} = {2, 1} unless we speak of ordered sets
We can say 3 is not an element(member) of the Set A,
and write 3 不属于 A

Another way of defining a set is a set builder notation
S = {m | 2 <= m < 100 and m is an integer}

Set A = {1, 2, 3, 4} Set B = {2, 3} 老师用不带横线的代表proper subset

If T is a subset of S and T is not equal to S then T 真包含与 S

The element of a set can be sets themselves

The set of all subset of set is called the power set of the set.

Set S = {a. b}

P(s) = {{a}, {b}, {a, b}, 空集}

cardinality of a set is the number (size) of the elements in the set.

|S| = Card(S) = 2

Set Operation
1. Set Union
denoted by U is defined by S U T = { x | x属于 S and x属于 T}

| S U T | <= | S | + | T |

2. Set interseaction, defined by 交集

ST
two set

sometimes we want to consider all ordered pairs(2-types)
where the element is from S adn the second is from T.

The set of ordered pairs is called the Cartesian Product and is denoted bt S x T = {(a, t) | a 属于 S and t 属于 T}
{a, b} x {1, 2} = {(a, 1), (a, 2), (b, 1), (b, 2)}

How many integer from 1 to 6300 inclusive are not divisible by 3 ?

6300 - 6300 / 3

How many integers from 1 to 6300 inclusive are not divisible by 3 or 5

6300 - 6330 / 3 - 6300 / 5 + 6300 / 3*5

How many integers from 1 to 6300 inclusive are not divisible by 3, 5 or 7 ?

6300 - 6300 / 3 - 6300 / 5 -6300 / 7 + 6300 / 3*5 + 6300 / 3*7 + 6300 / 5*7 - 6300 / 3*5*7 

Pre Dirichlet Principle

If K is a positive integer and k + 1 or more objects are placed into k boxes, then there is at least one box containing two or more more oobjects

Pigeonhole principle

