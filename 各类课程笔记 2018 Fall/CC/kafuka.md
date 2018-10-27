kafka paper

kafka的核心诉求是解决海量高吞吐的log日志消息存储、读写、推送/订阅、处理问题。

在kafka出现以前，传统的企业级消息中间件存在一些问题，并不能很好地解决这个问题。比如：

用tcp的消息确认机制来保障消息送达。
消息的原子写入
消息的消费确认
这些功能固然好，然而对于log类的消息数据来说却不是必选项。和交易这样的场景不同，在很多时候，丢一两条log有时候并不是什么大不了的事情。提供这些强大保障功能的同时也意味着吞吐、性能的牺牲，比如确认机制要求一个tcp roundtrip。另外，这些系统在水平扩展上做的并不是很好。

kafka由producer、consumer、broker三部分组成。kafka的存储是以segment文件为单位的，一个segment文件存满了就创建一个新的。每次producer产生了一条消息，只需要往最后一个segment文件的末尾append一条记录即可，然后记录对应的offset。这样做提升了写消息的性能，比起mysql的写来说效率提升了2倍以上（mysql至少要写一次记录、写一次索引）。为了进一步提升写入性能，kafka只有当消息达到一定数量的时候才会刷盘。为了避免未落盘的消息被消费后，消息落盘失败而丢失的情况，kafka只有落盘的消息才可见可被读取。

为了缩减消息的长度，kafka消息没有所谓的message-id，只维护了offset。

消费者接收消息必须是顺序的，也就是说，当读到offset x的时候，x之前的所有消息都被接收到了。

kafka还利用文件系统底层提供的page cache来避免缓存消息而造成的性能开销，这样GC不会有太大的负担。

此外，kafka优化了消费者从网络获取数据的开销。一般来说，从本地文件往远程socket发送文件包括以下几个步骤：

从文件读取到系统page cache
从page cache拷贝到应用层
从应用层拷贝到内核层缓存
把数据从内核层缓存发送到socket
这个过程包括4次拷贝、2次系统调用。而利用sendfile API可以直接把数据从文件通道发送到socket通道，这样可以减少2次拷贝和一次系统调用（2、3）。

kafka提高并发和吞吐，方便水平扩展的基础是partition。

一个partition对应一个consumer group，一个consumer group由至少一个消费者组成。

一个partition里面的一条消息最多只能被一个consumer group里的一个消费者消费。如果我们允许多个消费者同时消费一个partition的消息，那么我们就必须维护状态来追踪哪个消费者消费了哪个消息。而我们只需要让partition的数量比消费者多即可避免这个开销。

为了避免broker单点故障，kafka引入了zookeeper来维护broker集群信息。

当broker启动，会把broker的信息注册到zookeeper：地址端口、topics、broker上存放的partitions。
当消费者启动，会把消费者的信息注册到zookeeper：所属的consumer group、订阅的topics。
consumer group在zookeeper注册如下信息：owner、offset。
owner：在consumer所订阅的partition下面增加consumer-id，表示partition属于该consumer。
offset：每个partition下面会保存当前partition被消费的offset值。


kafka只保证至少一次触达。




