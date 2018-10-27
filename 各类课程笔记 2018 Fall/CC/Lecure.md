#### 1

**What is Cloud ?** 

1. Allows users to request computing/storage resources through web interfaces
2. You do not need to own or install or manage these resources. 
3. Pay as you go - Resources on-demand
4. Elastic: Use as much as you want or as less as you want
5. Users can assume infinite amount of compute and storage resources are available.
6. Users can request resources when and what they need and release/remove resources when they don’t need.
7. Compute and storage resources are now treated as software entities. You get access to such resources programmatically – not by physical hardware anymore!
8. So what are the Clouds! Where are the Cloud?

**Why Cloud ?**

1. You can get as many as 1000 machines for an hour for a few dollars to run a complex application!
2. You don’t need to manage, maintain or fix any machines!
3. You can use as little as 1 machine or as many as 10000 machines depending on what your current needs are!
4. Two key focus: on-demand and elastic!

**Essential Characteristics**

1. On-demand self-service. A consumer can unilaterally provision computing capabilities, such as server time and network storage, as needed automatically without requiring human interaction with each service’s provider. 

**按需自助服务。消费者可以根据需要单方面地提供计算能力，例如服务器时间和网络存储，而无需与每个服务的提供者进行人工交互**

2. Broad network access. Capabilities are available over the network and accessed through standard mechanisms that promote use by heterogeneous thin or thick client platforms (e.g., mobile phones, laptops, and PDAs).

**广泛的网络访问。功能可通过网络获得，并通过标准机制访问，这些机制可促进异构瘦客户端平台或胖客户端平台（例如，移动电话，笔记本电脑和PDA）的使用。**

3. Resource pooling. The provider’s computing resources are pooled to serve multiple consumers using a multi-tenant model, with different physical and virtual resources dynamically assigned and reassigned according to consumer demand. There is a sense of location independence in that the customer generally has no control or knowledge over the exact location of the provided resources but may be able to specify location at a higher level of abstraction (e.g., country, state, or datacenter). Examples of resources include storage, processing, memory, network bandwidth, and virtual machines.

**资源池。提供商的计算资源汇集在一起​​，使用多租户模型为多个消费者提供服务，根据消费者需求动态分配和重新分配不同的物理和虚拟资源。存在位置独立感，因为客户通常对所提供资源的确切位置没有控制或知识，但是可能能够在更高抽象级别（例如，国家，州或数据中心）指定位置。资源示例包括存储，处理，内存，网络带宽和虚拟机。**

4. Rapid elasticity. Capabilities can be rapidly and elastically provisioned, in some cases automatically, to quickly scale out and rapidly released to quickly scale in. To the consumer, the capabilities available for provisioning often appear to be unlimited and can be purchased in any quantity at any time.

**快速弹性。功能可以快速和弹性地提供，在某些情况下自动提供，以快速扩展并快速发布以快速扩展。对于消费者，可用于供应的功能通常似乎是无限的，并且可以随时以任何数量购买。**

5. Measured Service. Cloud systems automatically control and optimize resource use by leveraging(借力) a metering(计量) capability at some level of abstraction appropriate to the type of service (e.g., storage, processing, bandwidth, and active user accounts). Resource usage can be monitored, controlled, and reported providing transparency for both the provider and consumer of the utilized service.

**测量服务。云系统通过在适合于服务类型（例如，存储，处理，带宽和活动用户帐户）的某种抽象级别上利用计量能力来自动控制和优化资源使用。可以监视，控制和报告资源使用，从而为所使用的服务的提供者和消费者提供透明性。**

**Service Models**
由低到高

1. Cloud Software as a Service (SaaS). The capability provided to the consumer is to use the provider’s applications running on a cloud infrastructure. The applications are accessible from various client devices through a thin client interface such as a web browser (e.g., web-based email). The consumer does not manage or control the underlying cloud infrastructure including network, servers, operating systems, storage, or even individual application capabilities, with the possible exception of limited user-specific application configuration settings.

2. Cloud Platform as a Service (PaaS). The capability provided to the consumer is to deploy onto the cloud infrastructure consumer-created or acquired applications created using programming languages and tools supported by the provider. The consumer does not manage or control the underlying cloud infrastructure including network, servers, operating systems, or storage, but has control over the deployed applications and possibly application hosting environment configurations.

3. Cloud Infrastructure as a Service (IaaS). The capability provided to the consumer is to provision processing, storage, networks, and other fundamental computing resources where the consumer is able to deploy and run arbitrary software, which can include operating systems and applications. The consumer does not manage or control the underlying cloud infrastructure but has control over operating systems, storage, deployed applications, and possibly limited control of select networking components (e.g., host firewalls).

**Deployment Models**
1. Private cloud. The cloud infrastructure is operated solely for an organization. It may be managed by the organization or a third party and may exist on premise or off premise(前提).

**私有云。云基础架构仅为组织运营。它可以由组织或第三方管理，可以在本地或外部存在。**

2. Community cloud. The cloud infrastructure is shared by several organizations and supports a specific community that has shared concerns (e.g.,mission, security requirements, policy, and compliance considerations). It may be managed by the organizations or a third party and may exist on premise or off premise.

**社区云。云基础架构由多个组织共享，并支持具有共同关注点的特定社区（例如，任务，安全要求，策略和合规性考虑因素）。它可以由组织或第三方管理，可以在本地或外部存在。**

3. Public cloud. The cloud infrastructure is made available to the general public or a large industry group and is owned by an organization selling cloud services.

4. Hybrid cloud. The cloud infrastructure is a composition of two or more clouds (private, community, or public) that remain unique entities but are bound together by standardized or proprietary technology that enables data and application portability (e.g., cloud bursting for load-balancing between clouds).

**混合云。云基础架构由两个或多个云（私有云，社区云或公共云）组成，这些云仍然是独特的实体，但通过标准化或专有技术绑定在一起，从而实现数据和应用程序的可移植性（例如，用于云之间负载平衡的云爆发）。**

**Different types of utility model**
    IaaS Cloud (Amazon EC2)
    Low level of computing resource abstraction 
    Provides a (virtual) machine to users
    Makes it hard for IaaS providers to support automatic scaling, failover etc.

    Google AppEngine
    Targeted at web applications 
    Enforces an application structure
    Clean separation between stateless and stateful storage tier
    Benefit: makes it possible to handle auto-scaling, fail over/high availability

    Microsoft Azure
    Applications need to be written using .NET libraries
    More flexible than Google AppEngine
    Able to provide some automated scaling 
    Between Application framework and hardware virtual machines

