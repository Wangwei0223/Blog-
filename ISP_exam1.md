### PPT1

#### Why is security important?
1. Cybercrime cost
2. Everything is under attack

#### Threats, Vulnerabilities, Attack
A threat to a system is any potential occurence, malicious or otherwise, that can have an adverse effect on the assets and resource assocuated with the system.

A vunlerability of a system is some characteristics that make it possible for a threat to occur.

An attack on a system is some actions that involves exploitation of some vlunerability in order to cause an existing threat to occur.

#### Type of Threats
4 catagories:
1. Disclosure(暴露): unauthorized access to information
2. Deception(欺骗): acceptance to false data
3. Disruption(破坏): interruption or prevention of correct operation
4. Usurpation(抢去豪夺): unauthorized control of some part of system

#### Examples

**sniffing attack(截获网络包)**:
The sniffer captures the network traffic. When data is transmitting across the network, if the data packets are not encrypted, the data within the network can be read using a sniffer. Using a sniffer application, an attacker can analyze the network and gain information to eventually cause the network to crash or to become corrputed.

**snooping**:
refer to sniffing

**spoofing(哄骗, 攻击者伪装)**:
A spoofing attck is a situation in which a person or program successfully masquerades as another by falsifying data, to gain an illegitimate advantage.

**DDoS**:
Denial-of-service attack

In computing, a denial-of-service attack (DoS attack) is a cyber-attack in which the perpetrator seeks to make a machine or network resource unavailable to its intended users by temporarily or indefinitely disrupting services of a host connected to the Internet. Denial of service is typically accomplished by flooding the targeted machine or resource with superfluous requests in an attempt to overload systems and prevent some or all legitimate requests from being fulfilled

#### Hacking with USB sticks
USB sticks were infected with malware that recorded employee Username and passwords and then sent the information to remote IP addresses.

#### Primary Issue
**● Confidentiality(保密性):** prevention of unauthorized disclosure of information
防止未经授权的信息泄露
**● Integrity(完整性):** prevention of unauthorized modification of information
防止未经授权修改信息
**● Availability(可用性):** ability to withstand **unauthorized withholding** of information or resources
能够承受未经授权的信息或资源扣留

#### Computer Security Definitions(保护三性, 防止未授权, 防止attacker)
● Security is the ability of a system to **protect information** and system resources with respect to **confidentiality**, **integrity**, and **availability**.
● Computer Security deals with the **prevention and detection of unauthorized actions** by users of a computer system.
● Computer security is **preventing attackers** from achieving objectives through unauthorized access or unauthorized use of computers and networks
● 安全性是指系统在机密性，完整性和可用性方面保护信息和系统资源的能力。
● 计算机安全处理预防和检测计算机系统用户的未授权操作。
● 计算机安全性可防止攻击者通过未经授权的访问或未经授权使用计算机和网络来实现目标

#### Policy and Mechanism
● A security policy is a statement of what is, and is not, allowed.
● A security mechanism is a procedure, tool, or method of enforcing security policy

#### Security Policy(1. 一组规则规定什么允许什么不允许, 2.finite state automaton)
● A security policy is a set of rules stating which actions are permitted and and which are not.
● Can be informal or highly mathematical.
● If we consider a computer system to be a finite state automaton with state transitions then
    ○ A security policy is a statement that partitions the states of a system into a set of authorized or secure states and a set of unauthorized or non-secure states.
    ○ A secure system is a system that starts in an authorized state and cannot enter an unauthorized state.
    ○ A breach of security occurs when a system enters an unauthorized state.
● We expect a trusted system to enforce the required security policies

#### Elements of a Security Policy(三性的policy)
● A security policy considers all relevant aspects of confidentiality, integrity and availability.
    ○ Confidentiality policy: Identifies information leakage and controls information flow.
    ○ Integrity Policy: Identifies authorized ways in which information may be altered. Enforces separation of duties.
    ○ Availability policy: Describes what services must (and must not) be provided: example – a browser may download pages but no Java applets.

#### Security Mechanism(用某些方法强制的执行Security Policy)
● A security mechanism is a procedure that enforces some part of a security policy.
● We will learn many mechanisms

#### Goals of Security Mechanism(目标)(保护,发现,恢复)
● Given a policy that specifies what is “secure” and what is “non-secure” goal of security is to put in place mechanisms that provide:
    ○ Prevention
    ○ Detection
    ○ Recovery

#### Types of Security Mechanisms/controls(加密,软,硬,物理)
● Cryptography and cryptographic protocols.
● Software controls.
● Hardware controls.
● Physical controls.

