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

4.9
Alice, Betty, and Carol took the same series of examinations. For each examniation there was one grade of X, one grade of Z
are distinct poisitive integers. After all the exams. Alice had a total score of 20, Betty a total score of 10, and Carol a total
score of 9. If Betty was placed first in Algebra, who was placed second in gemometry.

x = 8, y = 4, z = 1

N(x + y + z) = 39
1, 39 impossible
39, 1 impossible
3 13 possible
13 3 impossible

A LAN with mesh topology has n nodes. How many links does if have?

N = (n - 1) + (n - 2) +...+ 0

chapter 8. The Integers
<-1<-3<-5 7-> <-6 4-> 2->

One say that an integer with a weatherrance is mobile if it can see a smaller integer.
In our example, the integers 3, 5, 4, 7 are mobile
Integer 1, 6, 2 are not mobile

<-1<-2<-3

4月16日

Theodore ven Karman
class problem:

What kinds of triangles can you create by using three consecutive elements of the Fibonacci sequence ? 

1 1 2 3 5 8 13

Cp:
Find the smallest integer greater than 1, that leaves a reminder of 1
when dividers by 3, 4, 5, 6, 7, and 8 ? ans 841

Apr 16 - relations and function
23 - recurrence & mathmetics of computionE
30 - 同上

May 7 

14 reading day --- quiz

21 - final extra point

www.accessscience.com

Ordered sets
sometimes, order makes a difference. In this case, we call our collection(set) a sequece(or a list)

The items in the sequence on are called entries or terms
For sequence we use {}
A sequence with n elements sometimes is called an n-tuple

Sometimes, we will want to consider all ordered pairs(2 - tuples) where the first element is from set $ and the second from set T.

This set of ordered pairs is called the Cartisian product and is denoted by SxT

SxT = {(s, t) | s 属于 $, t 属于 T}

S = {a, b}, T = {1, 2, 3}

S x T = {(a, 1), (a, 2), (a, 3), (b, 1), (b, 2), (b, 3)}

A relation such like > 属于 likes two objects and produces a statement

contrast this with  + , which produces a number

A relation on sets S and T is any subset of the Cartesian Product S x T

The "larger than" relation for real numbers is the set L = {(x, y) | x, y 属于 实数集, x > y}

(x, y) 属于 L, note: if S and T are... any relation of them can be represented as a directed graph

Properties of relations 

reflexity : A relation R on $x$ is reflexive if (x, x) 属于 R
for every x 属于 $, thus equality if reflexive since x = x for every x
as is <= (since every x <= x) However,  <  is not reflexive (< is antireflaxive)

Symmetry: A relation R on S x S is Symmetry if (x, y) 属于 R implies that (y, x) 属于 R

Transition: 传递
A relation R is transitive if whenever (x, y) 属于 R and (y, z)属于 R, then (x, z) 属于 R
< = > <= >= 包含  are all transitive

A binary relation or simply, relation from S to 1 is a subset of S x T.
given R is relation, for each pair a 属于 $, and b 属于 T, exactly one of the following is true.

1. (a, b) 属于 R, we then say "a is relation to b", written a R b
2. (a, b) 不属于 R, we then say "as is not R-related to b", written a R 斜杠 b

A {1, 2, 3 ,4}  R {(1, 2), (2, 2), (2, 4), (3, 2), (3, 4), (4, 1), (4, 3)}

A x A = A^2

A relation R on set A is reflexive a R a(a are related to a) for every a 属于 A, that is if (a, a) 属于 R, for every a属于A, R is not reflexive if
there exists a 属于 A, such that (a, a) 不属于 R

Prob:
Consider the following relations on the set A = {1, 2, 3, 4}
1: R1 = {(1, 1), (1, 2), (2, 3), (1, 3), (4, 4)}
2: R2 = {(1, 1), (1, 2), (2, 1), (2, 2), (3, 3), (4, 4)}
3: R3 = {(1, 3), (2, 1)}
4: R4 = 空集
5: R5 = A x A the universal relation (Cartesian Product)

R2 和 R5

哪一个是自反的

Symmetric and AntiSymmetric relation, 
A relation, R on a set A is symmetric if whenever a R b then b R a, that is whenever (a, b) 属于 R, then (b, a)属于 R
Also R is not symmetric if there exist a, b 属于 A such that (a, b) 属于 R but (b, a)不属于 R

4月23日

Set of vertices and a set of edges
If you can reach any vertex from any other vertax by continuously edges, two graph is connected(otherwise disconnected)
the degree of a vertex is the number of edges reaching if what two degree of a vertax is even or odd is important.

The edges of a graph determine certain two-dimentional regions or faces of the graph. 

Example:

If is customary to think of a graph as living on sphere, so that the exterior regions counts as a face.

Euler:
此处书上没有 要细看!!!!
V - E + F = 2

Let g be any connected graph on a sphere, V the number of vertices, E the number of edges, F the number of faces.(把整个平米分割成几部分)

Then the above formula stands true.

