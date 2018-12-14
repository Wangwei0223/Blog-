摘要：MapReduce和它的变形在大规模数据密集型应用的实现上取得了巨大的成功。然而，多数的这些系统是围绕一个不适合其他流行应用程序的非循环数据流模型构建的。这篇文章把重点放在一类这样的应用程序：那些在多个并行操作中重用一组工作数据的应用程序。这包括许多迭代的机器学习算法，以及交互的数据分析工具。我们提出了一个叫做Spark的新框架，它支持这些应用程序，同时保持了MapReduce的可扩展性和容错性。为了实现这个目标，**Spark引入了一个抽象概念叫做resilient distributed datasets（RDDs**。RDD是一个分布在集群上的只读片，当某个RDD丢失时，可以被重建。在迭代的机器学习作业中，Spark以10x倍的优势超过Hadoop，并且可以在次秒响应时间内查询一个39GB的数据集。

1 介绍
  集群计算的新模型已广泛流行，它通过自动提供局部感知调度、容错和负载平衡的系统在不可靠机器的集群上执行数据并行计算。MapReduce开创了这种模型，像Dryad和Map-Reduce-Merge泛化了支持的数据流类型。这些系统通过提供一个编程模型来实现可**扩展性和容错性**，用户通过一组操作创建非周期数据流图来传递输入数据。这允许底层系统能在没有人为干预的情况下管理调度和回应错误。 
  该数据流编程模型对很多类的应用程序有帮助，但是存在一些应用程序不能像非周期数据流一样有效表示。在这篇文章中，我们重点放在这样一类应用程序上：那些在多个并行操作中重用一组工作数据的应用程序。这包括了两种使用情况，我们看到Hadoop用户报告MapReduce是有缺陷的： 
迭代作业：许多普通的机器学习算法为了优化一个参数（如梯度下降）需要重复地对同一个数据集使用一个函数。当每个迭代可以表示成一个MapReduce/Dryad作业时，每个作业必须从磁盘中重新加载数据，从而造成巨大的性能损失。 
交互分析：Hadoop通过SQL接口如Pig和Hive，经常在大数据集上运行特别的探索性查询。理想的情况下，用户能够将感兴趣的数据集加载到多个机器的内存中并重复查询。然而，在Hadoop下每个查询都会产生很大的延迟（几十秒），因为它以分开的MapReduce作业运行并且从磁盘中读取数据。 
  这篇文章提出了一个新的集群计算框架Spark，它支持具有工作集的应用程序，同时为MapReduce提供类似的可**扩展性的容错性**。 
  Spark中主要的抽象概念是resilient distributed dataset（RDD），RDD是一个分散在一组机器集群上的只读的对象集合，当一个分区丢失时，可以被重建。用户可以直接缓存RDD在机器集群的内存上，并且在多个像MapReduce并行操作上重复使用。RDDs通过lineage实现了容错：如果一个RDD的分区丢失了，RDD有充足的关于它如何从其它RDDs演变而来的信息，并有能力重建那块分区。虽然RDDs不是一个一般的共享内存的抽象概念，但是它们代表了一方面的表现力与另一方面的可扩展性和可靠性之间的sweet-spot，而且我们发现了它们非常适合各种应用。 
  Spark是用Scala实现的，这是一种用于Java VM的静态类型的高级编程语言，并公开了类似于DryadLINQ的功能编程接口。另外，Spark可以从Scala解释器的修改版本交互使用，允许用户定义RDD，函数，变量和类，并在集群上并行运行它们。我们相信Spark是第一个允许使用一种高效的、通用的编程语言在集群上处理大数据集的系统。 
  虽然我们的Spark实现仍然是一个原型，但是系统早期的经验是值得鼓励的。我们展示了在迭代的机器学习工作负载上Spark可以以10x倍的优势胜过Hadoop，而且它可以在次秒响应时间内扫描一个39GB的数据集。

2 编程模型
  为了使用Spark，开发者编写了一个driver program，它可以实现应用程序高水平的控制流并且并行地发起多种操作。对于并行编程，Spark提供了两个主要的抽象概念：resilient distributed datasets和parallel operations。另外，Spark支持可以在集群上运行的函数中使用的两种首先类型的共享变量，我们稍后将会解释。

