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
