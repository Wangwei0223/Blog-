### Lecture-2

#### 1  Cluster
Such clusters run Hadoop's open source distributed processing software on low-cost commodity computers. Typically one machine in the cluster is designated as the NameNode and another machine the as JobTracker; these are the masters. The rest of the machines in the cluster act as both DataNode and TaskTracker; these are the slaves. Hadoop clusters are often referred to as "shared nothing" systems because the only thing that is shared between nodes is the network that connects them. 

Hadoop clusters are known for boosting the speed of data analysis applications. They also are highly scalable: If a cluster's processing power is overwhelmed by growing volumes of data, additional cluster nodes can be added to increase throughput. Hadoop clusters also are highly resistant to failure because each piece of data is copied onto other cluster nodes, which ensures that the data is not lost if one node fails.

#### 3

#### 4
**Hadoop 定义:**

Overview
Hadoop MapReduce is a software framework for easily writing applications which process vast amounts of data (multi-terabyte data-sets) in-parallel on large clusters (thousands of nodes) of commodity hardware in a reliable, fault-tolerant manner.

A MapReduce job usually splits the input data-set into independent chunks which are processed by the map tasks in a completely parallel manner. The framework sorts the outputs of the maps, which are then input to the reduce tasks. Typically both the input and the output of the job are stored in a file-system. The framework takes care of scheduling tasks, monitoring them and re-executes the failed tasks.

Typically the compute nodes and the storage nodes are the same, that is, the MapReduce framework and the Hadoop Distributed File System (see HDFS Architecture Guide) are running on the same set of nodes. This configuration allows the framework to effectively schedule tasks on the nodes where data is already present, resulting in very high aggregate bandwidth across the cluster.

The MapReduce framework consists of a single master JobTracker and one slave TaskTracker per cluster-node. The master is responsible for scheduling the jobs' component tasks on the slaves, monitoring them and re-executing the failed tasks. The slaves execute the tasks as directed by the master.

Minimally, applications specify the input/output locations and supply map and reduce functions via implementations of appropriate interfaces and/or abstract-classes. These, and other job parameters, comprise the job configuration. The Hadoop job client then submits the job (jar/executable etc.) and configuration to the JobTracker which then assumes the responsibility of distributing the software/configuration to the slaves, scheduling tasks and monitoring them, providing status and diagnostic information to the job-client.

Although the Hadoop framework is implemented in JavaTM, MapReduce applications need not be written in Java.

Hadoop Streaming is a utility which allows users to create and run jobs with any executables (e.g. shell utilities) as the mapper and/or the reducer.
Hadoop Pipes is a SWIG- compatible C++ API to implement MapReduce applications (non JNITM based).

**Input and Output**
The MapReduce framework operates exclusively on <key, value> pairs, that is, the framework views the input to the job as a set of <key, value> pairs and produces a set of <key, value> pairs as the output of the job, conceivably of different types.

The key and value classes have to be serializable by the framework and hence need to implement the Writable interface. Additionally, the key classes have to implement the WritableComparable interface to facilitate sorting by the framework.

Input and Output types of a MapReduce job:

(input) <k1, v1> -> map -> <k2, v2> -> combine -> <k2, v2> -> reduce -> <k3, v3> (output)

#### 10
**message passing interface (MPI)**
The message passing interface (MPI) is a standardized means of exchanging messages between multiple computers running a parallel program across distributed memory.


In parallel computing, multiple computers -- or even multiple processor cores within the same computer -- are called nodes.  Each node in the parallel arrangement typically works on a portion of the overall computing problem. The challenge then is to synchronize the actions of each parallel node, exchange data between nodes and provide command and control over the entire parallel cluster. The message passing interface defines a standard suite of functions for these tasks

#### 11 
**Concurrency的局限性**
**one-off**
one-off (plural one-offs) (idiomatic) Something that is done, created, etc. only once, and often quickly, simply, or improvisationally. 

#### 12 
**Concurrency的局限性**

#### 14
Hive-从上面的定义我们可以了解到，Hive是一种建立在Hadoop文件系统上的数据仓库架构，并对存储在HDFS中的数据进行分析和管理

Yarn- 资源管理
说白了，yarn就是一个分布式的操作系统，逻辑上他是一个资源池，然后分给你，这个资源分配跟操作系统是一样的概念呀，但是物理上，他是集群组合起来的

#### 17
Divide and Conquer

#### 18
**Parallelization Challenges**