2.1 Resilient Distributed Datasets（RDDs）
  RDD是一个分散在一组机器集群上的只读的对象集合，当一个分区丢失时，可以被重建。物理存储中不需要RDD的元素；RDD的句柄包含足够的信息从可靠存储中的数据开始计算RDD。这意味着RDDs总是可以在节点失败的情况下重建。 
在Spark中，每个RDD代表了一个Scala对象。Spark允许程序员用四种方法构造RDDs： 
1、 从共享文件系统中的一个file，如Hadoop分布式文件系统（HDFS）。 
2、 在驱动程序中通过“parallelizing”一个Scala集合（如一个array），这意味着将其划分成数个片段，这些片段将被发送到多个节点。 
3、 通过转变一个存在的RDD。使用一个叫做flatMap的操作，将一个有类型A元素数据集可以转变成一个有类型B元素的数据集，flatMap通过用户提供的类型A函数传递每个元素⇒ List[B]。其它转变可以用flatMap表示，包括map（通过类型A ⇒B的功能传递元素）和filter（挑选匹配谓词的元素）。 
4、 通过改变一个存在的RDD的persistence。默认情况下，RDDs是懒惰和短暂的。也就是说，数据集的分区在并行操作中使用时（例如，通过map函数传递文件块），在需要时实现，并在使用后从存储器中丢弃。然而，用户可以通过两个actions改变一个RDD的persistence： 
- Cache使数据集变得懒惰，但提示它在第一次计算后应该保存在内存中，因为它将被重用。 
- Save评估数据集，并把它写到一个分布式文件系统（如HDFS）中。保存的版本将在之后的操作中用到。 
我们注意到cache只是一个提示：如果集群中没有足够的空间缓存数据集的所有分区，Spark将重新计算。我们选择这种设计以至于Spark程序可以在结点失败或数据集太大的情况下可以继续保持工作。这个想法与虚拟内存很相似。 
  我们也打算扩展Spark，使它能够支持其他水平的persistence（如，跨多个节点的内存中复制）。我们的目标是使用户在RDD存储开销、访问速度、块丢失率和重计算开销之间做权衡。

2.2 并行操作
  运行在RDDs上的几个并行操作： 
1、 reduce：使用关联函数组合数据集元素，以在驱动程序中生成结果。 
2、 collect：发送数据集的所有元素到驱动程序。比如，一个简单的并行更新array的方式是parallelize、map和collect这个array。 
3、 foreach：通过一个用户提供的函数传递每个元素。这只适用于函数的side effects（可能是将数据复制到另一个系统或更新共享变量，如下所述）。 
  我们注意到当前的Spark没有支持类似MapReduce分组的reduce操作；reduce结果只在一个进程中收集。我们之后打算在分布式数据集上使用“shuffle”转换来支持分组的reductions。然而，就算用单个reducer，也足够表达多种有用的算法。比如，一篇最近的文章在多核系统上用MapReduce实现了10种学习算法，没有支持并行的reduction。

2.3 共享变量
  程序员通过将closures（函数）传递给Spark来调用像map，filter和reduce的操作。如典型的功能编程，这些closures可以引用它们在创建的范围内的变量。正常来说，当Spark在工作结点上运行一个closures时，这些变量会被复制到工作结点。然而，Spark也让程序员创建两个类型限制的共享变量，来支持两种简单但常见的使用模式： 
1、 Broadcast variables：如果在多个并行操作中使用大的只读数据片（如，查找表），则优先仅将其分发给工作结点一次，而不是将其与每个closures封装在一起。Spark让程序员创建一个“broadcast variables”对象，用来存放value，并且保证只复制到每个工作结点一次。 
2、 Accumulators：工作结点可以使用一个关联操作只“add”这些变量，并且只有驱动程序可以读取。他们可以用来实现计数，就像在MapReduce中一样，为并行总和提供了更为必要的语法。Accumulators可以定义成任何类型，具有“add”操作，并且赋“0”值。由于“add-only”，他们很容易进行容错。

