Google云计算技术具体包括：Google文件系统GFS、分布式计算编程模型MapReduce、分布式锁服务Chubby和分布式结构化数据存储系统Bigtable等。与之对应的有HDFS，MapReduce，Zookeeper，Hbase。

      Chubby是Google设计的提供粗粒度锁服务的一个文件系统，它基于松耦合分布式系统，解决了分布的一致性问题。这种锁只是一种建议性的锁（Advisory Lock）而不是强制性的锁（Mandatory Lock），如此选择的目的是使系统具有更大的灵活性。 Chubby是怎样实现这样的“锁”功能的？就是通过文件。Chubby中的“锁”就是文件，创建文件其实就是进行“加锁”操作，创建文件成功的那个server其实就是抢占到了“锁”。用户通过打开、关闭和读取文件，获取共享锁或者独占锁； 并且通过通信机制，向用户发送更新信息。

       GFS使用Chubby来选取一个GFS主服务器，Bigtable使用Chubby指定一个主服务器并发现、控制与其相关的子表服务器。



Chubby系统

       Chubby被划分成两个部分：客户端（client）和服务器端（Chubby cell），客户端和服务器端之间通过远程过程调用（RPC）来连接。在客户这一端每个客户应用程序都有一个Chubby程序库（Chubby Library），客户端的所有应用都是通过调用这个库中的相关函数来完成的。服务器一端称为Chubby Cell，一般是由五个称为副本（Replicas）的服务器组成的，这五个副本在配置上完全一致，并且在系统刚开始时处于对等地位。当 Chubby工作的时候，首先它需要从这些replicas中选举出一个master。Chubby是通过采consensus protocol（很可能就是Paxos算法）来解决这个问题的。

       每个master都具有一定的期限，称为master lease。在这个期限中，副本们不会再选举一个其它的master。为 了安全性和容错的考虑，所有的replicas（包括master）都维护的同一个DB的拷贝。但是，只有master能够接受client提交的操作对 DB进行读和写，而其它的replicas只是和master进行通信来update它们各自的DB。所以，一旦一个master被选举出来后，所有的 client端都只和master进行通信。如果是读操作，那么master一台机器就搞定了，如果是写操作，master会通知其它的 replicas进行update。这样的话，一旦master意外停机，那么其它的replicas也能够很快的选举出另外一个master。



`

Chubby文件系统

       Chubby的底层实现其实就是一个分布式的文件系统。Chubby的文件系统由于它的特殊用途做了很多 的简化。例如它不支持文件的转移，不记录文件最后访问时间等等。整个文件系统只包含有文件和目录，统一称为“Node”。文件系统采用Berkeley DB来保存Node的信息，主要是一种map的关系。Key就是Node的名字，Value就是Node的内容。

       Chubby cell和client之间用了event形式的通知机制。client在创建了文件之后会得到一个handle，并且还向服务器可以订阅一系列的event，例 如文件内容修改的event。这样的话，一旦client相关的文件内容被修改了，那么cell会通过机制发送一个event来告诉client该文件被 修改了。  



Chubby客户端与服务器交互

       为 了降低client和cell之间通信的压力和频率，client在本地会保存一个和自己相关的Chubby文件的cache。例如如果client通过 Chubby library在cell上创建了一个文件，那么在client本地，也会有一个相同的文件在cache中创建，这个cache中的文件的内容和cell 上文件的内容是一样的。这样的话，client如果想访问这个文件，就可以直接访问本地的cache而不通过网络去访问cell。

       cache有两个状态，有效和无效。当 有一个client要改变某个File的时候，整个修改会被master block，然后master会发送无效标志给其他cache存储了这个数据的client（它维护了这么一个表），当其它client端收到这个无效标志 后，就会将cache中的状态置为无效，然后返回一个acknowledge；当master确定收到了所有的acknowledge之后，才完成整个 modification。

         对于KeepAlive协议（就是说服务器有可能会宕机挂掉，此时必须保证服务器和客户端定期保持联系），则是为了保证client和master随时都保持着联系。client和master每隔一段时间就会KeepAlive 一次，这样的话，如果master意外停机，client可以很快的知道这个消息，然后迅速的转移到新的master上。


--------------------- 
作者：继续微笑lsj 
来源：CSDN 
原文：https://blog.csdn.net/lsjseu/article/details/16332551 
版权声明：本文为博主原创文章，转载请附上博文链接！






作者：晒太阳的猫
链接：https://www.zhihu.com/question/20477387/answer/151514737
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

Bigtable 中最重要的内容有以下几点:提出一种不同于关系型数据模型但更为灵活简单的 KV 形式的数据存储模型：稀疏的分布式可持久化多维表，其映射关系为：  (row:string, column:string, time:int64) → string 
 典型地，如论文中图例所示：<img src="https://pic3.zhimg.com/v2-7cac64d604fc84ad719fae6d7394a1d6_b.png" data-rawwidth="1600" data-rawheight="390" class="origin_image zh-lightbox-thumb" width="1600" data-original="https://pic3.zhimg.com/v2-7cac64d604fc84ad719fae6d7394a1d6_r.jpg">   查找内容时先确定 row，然后根据 row 查找特定 column，最后可根据 column 和相应的 version 确定需要查找的内容。   其中：row 是按序排列，一定范围的 row 可组成一个集合，称为 tablet，它是分布式存储和资源调度的最小单元；column 会被组合成 column family，column family 下的成员用  family:qualifer 来确定；表中的每个单元存储该内容的不同版本（以不同时间戳作为区分）并按降序排列（最新版本位于最前面）；单行可保持原子操作，跨行操作则无法保证原子性；Bigtable 会将数据持久化成 SSTable 的格式。该格式下的的 key 都是经过排序后不可变的 KV 对。每个 SSTable 由 block 组成并通过 block index 来定位每个 block。Bigtable 内存中维护着 memtable 用以处理写请求。客户端对 Bigtable 的写操作首先会被内存中 memtable 处理，当 memtable 的大小超过一定阈值时，Bigtable 将会生成新的 memtable 并将老的 memtable 以 SSTable 的格式刷入磁盘；Bigtable 依赖于 Chubby 服务来进行分布式调度和元数据存储。客户端首先要从 Chubby 中获取相应的 Root tablet，再从 Root tablet 中索引找到其他 tablet。新的 tablet 的增加和删除必须通过 Chubby 服务来操作。Chubby 服务一旦挂了，Bigtable 也就挂了，因此 Chubby 是一个高可用服务，一般有 5 个节点组成，节点间用 Paxos 协议组织，开源的类似实现有 Zookeeper 和 etcd；综上所述，SSTable 可认为是 Bigtable 中单机数据在磁盘的存储格式，而 tablet 则是分布式调度和存储的最小单元。

 