#### 21
- HDFS:
The Hadoop Distributed File System (HDFS) is a distributed file system designed to run on commodity hardware. It has many similarities with existing distributed file systems. However, the differences from other distributed file systems are significant. HDFS is highly fault-tolerant and is designed to be deployed on low-cost hardware. HDFS provides high throughput access to application data and is suitable for applications that have large data sets. HDFS relaxes a few POSIX requirements to enable streaming access to file system data. HDFS was originally built as infrastructure for the Apache Nutch web search engine project. HDFS is now an Apache Hadoop subproject. The project URL is http://hadoop.apache.org/hdfs/.

HDFS-GFS区别:
main difference will be mainly in

Node Division:

HDFS contain single NameNode and many DataNodes in is file system. GFS contain single Master Node and multiple Chunk Servers and is accessed by multiple clients.

Block size:

Default block size in GFS is 64MB and default block size in HDFS is 128MB and both of this file system blocks can be altered by the user.

Location of Chunk:

In GFS master does not keep a persistent record of which chunkservers have a replica of a given chunk. It simply check the status of the chunkservers for that information at startup. In HDFS chunk location information consistently maintained by NameNode.

Atomic Record Appends:

GFS provides record append with this client specifies the offset at which data is to be written. It allows many clients on different machines append to the same file concurrently with this random file writes are possible. GFS allows multiple writer and multiple reader. In HDFS only append is possible.

Data Integrity:

In GFS ChunkServers use checksums to detect corruption of the stored data. Comparison of the replicas is another alternative. The HDFS client software implements checksum checking on the contents of HDFS files when DataNode arrives corrupted.

Deletion:

GFS has unique garbage collection process. The resources of deleted files are not reclaimed immediately and are renamed in the hidden namespace which are further deleted if they are found existing for 3 days of regular scan. In HDFS Deleted files are renamed into a particular folder and are then removed via garbage collection process.

Snapshot:

Individual files and directories can be snapshotted in GFS. Up to 65,536 snapshots allowed for each directory in HDFS.

#### 26
HDFS Architecture

#### 27
**When an input file is added to HDFS**
- File is split into smaller blocks of fixed size
- Each block is replicated
- Each replicated block is stored on a different host

**Block size is configurable. Default is 128/256MB.**

**Replication level is configurable. Default is 3**
- Replication is necessary for
    • Scaling
    • High Availability

**In case a host crashes or is removed**
- All blocks on that host are automatically replicated to other hosts

**In case a host is added**
- Blocks will be rebalanced so that some blocks from other hosts will be placed on the new host

#### 28 HDFS 有两个Node
Name Node 和 DataNode各作用

#### 29 HDFS 原理图

#### 30 HDFS 原理图

#### 33 MapReduce 定义 & 过程
MapReduce is a framework for processing parallelizable problems across large datasets using a large number of computers (nodes), collectively referred to as a cluster (if all nodes are on the same local network and use similar hardware) or a grid (if the nodes are shared across geographically and administratively distributed systems, and use more heterogenous hardware). Processing can occur on data stored either in a filesystem (unstructured) or in a database (structured). MapReduce can take advantage of the locality of data, processing it near the place it is stored in order to minimize communication overhead.

A MapReduce framework (or system) is usually composed of three operations (or steps):

Map: each worker node applies the map function to the local data, and writes the output to a temporary storage. A master node ensures that only one copy of redundant input data is processed.
Shuffle: worker nodes redistribute data based on the output keys (produced by the map function), such that all data belonging to one key is located on the same worker node.
Reduce: worker nodes now process each group of output data, per key, in parallel.
MapReduce allows for distributed processing of the map and reduction operations. Maps can be performed in parallel, provided that each mapping operation is independent of the others; in practice, this is limited by the number of independent data sources and/or the number of CPUs near each source. Similarly, a set of 'reducers' can perform the reduction phase, provided that all outputs of the map operation that share the same key are presented to the same reducer at the same time, or that the reduction function is associative. While this process can often appear inefficient compared to algorithms that are more sequential (because multiple instances of the reduction process must be run), MapReduce can be applied to significantly larger datasets than a single "commodity" server can handle – a large server farm can use MapReduce to sort a petabyte of data in only a few hours.[13] The parallelism also offers some possibility of recovering from partial failure of servers or storage during the operation: if one mapper or reducer fails, the work can be rescheduled – assuming the input data is still available.