#### Operational Issues in Security(风险, 成本收益, 法律, 可用性)
● Risk Analysis or Assessment
● Cost-Benefit Analysis
● Laws and Regulations
● Human Issues: usability

### PPT2 Security Design Principles

#### Caveats for system design “rules”
There are no “laws” to system design 
Internalize the basic rules as a way to reason about what can **go wrong**

#### Fundamental design principles
General design principles (not just security)
1. Principle of open design(开放式)
2. Principle of sweeping simplifications(简化)
3. Principle of design for iteration(迭代)
4. Principle of least astonishment(最不惊讶)

#### Principle of open design(开放式)
● Get others to comment on your design
    ○ “given enough eyeballs, all bugs are shallow” -- Linus
    Torvalds
    ○ Talk through your design with outsiders

#### Principle of sweeping simplifications(简化:1. KISS 2.Layer)
● KISS principle (Keep It Simple Stupid!)
    ○ Makes design and interactions easy
    ○ Easy to prove its safety
    ○ Complexity != security
    If it is complicated, it will be hard to reason about.
Layering can help with this
● Layers only communicate with adjacent layers
    ○ Possibly forming a hierarchy
● A layer may have a specific role / capability
    ○ OS kernel has unrestricted memory access

#### Principle of design for iteration(适应新攻击)
● Ensure you can change pieces in the future
    ○ Priorities evolve over time
    ○ Attackers present new threats
    ○ Make sure you can adapt

#### Principle of least astonishment(行为符合用户期待)
● A system should behave how the user expects
    ○ Do what the user should think would happen in each situation
        ■ This is especially important for errors!
        ■ Handle security in an understandable way

#### Principles of secure design
1. Principle of minimizing secrets(最小化秘密)
2. Principle of complete mediation(完全调解)
3. Principle of fail-safe defaults(故障安全默认)
4. Principle of least privilege(最小特权)
5. Principle of economy of mechanism(经济机制)
6. Principle of least common mechanism(最不常见机制)

#### Principle of minimizing secrets(最小化秘密)
● Secrets should be few and changeable(秘密应该少)
    ○ Do not assume that an attacker cannot see source code

● Security of a mechanism should not depend upon secrecy of its design or(安全不应该完全depends on secrecy) implementation (why not?)
    ○ Secrecy != security
    ○ “Security through obscurity”
    ○ Cryptography and openness

#### Principle of complete mediation(完全调解) 所有access必须ensure是安全的, 真实性, 完整性, 授权
● All accesses to objects should be checked to ensure they are allowed.
    ○ UNIX file descriptor
    ○ DNS cache poisoning
Check: authenticity(真实性), integrity(完整性), authorization(授权)

#### Principle of fail-safe defaults(故障安全默认)
● Use sane defaults. The default should be secure.(默认值就该是安全的)
    ○ Default access to an object is none(默认对一个对象没有访问权限)
    ○ Access Control Lists (ACLs), firewall examples.(ACL表, 防火墙)
    ○ Restricting privileges at the time of creation(创建的时候就应该限制权限)
    ○ What if the attacker's goal is to cause denial-of-service?(如何防止DoS攻击)
"Fail-closed" (as opposed to "fail-open")

#### Principle of least privilege(最小特权)
● Entity should be given only the information / privileges needed to finish a task
    ○ Temporary elevation of privilege should be relinquished immediately
    ○ Granularity of privileges
    ○ Append permission only for logging process.
    ○ Strong privacy implications

● 实体应仅获得完成任务所需的信息/特权
    ○ 应放弃临时特权提升立即
    ○ 特权的粒度
    ○ 仅为日志记录过程附加权限。
    ○ 强大的隐私隐患

#### Principle of economy of mechanism(简单)
● Security mechanisms should be as simple as possible.
    ○ Fewer errors(错误少)
    ○ Testing and verification is easy(测试和认证简单)
    ○ Assumptions are less(假设少)

#### Principle of least common mechanism(不分享mechanism)
● Mechanisms used to access resources should not be shared
    ○ Shared resources need **resource isolation** to prevent becoming a denial-of-service target
    ○ Restrictive because it limits sharing(限制因为它限制了共享)

#### **Ethic**


### PPT3 Threat Modeling

Security Life Cycle:
Threats -> Policy -> Specification(规范) -> Design -> Implementation -> Operation and Maintenance

#### Threats, Vulnerabilities and Attacks

● A threat to a system is any potential occurrence, malicious or otherwise, that can have an adverse effect on the assets and resources associated with the system.
● A vulnerability of a system is some characteristic that makes it possible for a threat to occur.
● An attack on a system is some action that involves exploitation of some vulnerability in order to cause an existing threat to occur.