转载http://www.jasongj.com/2015/01/02/Kafka深度解析
Kafka是Apache下的一个子项目，是一个高性能跨语言分布式发布/订阅消息队列系统，而Jafka是在Kafka之上孵化而来的，即Kafka的一个升级版。具有以下特性：快速持久化，可以在O(1)的系统开销下进行消息持久化；高吞吐，在一台普通的服务器上既可以达到10W/s的吞吐速率；完全的分布式系统，Broker、Producer、Consumer都原生自动支持分布式，自动实现负载均衡；支持Hadoop数据并行加载，对于像Hadoop的一样的日志数据和离线分析系统，但又要求实时处理的限制，这是一个可行的解决方案。Kafka通过Hadoop的并行加载机制来统一了在线和离线的消息处理。Apache Kafka相对于ActiveMQ是一个非常轻量级的消息系统，除了性能非常好之外，还是一个工作良好的分布式系统。
Kafka解析
Broker
Kafka集群包含一个或多个服务器，这种服务器被称为broker
Topic
每条发布到Kafka集群的消息都有一个类别，这个类别被称为topic。（物理上不同topic的消息分开存储，逻辑上一个topic的消息虽然保存于一个或多个broker上但用户只需指定消息的topic即可生产或消费数据而不必关心数据存于何处）
Partition
parition是物理上的概念，每个topic包含一个或多个partition，创建topic时可指定parition数量。每个partition对应于一个文件夹，该文件夹下存储该partition的数据和索引文件
Producer
负责发布消息到Kafka broker
Consumer
消费消息。每个consumer属于一个特定的consumer group（可为每个consumer指定group name，若不指定group name则属于默认的group）。使用consumer high level API时，同一topic的一条消息只能被同一个consumer group内的一个consumer消费，但多个consumer group可同时消费这一消息。



如上图所示，一个典型的kafka集群中包含若干producer（可以是web前端产生的page view，或者是服务器日志，系统CPU、memory等），若干broker（Kafka支持水平扩展，一般broker数量越多，集群吞吐率越高），若干consumer group，以及一个Zookeeper集群。Kafka通过Zookeeper管理集群配置，选举leader，以及在consumer group发生变化时进行rebalance。producer使用push模式将消息发布到broker，consumer使用pull模式从broker订阅并消费消息。 

Push vs. Pull
　　作为一个messaging system，Kafka遵循了传统的方式，选择由producer向broker push消息并由consumer从broker pull消息。一些logging-centric system，比如Facebook的Scribe和Cloudera的Flume,采用非常不同的push模式。事实上，push模式和pull模式各有优劣。
　　push模式很难适应消费速率不同的消费者，因为消息发送速率是由broker决定的。push模式的目标是尽可能以最快速度传递消息，但是这样很容易造成consumer来不及处理消息，典型的表现就是拒绝服务以及网络拥塞。而pull模式则可以根据consumer的消费能力以适当的速率消费消息。

Topic & Partition
　　Topic在逻辑上可以被认为是一个queue。每条消费都必须指定它的topic，可以简单理解为必须指明把这条消息放进哪个queue里。为了使得Kafka的吞吐率可以水平扩展，物理上把topic分成一个或多个partition，每个partition在物理上对应一个文件夹，该文件夹下存储这个partition的所有消息和索引文件。

因为每条消息都被append到该partition中，是顺序写磁盘，因此效率非常高（经验证，顺序写磁盘效率比随机写内存还要高，这是Kafka高吞吐率的一个很重要的保证）。

每一条消息被发送到broker时，会根据paritition规则选择被存储到哪一个partition。如果partition规则设置的合理，所有消息可以均匀分布到不同的partition里，这样就实现了水平扩展。（如果一个topic对应一个文件，那这个文件所在的机器I/O将会成为这个topic的性能瓶颈，而partition解决了这个问题）。在创建topic时可以在$KAFKA_HOME/config/server.properties中指定这个partition的数量(如下所示)，当然也可以在topic创建之后去修改parition数量。

# The default number of log partitions per topic. More partitions allow greater
# parallelism for consumption, but this will also result in more files across
# the brokers.
num.partitions=3
 