3 例子
  现在我们展示一些Spark程序样例。注意我们忽略了变量的类型，因为Scala支持类型推断。

3.1 文本查询Text Search
  存储在HDFS的大日志文件中，我们希望统计包含errors的行数。这可以通过从文件数据集对象开始执行，如下所示：

val file = spark.textFile(“hdfs://…”)
val errs = file.filter(_.contains(“ERROR”))
val ones = errs.map(_ => 1)
val count = ones.reduce(_+_)
1
2
3
4
  我们首先创建了一个分布式数据集file以表示lines集合的HDFS文件。我们转换此数据集以创建包含“ERROR”的行集合（errs），然后map每行为1，并且使用reduce把这些1相加。Filter、map和reduce的参数是Scala的语法。 
  注意errs和ones是懒惰的RDDs，它们从不实例化。反而，当reduce调用时，每个工作结点以流的方式扫描输入块以对其进行评估，执行本地reduce来添加它们，并将其本地计数发送给驱动程序。当以这种方式使用懒惰的数据集时，Spark紧密地效仿MapReduce。 
  Spark与其它框架不同的地方在于它使一些中间数据集在操作过程中持续。举个例子，如果想要重用errs数据集，我们可以创建一个它的缓存RDD，如下所示：

val vachedErrs = errs.cache()
1
  我们现在可以像往常一样在缓存的或者派生的数据集上调用并行操作，但是在第一次计算它们之后，结点会将缓存重点cachedErrs分区缓存在内存中，大大加快了后续操作。

3.2 Logistic回归
  下面的程序实现了logistic回归，这是一个迭代的分类算法，试图找出一个最佳分割两个点集合的超平面w。算法运行梯度下降：从随机值w开始，在每次迭代中，它将w的函数与数据相加，以便在改善它的方向上移动w。因此，在迭代中把数据缓存在内存中会有不小好处。我们不在细节上解释logistic回归，但是我们将它拿来展示Spark的一些新特性。

// Read points from a text file and cache them
val points = spark.textFile(…).map(parsePoint).cache()
// Initialize w to random D-dimensional vector
var w = Vector.random(D)
// Run multiple iterations to update w
for (i <- 1 to ITERATIONS) {
    val grad = spark.accumulator(new Vector(D))
    for (p <- points) { // Runs in parallel
        val s = (1 / (1 + exp(-p.y * (w dot p.x))) - 1) * p.y
        grad += s * p.x
    }
    w -= grad.value
}
1
2
3
4
5
6
7
8
9
10
11
12
13
  首先，虽然我们创建了一个RDD points，但是我们通过运行一个for循环来处理它。Scala中的for关键字是使用循环体作为closures调用集合的foreach方法的语法。那就是说，代码for(p <- points) {body}等价于points.foreach(p => {body})。因此，我们正调用Spark的并行foreach操作。 
  第二，为了把梯度相加，我们使用了一个accumulator变量gradient（Vector类型）。注意循环中使用了重载操作符+=来add到gradient。Accumulator的组合和for语法允许Spark程序看起来像命令性的串行程序。实际上，这个例子与仅仅三行的logistic回归的串行版本不同。

3.3 交替最小均方Alternating Least Squares
  最后的例子是一个叫做Alternating Least Squares（ALS）的算法。ALS用在协同过滤的问题上，比如根据他们的电影评级历史（如Netflix挑战赛）预测用户对他们没有看到的电影评分。不像之前的例子，ALS是CPU密集型的，而不是数据密集型。 
  假设我们想要预测u个用户对于m部电影的评分，并且有一个部分填充的矩阵R包含一些用户-电影的已知评级。ALS模型R分别作为维度为m×k和k×u的两个矩阵M和U的乘积。那就是说，每个用户和每个电影有一个k维的描述特征的“特征向量”。用户对电影的评分是其特称向量和电影的特征向量的点积。ALS使用已知的评级来求解M和U，然后计算M×U来预测未知的电影。通过下面的迭代过程完成： 
1、 初始化M为一个随机值。 
2、 给定M，以最小化R上的误差优化U。 
3、 给定U，以最小化R上的误差优化M。 
4、 重复步骤2和3直到收敛。 
  ALS可以通过更新每个结点上的不同用户/电影来并行化。然而，因为所有的步骤都用到了R，把R设成broadcast variable是很有用的，这样就不需要在每个步骤重新发送给每个结点了。ALS的Spark实现如下所示。注意我们并行化从0到u（一个Scala范围对象）并且更新每个array：

val Rb = spark.broadcast(R)
for (i <- 1 to ITERATIONS) {
    U = spark.parallelize(0 until u).map(j => updateUser(j, Rb, M)).collect()
    M= spark.parallelize(0 until m).map(j => updateUser(j, Rb, U)).collect()
}
1
2
3
4
5
4 实现
  Spark建立在Mesos之上，这是一个“集群操作系统”，允许多种并行应用程序以细粒度的方式共享一个集群，并且为应用程序提供启动任务的API。这个允许Spark与现有的集群计算框架（如Hadoop和MPI的Mesos端口）一起运行，并与它们共享数据。另外，建立在Mesos大大减少了必须进入Spark的编程工作。 
  Spark的核心是resilient distributed datasets的实现。作为一个例子，假设我们定义了一个缓存数据集cachedErrs，表示日志文件里的error信息，我们使用map和reduce统计其数量，就像3.1节：

val file = spark.textFile(“hdfs://…”)
val errs = file.filter(_.contains(“ERROR”))
val cachedErrs = errs.cache()
val ones = cachedErrs.map(_ => 1)
val count = ones.reduce(_+_)
1
2
3
4
5
  这些数据集将被存储为对象链，来捕获每个RDD的lineage。每个数据集对象**包含指向其parent的指针和如何从parent转变而来的信息**。 
  每个RDD对象实现了相同的简单接口，包含了三种操作： 
1、 getPartitions，返回一列分区IDs 
2、 getIterator（partition），用来遍历一个分区 
3、 getPreferredLocations（partition），用来任务调度，实现数据局部性。 
  当并行操作在一个数据集上调用时，Spark创建了一个任务来处理数据集的每次迭代，并且发送这些任务到工作结点。通过延时调度的技术，我们尝试发送每个任务到它首选的位置。一旦在一个工作结点上启动，每个任务调用getIterator来开始读取它的分区。 
  不同类型的RDDs只是在他们如何实现RDD接口上不同。举个例子，对于HdfsTestFile，分区是HDFS中的块ID，其首选位置是块位置，getIterator打开一个流来读取块。在MappedDataset，分区和首选位置跟parent是相同的，但迭代器将map函数应用于parent元素。最后，在CachedDataset，getIterator方法查找已转换分区的本地缓存副本，并且每个分区首选位置开始等于parent进程的首选位置，但是分区缓存在某个结点上后才能更新，以优先重用该结点。这种设计很容易处理错误：如果一个结点失败了，它的分区会从它们的parent数据集上重新读取，最后缓存在其它结点上。 
这里写图片描述
  Finally, shipping tasks to workers requires shipping closures to them—both the closures used to define a distributed dataset, and closures passed to operations such as reduce. To achieve this, we rely on the fact that Scala closures are Java objects and can be serialized using Java serialization; this is a feature of Scala that makes it relatively straightforward to send a computation to another machine. Scala’s built-in closure implementation is not ideal, however, because we have found cases where a closure object references variables in the closure’s outer scope that are not actually used in its body. We have filed a bug report about this, but in the meantime, we have solved the issue by performing a static analysis of closure classes’ byte code to detect these unused variables and set the corresponding fields in the closure object to null. We omit the details of this analysis due to lack of space. 
Shared Variables：Spark中两种类型共享变量，broadcast variables和accumulators，通过使用具有自定义序列化格式的类来实现。当创建了一个值为v的broadcast variable b，v就被保存到共享文件系统中的文件。b的序列化格式是该文件的路径。当在一个工作结点查询b的值时，Spark首先检查v是否在本地缓存中，如果没有的话从文件系统中读取它。我们最开始使用HDFS来broadcast variables，但是我们正在开发一个更加高效的streaming broadcast系统。 
Accumulators使用一个不同的“序列化技巧”实现。每个accumulator创建时分配一个唯一的ID。当accumulator保存时，它的序列化格式包括其ID和对应于其类型的“0”值。在工作结点上，使用线程局部变量运行任务的每个线程创建accumulator的单独副本，在任务开始时将其重置为0。每个任务运行后，工作结点向驱动程序发送消息，驱动程序包含其对各种accumulator的更新。驱动程序从每个操作的每个分区中只更新一次为了防止失败的情况下任务被重新执行而造成的两次计数。 
Interpreter Integration：由于空间不足，我们只介绍如何将Spark集成到Scala解释器中。Scala解释器通常通过为用户输入的每一行编译一个类来操作。这个类包括一个单例对象，包含该行上的变量或函数，并在其构造函数中运行该行代码。举个例子，如果用户输入var x = 5，后面跟上println(x)，解释器定义一个包含x的类(Line1)，并且让第二行编译成println(Line1.getInstance().x)。这些类加载到JVM来运行每行。为了使解释器与Spark一同工作，我们做了两个改变： 
1、 我们使解释器将它定义的类输出到共享文件系统，工作结点可以使用自定义java类加载器从中加载它们。 
2、 我们改变了生成的代码，使得每行的单例对象直接引用先前行的单例对象，而不是通过静态getInstance方法。这允许closures捕获他们引用的单例的当前状态，只要它们被序列化，就会被发送给工作结点。如果我们没有做这个，然后更新单例对象（如，上例有一行设置x = 7），将不会传送给工作结点。

5 结果
  虽然我们的Spark的实现仍然在一个早期的阶段，但我们还是展示三个实验的结果，并与集群计算框架相结合。 
Logistic回归:我们在3.2节中的logistic回归作业的性能与Hadoop的logistic回归的实现进行了对比，在每个4核心的20个“m1.xlarge”EC2结点上使用29GB的数据集。结果如图2所示。Hadoop的每次迭代花127秒，因为它以独立的MapReduce作业运行。Spark的第一个迭代花174秒（可能由于使用了Scala而不是Java的缘故），但是随后的迭代只花了6秒，因为它们重用了缓存数据。这使得作业运行起来快来10多倍。 
  我们也尝试了在作业运行时崩溃一个结点。在10次迭代的例子中，这使平均工作减缓了50秒（21%）。在丢失结点上的数据分区被重新计算，并行地缓存其它结点上，但是恢复时间在当前的实验中相当高，因为我们使用了一个大的HDFS块（128MB），因此每个结点只有12个块，恢复的过程不能利用集群中的所有核心。更小的块将产生更快的恢复时间。 
这里写图片描述
Alternating Least Squares:我们在3.3节实现了alternating least squares作业，以衡量broadcast variables对于复制共享数据集到多个结点的迭代作业的有利之处。我们发现不使用broadcast variables，在每次迭代上重新发送评级矩阵R的时间将占据作业的运行时间。此外，使用HDFS或NFS实现的broadcast，其时间随着结点数的增长而线性增加，限制了作业的可扩展性。我们实施了一个应用级多播系统来缓解这一点。然而，即使broadcast很快，但在每次迭代上重新发送R代价还是很高。在30个结点的EC2集群中运行5000部电影和15000个用户的实验，使用一个broadcast variable在工作结点内存中缓存R提高了2.8倍性能。 
Interactive Spark: 我们使用Spark解释器在15个“m1.xlarge”EC2机器的内存中加载39GB的维基百科转储，并以交互方式进行查询。数据集第一次查询时，粗糙地花了35秒，与运行Hadoop作业相当。然而，随后的查询只花了0.5到1秒，即使是扫描所有数据。这提供了一种质量上不同的体验，与使用本地数据相当。

6 相关工作
Distributed Shared Memory:Spark的resilient distributed datasets可看作是一个分布式共享内存（distributed shared memory，DSM）的抽象概念，已经被广泛研究。RDDs与DSM接口有两种不同之处。第一，RDDs提供一个更加受限的编程模型，但它可以在集群结点失败的情况下让数据集高效地重建。一些DSM系统通过checkpointing实现了容错，而Spark使用在RDD对象中捕获的lineage信息重构丢失的RDD分区。这意味着只有丢失的分区需要重新计算，而且它们可以在不同节点上以并行的方式重新计算，不要求程序恢复到checkpoint。另外，如果没有结点失败，则没有开销。第二，RDDs把计算推给了数据，就像MapReduce，而不是让任意的结点访问一个全局的地址空间。 
  其它的系统也限制了DSM的编程模型，以提高性能、可靠性和可编程性。Munin让程序员使用它们将具有的访问模式来注释变量，以便为它们选择最优的一致性协议。Linda提供一组空间编程模型，它可能是以容错的方式实现的。Thor提供了一种永久共享对象的接口。 
集群计算框架：Spark的并行操作适合MapReduce模型。然而，它们可在持续操作的RDD上运行 。 
  Twister是一个MapReduce框架，允许长时间的map任务在作业之间保留内存中的静态数据，它也承认需要扩展MapReduce来支持迭代作业。但是当前Twister没有实现容错。Spark的抽象概念redilient distributed datasets都是容错的，比迭代MapReduce更通用。Spark程序可以定义多个RDDs，并且在其上运行操作之间交替，而Twister程序只有一个map函数和一个reduce函数。这也使Spark对于交互数据分析变得有用，用户可以在交互数据分析上定义一些数据集然后查询它们。 
  Spark的broadcast variables为Hadoop的分布式缓存提供了类似的功能，可以将文件传播到运行特定作业的所有结点。但是，broadcast variables可以在并行操作中重复利用。 
Language Integration：Spark的language integration与DryadLINQ的相似，DryadLINQ使用.NET为语言集成查询来捕获定义一个查询表大叔，并运行在集群上。不像DryadLINQ，Spark允许RDDs在并行操作中保留在内存中。另外，Spark通过支持共享变量（broadcast variables和accumulators）丰富了language integration模型。 
我们受到SMR的启发，使用Scala进行语言集成，这是一个使用closure定义map和reduce任务的Hadoop的Scala接口。我们在SMR上的贡献是共享变量和一个更加鲁棒的closure序列化实现（如第4节描述）。 
  最后，IPython是科学家的Python解释器，允许用户使用容错任务队列接口或低级消息传递接口在集群上启动计算。Spark提供了类似的交互式界面，但专注于数据密集型计算。 
Lineage：捕获数据集的lineage或来源信息长期以来一直是科学计算数据库领域的研究课题，用于解释结果的应用程序，允许其他人复制，并在工作流程步骤中发现错误时或数据集丢失时重新计算数据。Spark提供了一个受限的并行编程模型，在该模型中细粒度的lineage捕获成本低廉，因此这些信息可用于重新计算丢失的数据集元素。

7 讨论和未来工作
  Spark提供了三个简单的数据抽象：RDDs和两个受限的共享变量类型：broadcast variables和accumulators。虽然这些抽象是有限的，但是我们发现它们足够强大，可以表达几个应用程序，这些应用程序对现有的集群计算框架构成挑战，包括迭代和交互式计算。此外，我们认为，RDD背后的核心思想是具有足够信息从可靠存储中提供的数据（重新）构建数据集的句柄，可能有助于开发编程集群的其他抽象。 
  在未来的工作中，我们打算重点关注四个方面： 
1、 正式表征RDD和Spark的其它抽象属性，以及它们使用于各种类型的应用程序和工作负载。 
2、 增强RDD的抽象，以允许程序员在存储代价和重构代价中权衡。 
3、 定义新的转换RDDs的操作，包括“shuffle”操作，通过给定的key重新分割一个RDD。这样一种操作将允许我们实现分组和连接。 
4、 在Spark解释器上提供高水平的交互接口，如SQL和R shells。