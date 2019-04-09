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

复习

3.26

DEF: 
If a and b are integers with a !== b, we say a devides b if there is an integer c such that b === ac or equivalent, if b / a is an integer. when a divides b we way that a is a factor or divisor of b, and b is a multiple of a. The noration a | b denotes that a divides b. We write a X b when a does not divide b.

HW week4 32:
How many strings of six lowercase letter from the English applabet contain

a. the letter a ?
b. the letter a and b? (one or both) || one or both letter a and b ? 

DEF
prime 
An integer p > 1 is prime, if and only if the only positive divisors of p are 1 and p.

DEF
An integer p greater than 1 is called prime if the only possible factors of p are 1 and p. A positive integer that is greater than 1 and is not prime is called composite.

Th1: Let a, b and c be integers, where a !== b. Than
1. if a | b and a | c, than a | b + c
2. if a | b, than a | bc for all integers c
3. if a | b and b | c than a | c

The division Algorotjrm

Let a ne am integet and d a positive integer then there are unique integers g and r, with o <= r < d, s, t. a = dq + r. 
In the equality given in the division algorithm, d is called the divisor, a is called the dividend, q is called quotient, and r is call the reminder. q = a dir d and r = a mod d.

In mathmetics and computer science the floor function is the function that takes as input a real number X and gives as output the greatest integer less than or equal to x.  Floor(2.y) = 2

Similarly, the ceil function maps X to the least integer greater or euqal to x. denoted the ceil(2.y) = 3

Note that both a dir d and a mod d for a fixed d are ...on the set of integers. Futhermore, when a is a integer and d d positive integer, we have a dir d = La / d and a mod d  = a - d.

What are the quotient and reminder when |0| is divided by 11?
we have |0| = 11*q + 2, Hense, the quotient is q = |0| dir 11 and the reminder is 2 = |0| mod 11.

What are the quotient and reminder when -11 is divided by 3?
We have -11 = 3(-q) + 1

What is the value of the result of multiplication of all integer is the interral of [-78, 87]

Fundamental theorem of arismetic

Every composite number can be written as a unique producer of powers of primes

example
20 = 4*5 = 2^2*5^1

Prob: How many pairs of primes add up to 999? (997, 2)

find the prime factorization of 7007
2,3,5 do not divide 7 does, 7007 / 7 = 1001

7007, 2, 3, 5 do not divide 
7 divides 7007 / 7 = 1001
7 divides 1001 / 7 = 143
11 divides 143 / 11 = 13

write out 7*7*11*13

There are infinite many primes

GCD: let a and b be integers, not both zero.
The largest integer d such that d | a and d | b is called the greatest common divisor of a and b.
denote gcd(a, b)

What is the gcd of 24 and 36?
The positive common divisors of 24 and 36 are 1, 2, 3, 9, 6, 12
Hense gcd(24, 36) are 12

gcd(17,22) -> no positive common divisors, so gcd(17, 22) = 1
DEF:
The integer a and b are relatively prime if their gcd = 1
def:
The integer a1, a2, a3...an are positive relatively prime if gcd(ai, aj) = 1 1<= i <= j <= n

10, 17, 21- are pairwise relatively prime ?
gcd(10, 17) = 1, gcd(10, 21) = 1, gcd(17, 21) = 1

10, 19, 24 are ?
gcd(10, 24) = 


4月2日

information theory && number theory
CP13

How many solutions in positive integers does x^2 - y^2 = 270, have ?

x^2 - y^2 = 270 
(x + y)(x - y) = 3*3*3*5*2   
case1: x, y both even
even*even = 270
2m * 2n = 270
m *n = 135 不存在

case2: x, y both odd

case3: x even y odd


x + y + z + w = 12, have ? 不允许有 0 C(11, 3)

x1 + x2 + x3... xk = n 问题  C(n + k - 1, n)

predictable logic for software engineering

1. Direct proof
2. proof by induction
3. proof by induction further example
4. recurrence 2 examples
5. recurrence relations
6. Fibonacci number intro ch 1
7. discrete mathenmatics