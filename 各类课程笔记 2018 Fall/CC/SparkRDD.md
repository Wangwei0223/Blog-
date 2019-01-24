1. RDD是什么
**介绍**
RDD，全称为Resilient Distributed Datasets，是一个容错的、并行的数据结构，可以让用户显式地将数据存储到磁盘和内存中，并能控制数据的分区。同时，RDD还提供了一组丰富的操作来操作这些数据。在这些操作中，诸如map、flatMap、filter等转换操作实现了monad模式，很好地契合了Scala的集合操作。除此之外，RDD还提供了诸如join、groupBy、reduceByKey等更为方便的操作（注意，reduceByKey是action，而非transformation），以支持常见的数据运算。

通常来讲，针对数据处理有几种常见模型，包括：Iterative Algorithms，Relational Queries，MapReduce，Stream Processing。例如Hadoop MapReduce采用了MapReduces模型，Storm则采用了Stream Processing模型。RDD混合了这四种模型，使得Spark可以应用于各种大数据处理场景。

RDD作为数据结构，本质上是一个只读的分区记录集合。一个RDD可以包含多个分区，每个分区就是一个dataset片段。RDD可以相互依赖。如果RDD的每个分区最多只能被一个Child RDD的一个分区使用，则称之为narrow dependency；若多个Child RDD分区都可以依赖，则称之为wide dependency。不同的操作依据其特性，可能会产生不同的依赖。例如map操作会产生narrow dependency，而join操作则产生wide dependency。

Spark之所以将依赖分为narrow与wide，基于两点原因。

首先，narrow dependencies可以支持在同一个cluster node上以管道形式执行多条命令，例如在执行了map后，紧接着执行filter。相反，wide dependencies需要所有的父分区都是可用的，可能还需要调用类似MapReduce之类的操作进行跨节点传递。

其次，则是从失败恢复的角度考虑。narrow dependencies的失败恢复更有效，因为它只需要重新计算丢失的parent partition即可，而且可以并行地在不同节点进行重计算。而wide dependencies牵涉到RDD各级的多个Parent Partitions。下图说明了narrow dependencies与wide dependencies之间的区别：

**容错**
支持容错通常采用两种方式：数据复制或日志记录。对于以数据为中心的系统而言，这两种方式都非常昂贵，因为它需要跨集群网络拷贝大量数据，毕竟带宽的数据远远低于内存。

RDD天生是支持容错的。首先，它自身是一个不变的(immutable)数据集，其次，它能够记住构建它的操作图（Graph of Operation），因此当执行任务的Worker失败时，完全可以通过操作图获得之前执行的操作，进行重新计算。由于无需采用replication方式支持容错，很好地降低了跨网络的数据传输成本。

不过，在某些场景下，Spark也需要利用记录日志的方式来支持容错。例如，在Spark Streaming中，针对数据进行update操作，或者调用Streaming提供的window操作时，就需要恢复执行过程的中间状态。此时，需要通过Spark提供的checkpoint机制，以支持操作能够从checkpoint得到恢复。

针对RDD的wide dependency，最有效的容错方式同样还是采用checkpoint机制。不过，似乎Spark的最新版本仍然没有引入auto checkpointing机制

**分区**
分两种情况，创建 RDD 时和通过转换操作得到新 RDD 时。对于前者，在调用 textFile 和 parallelize 方法时候手动指定分区个数即可。例如 sc.parallelize(Array(1, 2, 3, 5, 6), 2) 指定创建得到的 RDD 分区个数为 2。对于后者，直接调用 repartition  方法即可。实际上分区的个数是根据转换操作对应多个 RDD 之间的依赖关系来确定，窄依赖子 RDD 由父 RDD 分区个数决定，例如 map 操作，父 RDD 和子 RDD 分区个数一致；Shuffle 依赖则由分区器（Partitioner）决定，例如 groupByKey(new HashPartitioner(2)) 或者直接 groupByKey(2) 得到的新 RDD 分区个数等于 2。

2. Spark Collect 
3. Spark faltmap