对于传统的message queue而言，一般会删除已经被消费的消息，而Kafka集群会保留所有的消息，无论其被消费与否。当然，因为磁盘限制，不可能永久保留所有数据（实际上也没必要），因此Kafka提供两种策略去删除旧数据。一是基于时间，二是基于partition文件大小。例如可以通过配置$KAFKA_HOME/config/server.properties，让Kafka删除一周前的数据，也可通过配置让Kafka在partition文件超过1GB时删除旧数据，如下所示。

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
14
15
16
17
18
19
20
############################# Log Retention Policy #############################
# The following configurations control the disposal of log segments. The policy can
# be set to delete segments after a period of time, or after a given size has accumulated.
# A segment will be deleted whenever *either* of these criteria are met. Deletion always happens
# from the end of the log.
# The minimum age of a log file to be eligible for deletion
log.retention.hours=168
# A size-based retention policy for logs. Segments are pruned from the log as long as the remaining
# segments don't drop below log.retention.bytes.
#log.retention.bytes=1073741824
# The maximum size of a log segment file. When this size is reached a new log segment will be created.
log.segment.bytes=1073741824
# The interval at which log segments are checked to see if they can be deleted according
# to the retention policies
log.retention.check.interval.ms=300000
# By default the log cleaner is disabled and the log retention policy will default to
#just delete segments after their retention expires.
# If log.cleaner.enable=true is set the cleaner will be enabled and individual logs
#can then be marked for log compaction.
log.cleaner.enable=false
　　这里要注意，因为Kafka读取特定消息的时间复杂度为O(1)，即与文件大小无关，所以这里删除文件与Kafka性能无关，选择怎样的删除策略只与磁盘以及具体的需求有关。另外，Kafka会为每一个consumer group保留一些metadata信息–当前消费的消息的position，也即offset。这个offset由consumer控制。正常情况下consumer会在消费完一条消息后线性增加这个offset。当然，consumer也可将offset设成一个较小的值，重新消费一些消息。因为offet由consumer控制，所以Kafka broker是无状态的，它不需要标记哪些消息被哪些consumer过，不需要通过broker去保证同一个consumer group只有一个consumer能消费某一条消息，因此也就不需要锁机制，这也为Kafka的高吞吐率提供了有力保障。

Replication & Leader election
　　Kafka从0.8开始提供partition级别的replication，replication的数量可在$KAFKA_HOME/config/server.properties中配置。

default.replication.factor = 1
该 Replication与leader election配合提供了自动的failover机制。replication对Kafka的吞吐率是有一定影响的，但极大的增强了可用性。默认情况下，Kafka的replication数量为1。　　每个partition都有一个唯一的leader，所有的读写操作都在leader上完成，leader批量从leader上pull数据。一般情况下partition的数量大于等于broker的数量，并且所有partition的leader均匀分布在broker上。follower上的日志和其leader上的完全一样。
　　和大部分分布式系统一样，Kakfa处理失败需要明确定义一个broker是否alive。对于Kafka而言，Kafka存活包含两个条件，一是它必须维护与Zookeeper的session(这个通过Zookeeper的heartbeat机制来实现)。二是follower必须能够及时将leader的writing复制过来，不能“落后太多”。

leader会track“in sync”的node list。如果一个follower宕机，或者落后太多，leader将把它从”in sync” list中移除。这里所描述的“落后太多”指follower复制的消息落后于leader后的条数超过预定值，该值可在$KAFKA_HOME/config/server.properties中配置

#If a replica falls more than this many messages behind the leader, the leader will remove the follower from ISR and treat it as dead
replica.lag.max.messages=4000
#If a follower hasn't sent any fetch requests for this window of time, the leader will remove the follower from ISR (in-sync replicas) and treat it as dead
replica.lag.time.max.ms=10000
这里的复制机制即不是同步复制，也不是单纯的异步复制。事实上，同步复制要求“活着的”follower都复制完，这条消息才会被认为commit，这种复制方式极大的影响了吞吐率（高吞吐率是Kafka非常重要的一个特性）。而异步复制方式下，follower异步的从leader复制数据，数据只要被leader写入log就被认为已经commit，这种情况下如果follwer都落后于leader，而leader突然宕机，则会丢失数据。而Kafka的这种使用“in sync” list的方式则很好的均衡了确保数据不丢失以及吞吐率。follower可以批量的从leader复制数据，这样极大的提高复制性能（批量写磁盘），极大减少了follower与leader的差距（前文有说到，只要follower落后leader不太远，则被认为在“in sync” list里）

