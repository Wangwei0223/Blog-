一、Openstack是什么？
可以简单理解为IAAS的一个实现
标准很通用，支持多个厂商虚拟机
版本采用A-Z开头的不同字母
有开源的社区，发展最为迅猛
代码放在github，好多个组织都开放了自己的openstack社区网站，只能自己一个个去看了。
二、其他开源的云计算系统有哪些？
比较著名的有：Eucalptus、OpenNebula和Cloudstack
他们的共同点：厂商不够强大，不够开放
三、Openstack的优势
模块松耦合
组建配置比较灵活
二次开发容易
四、Openstack的基础三大组件
核心架构.jpg

作者：K1024
链接：https://www.jianshu.com/p/b570db4016ff
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。


OpenStack 主要目的是做一整套的云计算基础构架。包括 云计算(Compute), 网络(Network)，对象存贮(Object Store)，镜像文件存储 (Image)，身份认证(Authentication)，BlockStorage 以及 前端UI 。OpenStack的每个模块都对外提供API，可以独立供云用户调用，在OpenStack内部，每个模块之间的相互调用也是用这些API.The OpenStack project as a whole is designed to "deliver(ing) a massively scalable cloud operating system."而 Hadoop 是一个分布式数据库。举个例子：OpenStack 中 Object Store 模块可以选择用Hadoop来支持。如果把 Openstack 比作WIndows的话，Hadoop 相当于Sql Server

作者：赵锐
链接：https://www.zhihu.com/question/20475470/answer/19934931
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


先说Docker干啥用的。因为现在物理服务器是很强大的，我们如果在一台物理服务器上只跑一个服务就浪费了，而同时跑很多服务他们又互相影响，比如说一个服务出了内存泄漏把整个服务器的内存都占满了，其他服务都跟着倒霉。所以要把每个服务都隔离起来，让它们只使用自己那部分有限的cpu，内存和磁盘，以及自己依赖的软件包。这个早先是用虚拟机来实现隔离的，但是每个虚拟机都要装自己的操作系统核心，这是对资源有点浪费。于是就有了Docker, 一个机器上可以装十几个到几十个docker，他们共享操作系统核心，占用资源少，启动速度快。但又能提供了资源（cpu, 内存，磁盘等）的一定程度的隔离。

然后使用docker给软件开发又带来了不少额外的好处。比如说运维省心啊，所有物理服务器的配置几乎都是一样的，只是上面跑的docker container不同。以前某个服务访问量大了，需要多几台服务器，你得一台一台准备，现在直接docker配好，要几个就给几个。

还有依赖关系管理也容易了，每个docker image都可以独立配置自己需要的软件包，准备一个配置文件就可以发布，不像以前配置个apache + php就在一台物理主机上从头编译到尾，如果想再多个插件，往往是从头又来一遍，机器多了是受不了的。而且依赖有冲突也没那么怕了，都隔离了嘛。

现在docker的隔离性已经做的非常好了。我觉得docker有个问题是linux宿主和windows宿主的docker实现差异还挺大的。linux是基于linux核心的namespaces和cgroup等来隔离资源，还有libvirt这样的接口实现，基本上能当个虚拟机来用，又很轻量级。windows方面主要是靠微软，微软做得也还不错，前后搞了好几种container方案，前段时候我试过的是基于hyper-v的, 功能应该都在了，所以说现在docker在windows主机上也是能用的, 这对国内庞大的windows服务器保有量也是个福音。不过在windows上面使用docker开发是没问题，生产环境我就不确定了。


