### Spark Context
• A Spark program first creates a SparkContext object
    » Tells Spark how and where to access a cluster
    » pySpark shell and Databricks Cloud automatically create the sc variable
    » iPython and programs must use a constructor to create a new SparkContext
• Use SparkContext to create RDDs

### Spark Essentials: Master
• The master parameter for a SparkContext determines which type and size of cluster to use.

### Resilient Distributed Datasets
• The primary abstraction in Spark
    » Immutable once constructed"
    » Track lineage information to efficiently recompute lost data
    » Enable operations on collection of elements in parallel
• You construct RDDs
    » by parallelizing existing Python collections (lists)
    » by transforming an existing RDDs
    » from files in HDFS or any other storage system

### RDD
• Two types of operations: **transformations and actions**
• Transformations are lazy (not computed immediately)
• Transformed RDD is executed when action runs on it
• Persist (cache) RDDs in memory or disk

### Creating an RDD
• Create RDDs from Python collections (lists)

### Creating RDDs
• From HDFS, text files, Hypertable, Amazon S3, Apache Hbase, SequenceFiles, any other Hadoop InputFormat, and directory or glob wildcard: /data/201404*

### Creating an RDD from a File
    distFile =.sc.textFile("...",.4).
    • RDD distributed in 4 partitions
    • Elements are lines of input
    • Lazy evaluation means
    no execution happens now

### Spark Transformations
• Create new datasets from an existing one
• Use lazy evaluation: results not computed right away –
instead Spark remembers set of transformations applied
to base dataset
» Spark optimizes the required calculations
» Spark recovers from failures and slow workers
• Think of this as a recipe for creating result

### Some Transformations
里面有map和flatMap区别

### Review: Python lambda Functions
• Small anonymous functions (not bound to a name)
**lambda.a,.b:.a.+.b.**
» returns the sum of its two arguments
• Can use lambda functions wherever function objects are required
• Restricted to a single expression

### Transformations

### Some Actions

### Driver

1．驱动器节点(Driver)
Spark的驱动器是执行开发程序中的 main方法的进程。它负责开发人员编写的用来创建SparkContext、创建 RDD，以及进行 RDD 的转化操作和行动操作代码的执行。如果你是用spark shell，那么当你启动 Spark shell的时候，系统后台自启了一个 Spark 驱动器程序，就是在Spark shell 中预加载的一个叫作 sc 的 SparkContext 对象。如果驱动器程序终止，那么Spark 应用也就结束了。
Driver在spark作业执行时主要负责以下操作：
1）把用户程序转为任务
Driver程序负责把用户程序转为多个物理执行的单元，这些单元也被称为任务（task）。从上层来看，spark程序的流程是这样的：读取或者转化数据创建一系列 RDD，然后使用转化操作生成新的RDD，最后使用行动操作得到结果或者将数据存储到文件存储系统中。Spark 程序其实是隐式地创建出了一个由上述操作组成的逻辑上的有向无环图。当Driver序运行时，它会把这个逻辑图转为物理执行计划。
Spark 会对逻辑执行计划作一些优化，比如将连续的映射转为流水线化执行，将多个操作合并到一个步骤中等。这样 Spark 就把逻辑计划转为一系列步骤（stage）。而每个stage又由多个task组成。这些task会被打包并送到集群中。task是 Spark 中最小的执行单元，用户程序通常要启动成百上千的独立任务。
2）跟踪Executor的运行状况
有了物理执行计划之后，Driver程序必须在各个Executor进程间协调任务的调度。Executor进程启动后，会向Driver进程注册自己。因此，Driver进程就可以跟踪应用中所有的Executor节点的运行信息。
3）为执行器节点调度任务
Driver程序会根据当前的Executor节点集合，尝试把所有Task基于数据所在位置分配给合适的Executor进程。当Task执行时，Executor进程会把缓存数据存储起来，而Driver进程同样会跟踪这些缓存数据的位置，并且利用这些位置信息来调度以后的任务，以尽量减少数据的网络传输。
4）UI展示应用运行状况
Driver程序会将一些 Spark 应用的运行时的信息通过网页界面呈现出来，默认在端口4040 上。比如，在本地模式下，访问 http://localhost:4040 就可以看到这个网页了。
2．执行器节点(Executor)
Spark Executor节点是一个工作进程，负责在 Spark 作业中运行任务，任务间相互独立。Spark 应用启动时，Executor节点被同时启动，并且始终伴随着整个 Spark 应用的生命周期而存在。如果有Executor节点发生了故障或崩溃，Spark 应用也可以继续执行，会将出错节点上的任务调度到其他Executor节点上继续运行。
执行器进程有两大作用：
1、它们负责运行组成 Spark 应用的任务，并将结果返回给驱动器进程；
2、它们通过自身的块管理器（Block Manager）为用户程序中要求缓存的 RDD 提供内存式存储。RDD 是直接缓存在Executor进程内的，因此任务可以在运行时充分利用缓存数据加速运算。
执行器程序通常都运行在专用的进程中。