You can expand a graph in three ways :
1. Add one more edge to an existed vertex and terminate the edge with a vertex
2. Add the new edge so that both ends the vertices are at the same points on the existing graph (自己圈一个环)
3. We can add the new edge so that the two ends are at two different vertices of the existing graph

Can the complete graph on 5 vertices be draw in the plane(or on a sphere)
Without any edges crossing each other ? (Is that graph planar ? )
If that were possible, then the resulting graph would have V = 5

E = C(5, 2) = 10 and F = ? (every face would have to be a triangle)

F = C(5, 3) = 10

1. All examples in the chapters on graphs
2. All examples in the chapters on probability
3. Study the handouts on Recurrence
4. Revisit the materials on the Pigeonhole Principle

newspaper dispensing machine 

Parity Checking 奇偶校验

The state table of a machine gives a state for each ordered pair (i, s), where i is an input and s is a state, it describes a function with the Cartesian product (q, d) x (v, l) as it domain and the sales of state (v, l) as its codomain

A finite state machine consists of a  finite set of states S,a fintite set of inputs I, a functional of f with I x S as its domain and S as its codomain such that if i 属于 I and s 属于 S, then f(i, s) is the state two machine  moves to when it is in state s and is given input i.

We many also specify two initial state so, as well as subset S' of S.

The elements of S' are called the accepting states.

So our parity checking machine is a FSM, with S = {e, o}, I = {空, 1} so = e, S' = {e}

The function of is specified by f(空集, e) = e , f(空集, 0) = 0, f(1, e) = 0, f(1, 0) = e

which corresponds to the state table

www.drmodry.com

Prob: Build an FSM with I = {空集, 1} that accepts a storing precisely when it ends with 空集.

A string is a finite sequence of inputs. Suppose, given the string i, i2, i3, ... in, and the initial state s空, we
successfully compute S(i, s0) = S1, then f(i2, s1) = s2, and so on, finally ending up with state sn. If sn is in s', is accepted;
otherwise if is rejected.

5.7
Prob: Suppose there are 30 people in the room. What is the probability that two of them share the same birthady(day and month)?
(Ignore leap years)

1 - P(E) = A(30, 365) / 365^30

a first course in discrete mathematic 看第二章

https://link.springer.com/content/pdf/10.1007%2F978-0-85729-315-2.pdf

Reccurance 汉诺塔 Add one more restriction between two adjacent  重要!!!!!!!!!

https://www.math.toronto.edu/mathnet/questionCorner/genhanoi.html

"generalizing the towers of hanoi problem" toronto

2nd recurrance problem
0, 1, 2, 3 of n
create n length strings and 

what is the formula what is the number of strings lengths n with the odd number of zeros.

Graph

A graph in which each edge connects two different vertices and where no two edges connect the same pair of vertices
is called simple graph.

Graphs that have multiple graph edges connecting the same vertices are called multigraphs.

Two vertices u and v in an undirected graph G are called adjacent (or neighbors) in G if u and v are endpoints of an edges.

The degree of an vertax in an undirected graph is the number of edges incident with it, except that a loop at a vertax contributes twice 
to two degree. 每有一个环这个点加2

What happens when we add the degrees of all the vertices of a graph G(v, e).

If graph G has m edges 2m = 度之和

An undirected graph has an even number of vertices of odd degree. Let v1 and v2 be the set of vertices of even degree and odd degree respectively,
so
2m = 奇数度和 + 偶数度和 只是为了介绍两项必为偶

A complete graph on n vertices, denoted by Kn, is a simple graph that contains exactly one edge between pair of distinct vertices.

A cycle Cn n>=3 consists of n vertices v1, v2, v3, ..vn and edges (v1, v2), (v2, v3), ...(vn-1, vn) and (vn, v1)

We grt a wheel Wn, when we add an additional vertax to a cycle Cn, for n>=3, and connect the new vertax to each of two n vertices im Cn by new edges.

biparite 

A simple graph G is called bipartite if its vertax set V can be partitioned into two disjoint sets V1, V2 such that every edge in the graph
connects a vertax in V1 and vertax in V2.
(So that no edge in G connects two vertices in V1, or two vertices in V2)

A simple graph is bipartite if and only if it is possible to assgin one of two different colors to each vertax of the graph so that no two adjacent
vertices are assigned the same color.

A complete bipartite grpah Km,n is a graph that has its vertax set partitioned into two subsets of m and n vertices, respectively, with and edge between two vertices if and only if one vertax is in the first subset and the other in the second.

Rosen 10.2 P665 ex 20. Draw these graphs 

P666 ex 26
For which values of n are these graphs bipartite ?

Prob:
Solve two recurrence relation an = nan-1, subject to the condition a1 = 1

an = n!

5.14
Seven Secrets

有少量 概率 定义

FSM有

有些问题原来见过

Prob:
Niven P10. Set2 #8
How many of the integers (whole numbers) between 10,000 and 100,000 have no digits other than 

a. 6, 7, 8 ?
_ _ _ _ _