一种非常常用的选举leader的方式是“majority vote”（“少数服从多数”），但Kafka并未采用这种方式。这种模式下，如果我们有2f+1个replica（包含leader和follower），那在commit之前必须保证有f+1个replica复制完消息，为了保证正确选出新的leader，fail的replica不能超过f个。因为在剩下的任意f+1个replica里，至少有一个replica包含有最新的所有消息。这种方式有个很大的优势，系统的latency只取决于最快的几台server，也就是说，如果replication factor是3，那latency就取决于最快的那个follower而非最慢那个。majority vote也有一些劣势，为了保证leader election的正常进行，它所能容忍的fail的follower个数比较少。如果要容忍1个follower挂掉，必须要有3个以上的replica，如果要容忍2个follower挂掉，必须要有5个以上的replica。也就是说，在生产环境下为了保证较高的容错程度，必须要有大量的replica，而大量的replica又会在大数据量下导致性能的急剧下降。这就是这种算法更多用在Zookeeper这种共享集群配置的系统中而很少在需要存储大量数据的系统中使用的原因。例如HDFS的HA feature是基于majority-vote-based journal，但是它的数据存储并没有使用这种expensive的方式。
　　实际上，leader election算法非常多，比如Zookeper的Zab, Raft和Viewstamped Replication。而Kafka所使用的leader election算法更像微软的PacificA算法。
　　Kafka在Zookeeper中动态维护了一个ISR（in-sync replicas） set，这个set里的所有replica都跟上了leader，只有ISR里的成员才有被选为leader的可能。在这种模式下，对于f+1个replica，一个Kafka topic能在保证不丢失已经ommit的消息的前提下容忍f个replica的失败。在大多数使用场景中，这种模式是非常有利的。事实上，为了容忍f个replica的失败，majority vote和ISR在commit前需要等待的replica数量是一样的，但是ISR需要的总的replica的个数几乎是majority vote的一半。

Consumer group
（本节所有描述都是基于consumer hight level API而非low level API）。
　　每一个consumer实例都属于一个consumer group，每一条消息只会被同一个consumer group里的一个consumer实例消费。（不同consumer group可以同时消费同一条消息）

很多传统的message queue都会在消息被消费完后将消息删除，一方面避免重复消费，另一方面可以保证queue的长度比较少，提高效率。而如上文所将，Kafka并不删除已消费的消息，为了实现传统message queue消息只被消费一次的语义，Kafka保证保证同一个consumer group里只有一个consumer会消费一条消息。与传统message queue不同的是，Kafka还允许不同consumer group同时消费同一条消息，这一特性可以为消息的多元化处理提供了支持。实际上，Kafka的设计理念之一就是同时提供离线处理和实时处理。根据这一特性，可以使用Storm这种实时流处理系统对消息进行实时在线处理，同时使用Hadoop这种批处理系统进行离线处理，还可以同时将数据实时备份到另一个数据中心，只需要保证这三个操作所使用的consumer在不同的consumer group即可。下图展示了Kafka在Linkedin的一种简化部署。



为了更清晰展示Kafka consumer group的特性，笔者作了一项测试。创建一个topic (名为topic1)，创建一个属于group1的consumer实例，并创建三个属于group2的consumer实例，然后通过producer向topic1发送key分别为1，2，3r的消息。结果发现属于group1的consumer收到了所有的这三条消息，同时group2中的3个consumer分别收到了key为1，2，3的消息。如下图所示。



Consumer Rebalance
　　（本节所讲述内容均基于Kafka consumer high level API）
　　Kafka保证同一consumer group中只有一个consumer会消费某条消息，实际上，Kafka保证的是稳定状态下每一个consumer实例只会消费某一个或多个特定partition的数据，而某个partition的数据只会被某一个特定的consumer实例所消费。这样设计的劣势是无法让同一个consumer group里的consumer均匀消费数据，优势是每个consumer不用都跟大量的broker通信，减少通信开销，同时也降低了分配难度，实现也更简单。另外，因为同一个partition里的数据是有序的，这种设计可以保证每个partition里的数据也是有序被消费。
　　如果某consumer group中consumer数量少于partition数量，则至少有一个consumer会消费多个partition的数据，如果consumer的数量与partition数量相同，则正好一个consumer消费一个partition的数据，而如果consumer的数量多于partition的数量时，会有部分consumer无法消费该topic下任何一条消息