#### Risk
● Risk: What (adverse) happens if a threat occurs?
    ○ Risk can exist when there is a known issue that
    increases the attack surface. Risk can also exist
    when there are non-specific issues, unexplored
    threat areas, or lack of depth-of-knowledge

#### Why Threat Modeling
● Helps you understand your application better.
● Discover potential design flaws and vulnerabilities
● Prioritize security analysis
● Understand overall security risk
● Develop mitigating strategies
● Provide more complete analysis

#### Threat Modeling
● Threats and assets are key – vulnerabilities and attacks are only concerns if there is a threat to an asset to be concerned about.
● How do we identify and evaluate threats?
    ○ Arbitrary Threat or Attack Lists
        ■ Random and unstructured
        ■ Dubious completeness
    ○ Threat Trees / Graphs or Attack Trees / Graphs
        ■ More structured
        ■ Modular and Re-usable
        ■ Currently favored approach

● Start with questions like the following:
    ○ Who are my potential adversaries?
    ○ What is their motivation, and what are their goals?
    ○ How much inside information do they have?
    ○ How much funding do they have?
    ○ How averse are they to risk?
    ○ [Be paranoid: **do not underestimate** the attacker’s capability; do not also ignore easy/dumb attacks]
● Then enumerate threats by stepping through each of the system’s assets, reviewing a list of attack goals for each asset. Assets and threats are closely correlated.

#### Threat Modeling – main steps
● Understand your system
● Understand what assets/resources need to be protected
● Predict who the potential attackers are against a particular asset and what are the possible (known) attacks
● Perform risk assessment
    ○ Determine what is the expected risk (quantitative or qualitative) because of an attack
● Perform risk management: Employ security mechanisms (mitigation),if needed
    ○ Determine if they are cost effective

#### STRIDE Model
● In general, threats can be classified into six classes based on their effect :
    ○ Spoofing - Using someone else’s credentials to gain access to otherwise inaccessible assets.
    ○ Tampering(篡改) - Changing data to mount an attack.
    ○ Repudiation(拒绝) - Occurs when a user denies performing an action, but the target of the action has no way to prove otherwise.
    ○ Information disclosure(信息的披露) - The disclosure of information to a user who does not have permission to see it.
    ○ Denial of service(拒绝服务 - 降低有效用户访问资源的能力) - Reducing the ability of valid users to access resources.
    ○ Elevation of privilege(特权提升 - 在非特权用户获得特权状态时发生) - Occurs when an unprivileged user gains privileged status.

#### Ranking Threats
● Used for prioritizing work
● One methodology for ranking threats is the use of DREAD (used by Microsoft!)
    ■ Damage Potential(伤害潜力)
    ■ Reproducibility(再现性)
    ■ Exploitability Cost(可利用性成本) (or cost and ease of performing attack)
    ■ Affected Users(受影响的用户)
    ■ Discoverability(可发现性)
● DREAD rating is calculated by adding the rating for each component
    ○ For example, 3: High, 2: Medium, 1: Low
    ○ For a particular threat, we might have
        ■ Damage Potential = 3
        ■ Reproducibility = 3
        ■ Exploitability Cost (or cost and ease of performing attack) =2
        ■ Affected Users = 2
        ■ Discoverability = 2
        ■ Total Rating: 12, which might be regarded as High, since one can set 12–15 as High, 8–11 as Medium, and 5–7 as Low risk. 

#### Attack Trees
● Data structure to represent an attack
● Look at system from attackers point of view.
● The root node of the tree is the global goal of the attacker
● Children are refinements of this goal
● Nodes can be conjunctive (AND) or disjunctive (OR)

#### General Concept of Risk Assessment and Management
● A risk consists of something of value (an “asset” at risk) which may lose value if a negative event occurs.
    ○ Example: a car and its passengers are at risk in the event of an auto accident. Other people, cars, and roadside objects are also at risk
    ○ Example: Money invested in a stock is at risk in the event that the price of the stock goes down and the owner has to sell
● Risk analysis/assessment is the process of
    ○ Identifying the assets at risk (cost of asset – cost of most expensive attack)
    ○ Putting quantitative (e. g., dollars) or qualitative (e. g. low/medium/high) measures on the potential loss (impact)
    ○ Putting quantitative (i. e., the probability) or qualitative (e. g. low/medium/high) measures on the likelihood of the event happening
● Risk Management is a process for planning on how to control those
risks