Another way to look at MapReduce is as a 5-step parallel and distributed computation:

Prepare the Map() input – the "MapReduce system" designates Map processors, assigns the input key value K1 that each processor would work on, and provides that processor with all the input data associated with that key value.
Run the user-provided Map() code – Map() is run exactly once for each K1 key value, generating output organized by key values K2.
"Shuffle" the Map output to the Reduce processors – the MapReduce system designates Reduce processors, assigns the K2 key value each processor should work on, and provides that processor with all the Map-generated data associated with that key value.
Run the user-provided Reduce() code – Reduce() is run exactly once for each K2 key value produced by the Map step.
Produce the final output – the MapReduce system collects all the Reduce output, and sorts it by K2 to produce the final outcome.
These five steps can be logically thought of as running in sequence – each step starts only after the previous step is completed – although in practice they can be interleaved as long as the final result is not affected.

In many situations, the input data might already be distributed ("sharded") among many different servers, in which case step 1 could sometimes be greatly simplified by assigning Map servers that would process the locally present input data. Similarly, step 3 could sometimes be sped up by assigning Reduce processors that are as close as possible to the Map-generated data they need to process

#### 33 Job Tracker & Task Tracker
Similar to HDFS, there are two main processes involved in the execution of any program, which also works using the Master Slave concept. They are Job Tracker and Task Tracker. Job Tracker is the master process, which receives requests for any program execution from a client. It then gets related metadata information from NameNode and assigns it to Task Tracker for further execution. The following figure illustrates the overall architecture including Job Tracker and Task Tracker:

#### 37 Hadoop API
Mapper Reducer/Combiner Partitioner

#### 38 MapReduce 流程图

#### 39 How Many Mappers & How many Reducer
- Depends on the size of input data
- Typically 1 mapper per data block
- So 1 GB input data will have around 8 Mappers
    • Assuming 128MB block size

How many reducers?
- Depends on cluster reducer capacity
- Can be set depending on the expected number of keys
- For large data sets, set it to cluster reducer capacity

#### 40 Combine & Partition

**InputFormat类**：该类的作用是将输入的文件和数据分割成许多小的split文件，并将split的每个行通过LineRecorderReader解析成<Key,Value>,通过job.setInputFromatClass()函数来设置，默认的情况为类TextInputFormat，其中Key默认为字符偏移量，value是该行的值。

**Map类**：根据输入的<Key,Value>对生成中间结果，默认的情况下使用Mapper类，该类将输入的<Key,Value>对原封不动的作为中间按结果输出，通过job.setMapperClass()实现。实现Map函数。

**Combine类**：实现combine函数，该类的主要功能是合并相同的key键，通过job.setCombinerClass()方法设置，默认为null，不合并中间结果。实现map函数

**Partitioner类**： 该该主要在Shuffle过程中按照Key值将中间结果分成R份，其中每份都有一个Reduce去负责，可以通过job.setPartitionerClass()方法进行设置，默认的使用hashPartitioner类。实现getPartition函数

**Reducer类**：将中间结果合并，得到中间结果。通过job.setReduceCalss()方法进行设置，默认使用Reducer类，实现reduce方法。

**OutPutFormat类**：该类负责输出结果的格式。可以通过job.setOutputFormatClass()方法进行设置。默认使用TextOUtputFormat类，得到<Key,value>对。
note：hadoop主要是上面的六个类进行mapreduce操作，使用默认的类，处理的数据和文本的能力很有限，具体的项目中，用户通过改写这六个类（重载六个类），完成项目的需求。说实话，我刚开始学的时候，我怀疑过Mapreudce处理数据功能，随着学习深入，真的很钦佩mapreduce的设计，基本就二个函数，通过重载，可以完成所有你想完成的工作。

#### 45 Shuffle & Sort 

#### 51 Distributed Cache
**Distributed Cache**
– Usually used for files of small size
– Provides a convenient way to propagate applications and configuration files
– HDFS is not used handle such files due to their small size
– Shared across all nodes in the MapReduce cluster

Distributed cache is a mechanism supported by hadoop mapreduce framework where we can broadcast small or moderate sized files (read only) to all the worker nodes where the map/reduce tasks are running for a given job.

Each worker node that runs the tasks of a given job will have one copy of the file(s) sent via Distributed cache. It is possible to control the size of distributed cache with cache size property in mapred-site.xml

After successful run of the job, the distributed cache files (these are temporary files) will be deleted from worker nodes.