总结：
1. map会将每一条输入映射为一个新对象。
    {苹果，梨子}.map(去皮） = {去皮苹果，去皮梨子}      
    其中：   “去皮”函数的类型为：A => B 
2. flatMap包含两个操作：会将每一个输入对象输入映射为一个新集合，然后把这些新集合连成一个大集合。   {苹果，梨子}.flatMap(切碎)  = {苹果碎片1，苹果碎片2，梨子碎片1，梨子碎片2}    其中：   “切碎”函数的类型为： A => List<B>

总结：
- Spark 中 map函数会对每一条输入进行指定的操作，然后为每一条输入返回一个对象；

- 而flatMap函数则是两个操作的集合——正是“先映射后扁平化”：

   操作1：同map函数一样：对每一条输入进行指定的操作，然后为每一条输入返回一个对象

   操作2：最后将所有对象合并为一个对象

4. RDD dataFrame, dataSet区别

通过这张图已经能够比较清晰的了解rdd和dataframe的基本特性，spark 1.6又引入了dateset的概念，这三者的特点如下：
rdd的优点：
1.强大，内置很多函数操作，group，map，filter等，方便处理结构化或非结构化数据
2.面向对象编程，直接存储的java对象，类型转化也安全
rdd的缺点：1.由于它基本和hadoop一样万能的，因此没有针对特殊场景的优化，比如对于结构化数据处理相对于sql来比非常麻烦
2.默认采用的是java序列号方式，序列化结果比较大，而且数据存储在java堆内存中，导致gc比较频繁

dataframe的优点：1.结构化数据处理非常方便，支持Avro, CSV, elastic search, and Cassandra等kv数据，也支持HIVE tables, MySQL等传统数据表

2.有针对性的优化，由于数据结构元信息spark已经保存，序列化时不需要带上元信息，大大的减少了序列化大小，而且数据保存在堆外内存中，减少了gc次数。
3.hive兼容，支持hql，udf等

dataframe的缺点：1.编译时不能类型转化安全检查，运行时才能确定是否有问题
2.对于对象支持不友好，rdd内部数据直接以java对象存储，dataframe内存存储的是row对象而不能是自定义对象
dataset的优点：1.dataset整合了rdd和dataframe的优点，支持结构化和非结构化数据2.和rdd一样，支持自定义对象存储3.和dataframe一样，支持结构化数据的sql查询4.采用堆外内存存储，gc友好5.类型转化安全，代码友好6.官方建议使用dataset

### PPT

Spark Hadoop 区别
一个Application和一个SparkContext相关联，每个Application中可以有一个或多个Job，可以并行或者串行运行 Job。Spark中的一个Action可以触发一个Job的运行。在Job里面又包含了多个Stage，Stage是以Shuffle进行划分的。在 Stage中又包含了多个Task，多个Task构成了Task Set。

Mapreduce中的每个Task分别在自己的进程中运行，当该Task运行完的时候，该进程也就结束了。和Mapreduce不一样的是，Spark中多个Task可以运行在一个进程里面，而且这个进程的生命周期和Application一样，即使没有Job在运行。

　　这个模型有什么好处呢?可以加快Spark的运行速度!Tasks可以快速地启动，并且处理内存中的数据。但是这个模型有的缺点就是粗粒度的资源管理，每个Application拥有固定数量的executor和固定数量的内存。

Spark VS Hadoop有哪些异同点？

       Hadoop:分布式批处理计算，强调批处理，常用于数据挖掘、分析

       Spark:是一个基于内存计算的开源的集群计算系统，目的是让数据分析更加快速, Spark是一种与 Hadoop相似的开源集群计算环境，但是两者之间还存在一些不同之处，这些有用的不同之处使 Spark在某些工作负载方面表现得更加优越，换句话说，Spark启用了内存分布数据集，除了能够提供交互式查询外，它还可以优化迭代工作负载。

Spark是在 Scala语言中实现的，它将 Scala用作其应用程序框架。与 Hadoop不同，Spark和 Scala能够紧密集成，其中的 Scala可以像操作本地集合对象一样轻松地操作分布式数据集。

尽管创建 Spark是为了支持分布式数据集上的迭代作业，但是实际上它是对 Hadoop的补充，可以在 Hadoop 文件系统中并行运行。通过名为Mesos的第三方集群框架可以支持此行为。Spark由加州大学伯克利分校 AMP实验室 (Algorithms,Machines,and People Lab)开发，可用来构建大型的、低延迟的数据分析应用程序。

虽然 Spark与 Hadoop有相似之处，但它提供了具有有用差异的一个新的集群计算框架。首先，Spark是为集群计算中的特定类型的工作负载而设计，即那些在并行操作之间重用工作数据集（比如机器学习算法）的工作负载。为了优化这些类型的工作负载，Spark引进了内存集群计算的概念，可在内存集群计算中将数据集缓存在内存中，以缩短访问延迟.

在大数据处理方面相信大家对hadoop已经耳熟能详，基于GoogleMap/Reduce来实现的Hadoop为开发者提供了map、reduce原语，使并行批处理程序变得非常地简单和优美。Spark提供的数据集操作类型有很多种，不像Hadoop只提供了Map和Reduce两种操作。比如map,filter, flatMap,sample, groupByKey,reduceByKey, union,join, cogroup,mapValues, sort,partionBy等多种操作类型，他们把这些操作称为Transformations。同时还提供Count,collect,reduce, lookup, save等多种actions。这些多种多样的数据集操作类型，给上层应用者提供了方便。各个处理节点之间的通信模型不再像Hadoop那样就是唯一的Data Shuffle一种模式。用户可以命名，物化，控制中间结果的分区等。可以说编程模型比Hadoop更灵活.

 

Spark解决了hadoop的哪些问题呢？

1.      抽象层次低，需要手工编写代码来完成，使用上难以上手。

=》基于RDD的抽象，实数据处理逻辑的代码非常简短。

2.      只提供两个操作，Map和Reduce，表达力欠缺。

=》提供很多转换和动作，很多基本操作如Join，GroupBy已经在RDD转换和动作中实现。（而hadoop完全需要自己实现，spark的scala都已经封装好了）。

3.      一个Job只有Map和Reduce两个阶段，复杂的计算需要大量的Job完成，Job之间的依赖关系是由开发者自己管理的。

=》一个Job可以包含RDD的多个转换操作，在调度时可以生成多个阶段（stage），而且如果多个map操作的RDD分区不变，是可以放在同一个Task中进行。

4.      处理逻辑隐藏在代码细节中，没有整体逻辑

=》在Scala中，通过匿名函数和高阶函数，RDD的转换支持流式API，可以提供处理逻辑的整体视图。代码不包含具体操作的实现细节，逻辑更清晰。

5.      中间结果也放在HDFS文件系统中

 =》中间结果放在内存中，内存放不下了会写入本地磁盘，而不是HDFS。

6.      ReduceTask需要等待所有MapTask都完成后才可以开始

=》分区相同的转换构成流水线放在一个Task中运行，分区不同的转换需要Shuffle，被划分到不同的Stage中，需要等待前面的Stage完成后才可以开始。

7.      时延高，只适用Batch数据处理，对于交互式数据处理，实时数据处理的支持不够。

=》通过将流拆成小的batch提供Discretized Stream处理流数据。

8.      对于迭代式数据处理性能比较差

=》通过在内存中缓存数据，提高迭代式计算的性能。
Hadoop，Spark和Storm是目前最重要的三大分布式计算系统，Hadoop常用于离线的复杂的大数据处理，Spark常用于离线的快速的大数据处理，而Storm常用于在线的实时的大数据处理。


### spark 比 mapreduce
Spark计算比MapReduce快的根本原因在于DAG计算模型。一般而言，DAG相比Hadoop的MapReduce在大多数情况下可以减少shuffle次数。Spark的DAGScheduler相当于一个改进版的MapReduce，如果计算不涉及与其他节点进行数据交换，Spark可以在内存中一次性完成这些操作，也就是中间结果无须落盘，减少了磁盘IO的操作。但是，如果计算过程中涉及数据交换，Spark也是会把shuffle的数据写磁盘的！！！另外有同学提到，Spark是基于内存的计算，所以快，这也不是主要原因，要对数据做计算，必然得加载到内存，Hadoop也是如此，只不过Spark支持将需要反复用到的数据给Cache到内存中，减少数据加载耗时，所以Spark跑机器学习算法比较在行（需要对数据进行反复迭代）。Spark基于磁盘的计算依然也是比Hadoop快。刚刚提到了Spark的DAGScheduler是个改进版的MapReduce，所以Spark天生适合做批处理的任务。而不是某些同学说的：Hadoop更适合做批处理，Spark更适合做需要反复迭代的计算。Hadoop的MapReduce相比Spark真是没啥优势了。但是他的HDFS还是业界的大数据存储标准

spark中rdd经过若干次transform操作，由于transform操作是lazy的，因此，当rdd进行action操作时，rdd间的转换关系也会被提交上去，得到rdd内部的依赖关系，进而根据依赖，划分出不同的stage。DAG是有向无环图，一般用来描述任务之间的先后关系，spark中的DAG就是rdd内部的转换关系，这些转换关系会被转换成依赖关系，进而被划分成不同阶段，从而描绘出任务的先后顺序

#### 41
Resilient Distributed Datasets (RDDs)
• Write programs in terms of operations on distributed datasets
• Partitioned collections of objects spread across a cluster, stored in
memory or on disk
• RDDs built and manipulated through a diverse
set of parallel transformations (map, filter, join)
and actions (count, collect, save)
• RDDs automatically rebuilt on machine failure

**What is RDD.**

Resilient Distributed Datasets (RDD) is a fundamental data structure of Spark. It is an immutable distributed collection of objects. Each dataset in RDD is divided into logical partitions, which may be computed on different nodes of the cluster. RDDs can contain any type of Python, Java, or Scala objects, including user-defined classes.

Formally, an RDD is a read-only, partitioned collection of records. RDDs can be created through deterministic operations on either data on stable storage or other RDDs. RDD is a fault-tolerant collection of elements that can be operated on in parallel.

There are two ways to create RDDs − parallelizing an existing collection in your driver program, or referencing a dataset in an external storage system, such as a shared file system, HDFS, HBase, or any data source offering a Hadoop Input Format.

Spark makes use of the concept of RDD to achieve faster and efficient MapReduce operations. Let us first discuss how MapReduce operations take place and why they are not so efficient.


rdd是spark的灵魂，中文翻译弹性分布式数据集，一个rdd代表一个可以被分区的只读数据集。
rdd内部可以有许多分区(partitions)，每个分区又拥有大量的记录(records)。

rdd的五个特征：
**dependencies**:建立RDD的依赖关系，主要rdd之间是宽窄依赖的关系，具有窄依赖关系的rdd可以在同一个stage中进行计算。
**partition：**一个rdd会有若干个分区，分区的大小决定了对这个rdd计算的粒度，每个rdd的分区的计算都在一个单独的任务中进行。**preferedlocations:**按照“移动数据不如移动计算”原则，在spark进行任务调度的时候，优先将任务分配到数据块存储的位置
**compute：**spark中的计算都是以分区为基本单位的，compute函数只是对迭代器进行复合，并不保存单次计算的结果。
**partitioner：**只存在于（K,V）类型的rdd中，非（K,V）类型的partitioner的值就是None。
**rdd的算子主要分成2类**，action和transformation。这里的算子概念，可以理解成就是对数据集的变换。action会触发真正的作业提交，而transformation算子是不会立即触发作业提交的。每一个 transformation() 方法返回一个 新的RDD。只是某些transformation() 比较复杂，会包含多个子 transformation()，因而会生成多个 RDD。这就是实际 RDD 个数比我们想象的多一些 的原因。通常是，当遇到action算子时会触发一个job的提交，然后反推回去看前面的transformation算子，进而形成一张有向无环图。在DAG中又进行stage的划分，划分的依据是依赖是否是shuffle的，每个stage又可以划分成若干task。接下来的事情就是driver发送task到executor，executor自己的线程池去执行这些task，完成之后将结果返回给driver。action算子是划分不同job的依据。shuffle dependency是stage划分的依据。
**再说几观点：**spark程序中，我们用到的每一个rdd，在丢失或者操作失败后都是重建的。rdd更多的是一个逻辑概念，我们对于rdd的操作最终会映射到内存或者磁盘当中，也就是操作rdd通过映射就等同于操作内存或者磁盘。在实际的生产环境中，rdd内部的分区数以及分区内部的记录数可能远比我们想象的多。RDD 本身的依赖关系由 transformation() 生成的每一个 RDD 本身语义决定。每个 RDD 中的 compute() 调用 parentRDD.iter() 来将 parent RDDs 中的 records 一个个 拉取过来。