3^5

b. 6, 7, 8 or 空集(0)
注意leading zero
_ _ _ _ _

3*4*4*4*4

Niven pp 14-15
How many integers between 100 and 999 inclusive consist of distinct odd digits. (1, 3, 5, 7, 9)
5 * 4 * 3 = P(5, 3)

Prob:
.... have distinct digits ? 
9 * 9 * 8 = 698

Prob:
How many of the 698 are odd ? 
1, 3, 5, 7, 9

注意 answer format!!!
8*8*5
_ _ _

Niven pp 17 Set 4 #10
How many integers great than 53000, have the following two properties:
a. the digits of the integer are distinct;
b. the digits 0 and 9 do not occur in the number?

Two types pf problems: 注意问法的同义词
1.How many different arrgangements(ordered lists, permutaitons) of r objects can be formed from a set of n distinct
objects ? P(n, r) = n! / (n - r)!

2.How many different selections(unordered list, combinations) of r objects can be made form a set of n distinct object?
C(n, r) = n! / r! (n-r)!

Prob: 
How many **different** three digits numbers can be formed (created) by using the digits 5, 6, 7, 8, 9 without repetition?
5 * 4 * 3 注意不是C(5, 3)

Prob:
In how many different orders can 4 person be seated in attow of 4 chairs ?
P(4, 4)

Do not overthink

Prob:
How many different 4-member committees can be formeded from a delegetion of 7 members?
C(7,4) = 7 6 5 4 / 4 3 2 1 = 35

Prob:
              binary
How many 8-bit **strings** contain exactly three 0s. **注意是string不是number, 不用考虑 leading-zero**

C(8, 3) * 5^9

binary 的话 就是 C(8, 3) = 56

Prob:
An invseter is going to invest $16,000 in 4 stocks chosen from a list of 12 prepared by her broker. How many different investments are possible
if
1.$4000 is to be invested in each stock? 
C(12, 4)
2.**$6000 is to be invested in one stock, $5000 in another, $3000 in the third, and $2000 in the fourth?**
P(12, 4) 注意是排列, 选一个6000, 一个5000, 一个3000, 一个2000 **有顺序**

Prob:
Three men and three women are going to occupy a row of six seats. In how many different arrangements can they be seated so that men occupy the two
end seats?

P(3, 2) * P(4, 4) **注意是乘不是加, 注意别一时脑抽就笔误了**

Prob:
The invester is going to purchase shares of 4 stocks chosen from a list of 12.
How many different investments are possible if $ 5000 is to be invested in each of two stocks and $3000 in each of the others?

C(12, 2) * C(10, 2) or C(12, 4) * C(4, 2)

Prob:
From among a group of six men and nine women, how many three-member committees contain only men or only women?
C(6, 3) + C(9, 3)

**注意是product rule 还是 sum rule**

Prob:
How many 8-bit binary strings contain six or more 1s?
C(8, 6) + C(8, 7) + C(8, 8)

Prob:
How many 8-bit binary strings with exactly two 1s are such that the 1s are not adjacent?

C(8, 2) - C(7, 1)  = 21

If an 8-bit string contains exactly two 1s, then it must also contain exactly six 0s.
We will consider two cases, according whether the last bit is a 0 or 1.
If the last bit is a 0 and the two 1s are not adjacent, then each 1 is followed bt at least one 0.
Hence we can regard the bits to be arranged as two strings of 10, and four single 0s. The number of ways to
arrange these six groups is the number of ways to choose positions for 0s from six locations, C(6, 4).

On the other hand, if the last digit is 1 and the two 1s are not adjacent, then we must arrange five zeros and one string of 1 0(the other 1 is
reserved for the last bit). The number of must arrangement is the number of ways to choose position for the five 0s from six locations C(6, 5)

C(6, 4) + C(6, 5) = 21

Rosen 7.1.1 "discrete mathmatics and its applications" Rosen 7th Ed. 

a card selected at random from a standard deck of 52 cards is an ace?
P(A) = 4 / 52 = 1 / 13

7.12. What is the prob that a fair dice comes up six when it is rolled ? 1 / 6
7.13. P(odd) = 50 / 100 = 1 / 2
7.14. P() = 30 / 366
7.16. What is the probability that a card selected at random from standard deck of 52 cards is an ace or heart?
P = 16 / 52
7.1.7 What is the prob that when a coin is filpped six times in a row, it lands heads every time? (1/2)^6
**7.1.8 What is the prob that a 5-card poker hand contains the ace of heart?**
C(51, 4) / C(52, 5)
7.1.9 What is the prob that a 5-card poker hand does **not** contain the queen of heart?
C(51, 5)/ C(52, 5) or

1 - [C(51, 4) / C(52, 5)]

7.1.23
What is the probability that a positive integer (not exceeding 100) selected at random is divisible by 3 or 7?
33 + 10 / 100 

21 42 63 84 

go to library.nyu.edu

Skillsoft Books (formerly Books24x7)

5.15
1. 记住两种 求递归通项