<div class="RichContent RichContent--unescapable"><div class="RichContent-inner"><span class="RichText ztext CopyrightRichText-richText" itemprop="text"><p>同学，你知道服务器吗？那，虚拟机呢？<br>你知道网站是运行在服务器上的吧？<br>网站怎么运行的呢？需要有东西装网站吧？<br>服务器就是装网站的地方啊～<br>那服务器大不大？虚拟机大不大？<br>开个服务器好麻烦呀～<br>买个服务器好贵啊～<br>服务器配置那些环境真的好烦啊，搞不定啊～</p><p>所以，docker来了。</p><p>docker是容器，放啥呢？<br>放应用。<br>应用是啥？<br>一个网站就是应用啊～<br>一个程序也是应用啊～<br>甚至，一个系统也是应用啊～<br>从此以后我就不用配环境了，<br>也不用装环境了，<br>更不用统一环境了，<br>因为docker都打包好了啊～<br>开一个容器还不到一秒，<br>环境什么的，别人也都配好了，<br>我就老老实实写代码就OK了啊，<br>崩溃了重启嘛，<br>重启才三秒。</p><p>所以，docker就是用来存放应用的一个容器。</p><p>就像<br>杯子可以存水，<br>笔筒可以放笔，<br>酒瓶可以盛酒，<br>书包可以装书，<br>相机可以存照片，<br>电脑可以放小电影<br>一样。</p><p>docker就是跑应用的一种容器。</p><p>更轻量，更简单，更快速，更，好玩。</p><hr><p>container: 容器，是指image的运行时，包含了文件资源（image展开）和系统资源（变成process存在于系统中）</p><p>image: 镜像，是指将应用打包好之后的存储方式，一个image包含多层layer</p><p>layer: 在Dockerfile中每一步都会产生一层layer，每一步的结果产出变成文件</p><p>Dockerfile: 一种构建image的文件的DSL</p><p>docker: 可以通过Dockerfile构建image，也可以将image运行，使其变成container</p><p>moby: docker项目的新名字，docker公司的一步棋</p><p>docker-compose: Python写的一个docker编排工具</p><p>docker swarm: docker公司推出的容器调度平台</p><p>kubernetes: google主导的容器调度平台</p><p>容器调度平台: 一般来说是由M个master和N个worker节点组成的一个集群，上面可以整合宿主机资源，完成网络、存储、CPU、内存等资源的管理，将容器运行在不同的主机上，已达成“人多力量大”，“大力出奇迹”和“各种骚操作”的目的。</p></span></div><div>


1. Docker是什么 a） Docker 可以理解成一个超轻量级的虚拟机，专业的说法叫应用容器，它是在LCX（linux容器）基础上进行的封装。 b） Docker和传统虚拟化方式的不同之处在于容器是在操作系统层面上实现虚拟化，直接复用本地主机的操作系统，而传统方式则是在硬件层面实现。  c） 相较于传统的VM虚拟化方法，Docker的好处是启动速度快，资源利用率高，性能开销小。

2. Docker可以用来干什么 a）简化部署，优化运维管理方案 这是Docker最吸引我的一点，是我学习Docker的动力= =。现在互联网服务的架构日趋复杂，不同程序模块依赖的环境千奇百怪，使用的机器也越来越多，导致部署一套环境成本越来越高，而且还不便于管理和迁移。由于Docker是在操作系统级别的封装，因此可以把不同的程序分别打包成镜像，管理只需要管理这些镜像即可，上线时直接把image批量部署到线上多台服务器上，岂不美哉。 b）优化资源使用 现在物理机性能普遍比较强悍，虚拟化是一种很好的隔离方案，但是Docker又是在KVM、Xen和完全不虚拟化之间的一种折中。 以上答案来自我厂潘威老师的博文《Docker小白使用笔记》。相关阅读：在哪些情况下考虑用docker？docker为什么适合devops？利益相关：网易云容器服务为用户提供了无服务器容器，让企业能够快速部署业务，轻松运维服务。容器服务支持弹性伸缩、垂直扩容、灰度升级、服务发现、服务编排、错误恢复及性能监测等功能，点击可免费试用更多网易技术、产品、运营经验分享敬请关注网易社区知乎机构号：网易云 - 知乎