目前consumer rebalance的控制策略是由每一个consumer通过Zookeeper完成的。具体的控制方式如下

消息Deliver guarantee
　　通过上文介绍，想必读者已经明天了producer和consumer是如何工作的，以及Kafka是如何做replication的，接下来要讨论的是Kafka如何确保消息在producer和consumer之间传输。有这么几种可能的delivery guarantee：

At most once 消息可能会丢，但绝不会重复传输
At least one 消息绝不会丢，但可能会重复传输
Exactly once 每条消息肯定会被传输一次且仅传输一次，很多时候这是用户所想要的。
　　
Kafka的delivery guarantee semantic非常直接。当producer向broker发送消息时，一旦这条消息被commit，因数replication的存在，它就不会丢。但是如果producer发送数据给broker后，遇到的网络问题而造成通信中断，那producer就无法判断该条消息是否已经commit。这一点有点像向一个自动生成primary key的数据库表中插入数据。虽然Kafka无法确定网络故障期间发生了什么，但是producer可以生成一种类似于primary key的东西，发生故障时幂等性的retry多次，这样就做到了Exactly one。截止到目前(Kafka 0.8.2版本，2015-01-25)，这一feature还并未实现，有希望在Kafka未来的版本中实现。（所以目前默认情况下一条消息从producer和broker是确保了At least once，但可通过设置producer异步发送实现At most once）。
　　接下来讨论的是消息从broker到consumer的delivery guarantee semantic。（仅针对Kafka consumer high level API）。consumer在从broker读取消息后，可以选择commit，该操作会在Zookeeper中存下该consumer在该partition下读取的消息的offset。该consumer下一次再读该partition时会从下一条开始读取。如未commit，下一次读取的开始位置会跟上一次commit之后的开始位置相同。当然可以将consumer设置为autocommit，即consumer一旦读到数据立即自动commit。如果只讨论这一读取消息的过程，那Kafka是确保了Exactly once。但实际上实际使用中consumer并非读取完数据就结束了，而是要进行进一步处理，而数据处理与commit的顺序在很大程度上决定了消息从broker和consumer的delivery guarantee semantic。
读完消息先commit再处理消息。这种模式下，如果consumer在commit后还没来得及处理消息就crash了，下次重新开始工作后就无法读到刚刚已提交而未处理的消息，这就对应于At most once
读完消息先处理再commit。这种模式下，如果处理完了消息在commit之前consumer crash了，下次重新开始工作时还会处理刚刚未commit的消息，实际上该消息已经被处理过了。这就对应于At least once。在很多情况使用场景下，消息都有一个primary key，所以消息的处理往往具有幂等性，即多次处理这一条消息跟只处理一次是等效的，那就可以认为是Exactly once。（人个感觉这种说法有些牵强，毕竟它不是Kafka本身提供的机制，而且primary key本身不保证操作的幂等性。而且实际上我们说delivery guarantee semantic是讨论被处理多少次，而非处理结果怎样，因为处理方式多种多样，我们的系统不应该把处理过程的特性–如是否幂等性，当成Kafka本身的feature）
如果一定要做到Exactly once，就需要协调offset和实际操作的输出。精典的做法是引入两阶段提交。如果能让offset和操作输入存在同一个地方，会更简洁和通用。这种方式可能更好，因为许多输出系统可能不支持两阶段提交。比如，consumer拿到数据后可能把数据放到HDFS，如果把最新的offset和数据本身一起写到HDFS，那就可以保证数据的输出和offset的更新要么都完成，要么都不完成，间接实现Exactly once。（目前就high level API而言，offset是存于Zookeeper中的，无法存于HDFS，而low level API的offset是由自己去维护的，可以将之存于HDFS中）
　　总之，Kafka默认保证At least once，并且允许通过设置producer异步提交来实现At most once。而Exactly once要求与目标存储系统协作，幸运的是Kafka提供的offset可以使用这种方式非常直接非常容易。