#### Information Security Risk Analysis
● “Risk” will usually refer to information security risk
● Negative events are often compromises of the
system.
● If we are only concerned with information security risks, any asset at risk will have to be mapped back to an IT asset at risk
● “IT assets” refer to information, IT processes/functionality, and IT systems
● The risk management strategies that we consider are for the IT assets, but the impact is based on the real assets

#### Risk Assessment(定位, 定量, 定性(low high medium))
● Assessment: measures of the impact of an event, and the probability of an event (threat agent exploiting a vulnerability)
● Quantitative (objective) and Qualitative (subjective) approaches both used.
● **Quantitative approach**:
    ○ Compute expected monetary value (impact) of loss for all “events”
    ○ Compute the probability of each type of expected loss
● **Qualitative approach**: use Low, Medium, High; ratings; other
categorical scales

#### Risk Management(接受, 转移, 降低, 消除)
● Once you have risk computed for each threat you can prioritize them and for each do one of the following:
    ○ Accept the risk - The risk is so low or so costly to mitigate that it is worth accepting.
    ○ Transfer the risk - Transfer the risk to somebody else via insurance, warnings etc.
    ○ Remove the risk - Remove the system component or feature associated with the risk if the feature is not worth the risk.
    ○ Mitigate the risk - Reduce the risk with countermeasures.
● The understanding of risks leads to policies, specifications and requirements.
● Appropriate security mechanisms are then developed and implemented, and then deployed

#### Quantitative Methodology (terminology)
● SLE: Single Loss Expectancy
● ARO: Annualized Rate of Occurrence
● ALE: Annualized Loss Expectancy
● S: Safeguard (security mechanism)
● ALE(without S)
● ALE(with S)
● ACS(S): Annualized Cost of Safeguard S
● ANB(S): Annualized Net Benefit of S
○= ALE(without S) – ALE(with S) – ACS(S)
● S is cost effective if ANB(S) > 0

带A的全是一年单位

● SLE：单一预期损失
● ARO：年度发生率
● ALE：年度损失预期(一年损失的钱)
● S：保障（安全机制）
● ALE（无S）(无S一年损失的钱)
● ALE（带S）(有S一年损失的钱)
● ACS（S）：年度保障成本S.(用S一年花的钱)
● ANB（S）：S的年度净收益
    ○ = ALE（无S） -  ALE（带S） -  ACS（S）
● 如果ANB（S）> 0，则S具有成本效益

#### Quantitative: Useful or Not?
● Pro:
    ○ Objective, independent process
    ○ Solid basis for cost/benefit analysis of safeguards
    ○ Credibility for audit, management (especially corporate management)
    ○ This type of approach is useful for many kinds of reliability related design questions (e. g., redundant servers, etc.), where threats and likelihood of “events” can be accurately modeled statistically
    ○ Quantitative risk assessment is the basis for insurance, risk managed portfolios, etc.
● Con1
    ○ In most cases, it is difficult to enumerate all types of events and get meaningful data on probability and impact
    ○ Very time consuming, costly to do right
    ○ Many unknowns may give a false sense of control
    ○ Not reliable for “rare” events or “unthinkable” impacts

#### Qualitative Approach
● Establish classes of likelihood of compromise
    ○ Low, medium, high likelihood
● Decide on a risk management approach to each combination of (class of loss, likelihood of loss)
● Focus effort on medium to high loss and/or medium to high likelihood items

#### Confidentiality, Integrity and Availability
● Confidentiality: Let X be a set of entities and I be some information. Then I has the property of confidentiality with respect to X if no member of X can obtain information about I.
● Integrity: Let X be a set of entities and I some information. Then I has the property of integrity with respect to X if I is unmodifiable by X.
● Availability: Let X be a set of entities and I a resource. Then I has the property of availability with respect to X if all members of X can access I.

#### Elements of a Security Policy
● A security policy considers all relevant aspects of confidentiality, integrity and availability.
    ○ Confidentiality policy: Identifies information leakage and controls information flow.
    ○ Integrity Policy: Identifies authorized ways in which information may be altered. Enforces separation of duties.
    ○ Availability policy: Describes what services must be provided: example – a browser must be able to download pages but may optionally choose not to execute JavaScript.

#### Mechanism and Policy (保证Policy的就叫Mechanism)
● Mechanism should not be confused with policy.
● A security mechanism is an entity or procedure that enforces some part of a security policy.

#### Types of Security Policies
● Two types of security policies have been well studied in the literature:
    ○ A military security policy (also called government security policy) is a security policy developed primarily to provide confidentiality.
        ■ Not worrying about trusting the object as much as disclosing the object
    ○ A commercial security policy is a security policy developed primarily to provide integrity.
        ■ Focus on how much the object can be trusted.
● Also called confidentiality policy and integrity policy

