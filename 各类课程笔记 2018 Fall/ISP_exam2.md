### Access Control 
Access control is a series of mechanisms used by management, to specify what users can do, which resources they can access, and what operations they can perform on a system. More generally, it permits managers of a system to direct or restrain the behavior, use and content of a system

Elements of Access Control
    ● Access Controls: The security features that control how users and systems communicate and interact with one another.
    ● Object: A passive entity that contains information
    ● Subject: An active entity that requests access to an object or the data in an object
    ● Access: The flow of information between subject and object

### Access Control – More Formally
● Any system consists of objects and subjects (active objects such as processes, users etc.) which access these objects.
● The security policy of a system defines
    o What a subject is allowed to do
    o What may be done with an object
● In other words – Access Control
● Two issues –
    o How do you specify an access control policy?
    o How do you enforce an access control policy?

● The three main security principles also pertain to access control:
    o Availability Mechanisms put into place to ensure the objects are accessible to subjects(**保证object可以被访问**)
    o Integrity Protecting objects from being altered in any unauthorized fashion(**保证不被篡改**)
    o Confidentiality Assurance that information is not disclosed to unauthorized subjects(**对unauthorized的subject保密**)

### Access Control - Abstraction
● Access control is established by implementing three distinct functions
    o Identification
    o Authentication(认证) 
    **Authentication is the process of verifying who you are. When you log on to a PC with a user name and password you are authenticating**
    o Authorization(授权)
    **Authorization is the process of verifying that you have access to something. Gaining access to a resource (e.g. directory on a hard disk) because the permissions configured on it allow you access is authorization.**
(Note that identity management is the broad term that includes the use of different products to identify, authenticate, and authorize users through automated means.)

### Identification
● Method of establishing the subject’s identity*.
    o Use of user name or other public information.
    o Need to conform to identification component requirements.
        ▪ Each value should be unique, for user accountability;
        ▪ A standard naming scheme should be followed;
        ▪ The value should be non-descriptive of the user’s position or tasks; and(**value是非描述性的**)
        ▪ The value should not be shared between users.

*Note: Examples of subject's include user, program, process.

### Authentication
● Method of proving the identity.
    o Something a subject is, has, or does.
    o Use of biometrics, passwords, passphrase, token, or other private information.

### Authorization
● Determines that the proven identity has some set of characteristics associated with it that gives it the right to access the requested objects.
    o Access Criteria can be thought of as:
        ▪ Roles
        ▪ Groups
        ▪ Location
        ▪ Time
        ▪ Transaction Types

### Access Control – Conceptual Model
● Assumptions
    o System knows who the user is
    ▪ Authentication via credentials
    o Access requests pass through the gatekeeper, aka, reference monitor
    ▪ System must not allow monitor to be bypassed

● An actual system may not include an explicit reference model
    o But we need to define functionality of the reference monitor and design mechanisms for its implementation.

### Access Control Models
● How is access control decided?
● Three main techniques
    o **Discretionary**(任意的)
    o **Mandatory**
    o **Non-Discretionary (Role Based)**

### Access Control Models (continued)
● Discretionary Access Control (DAC) **(resource owner decide)**
    o A system that uses discretionary access control allows the owner of the resource to specify which subjects can access which resources.
    o Access control is at the discretion of the owner.

### Access Control Models (continued)
● Mandatory Access Control (MAC) 
    o Access control is based on a **security labeling system**. Users have security clearances and resources have **security labels** that contain data classifications.
    o This model is used in environments where information classification and confidentiality is very important (e.g., the military).

### Access Control Models (continued)
● Non-Discretionary (Role Based) Access Control Models
    o **Role Based Access Control (RBAC) uses a centrally administered set of controls to determine how subjects and objects interact.**
    o It is the best system for an organization that has high turnover.

### Access Control Techniques
● There are a number of different access controls and technologies available to support the different models.
    o Rule Based Access Control
    o Constrained User Interfaces
    o Content Dependent Access Control
    o Context Dependent Access Control
    o Access Control Matrix

### Access Control Techniques (continued)
● Role-Based Access Control:
    o Uses rules based upon a person's 'role' that indicate what can and cannot happen between a subject and an object.
    o Not necessarily identity based.
    o Traditionally, role-based access control has been used in MAC systems as an enforcement mechanism.

### Access Control Techniques (continued)
● Constrained User Interfaces:
    o Restrict user’s access abilities by not allowing them certain types of access, or the ability to request certain functions or information
    o Three major types
        ▪ Menus and Shells
        ▪ Database Views
        ▪ Physically Constrained Interfaces

### Access Control Techniques (continued)
● Content Dependent Access Control:(**决定与一个object的内容**)
    o Access to an object is determined by the content within the object.
● Context Based Access Control:(**决定于上下文**)
    o Makes access decision based on the context of a collection of information rather than content within an object.

### Access Control Techniques (continued)
● Access Control Matrix:
    o Is a table of subjects and objects indicating what actions individual subjects can take upon individual objects.
        ▪ each row represents a subject,
        ▪ each column represents an object, and
        ▪ each entry is the set of access rights for that subject
        to that object.

### Implementation Concepts for ACM’s
● Authorization Table
    o Report non-empty entries of ACM in a table with three columns.
● Access control list (ACL)
    o Store each column of ACM with the object it represents
● Capabilities
    Will be discussed next time
* Authorization tables are generally used in database management systems.
* ACLs are widely used, often with groups.

### Access Control Lists (ACL’s)
Intuition: **An access control list (acl)** is a set of permissions that correspond to an object. Each permission usually specifies a principle and a right.

acl(File A): {(Alice: write), (Bob: read, execute)} In the above example Alice has the permission to write File A. Bob has the permission to read and execute File A.

### ACL - Example
● For ACM shown earlier, corresponding ACL’s are:
    ● acl(file 1) = {(proc.1, {r,w,o}) (proc. 2, {a})}
    ● acl(file 2) = {(proc.1, {r}) (proc. 2, {r,o})}
    ● acl(proc.1) = {(proc.1,{r,w,x,o}) (proc.2, {r})
    ● acl(proc.2) = {(proc.1,{rw}) (proc.2, {r,w,x,o}) 

### Abbreviated ACL’s
● Although the same amount of storage is used with ACL's, it is now distributed.
● To further reduce storage, one can abbreviate ACL’s as in UNIX.
● One can also assign default access to groups of subjects as well as specific rights to individual subjects.
    o Two ways of doing this:
        ▪ What is not prohibited is permitted
        ▪ What is not permitted is prohibited. Latter almost always better!! Why?
    o Example: Unix hosts.allow and hosts.deny files

### OS Mechanisms
● Multics
    o Ring structure
● Unix
    o File system, Setuid
● Windows
    o File system, Tokens, EFS
● Android
    o Apps are users, mediate communication

### OS Mechanisms - Multics (Time-Division Multiplexing，TDM)
● Operating System
    o Designed 1964-1967
        ▪ MIT Project MAC, Bell Labs, GE
    o At peak, ~100 Multics sites
    o Last system, Canadian Department of Defense, Nova Scotia, shut down October, 2000
● Extensive Security Mechanisms
    o Influenced many subsequent systems

### Multics Innovations
● Segmented, Virtual memory
    o Hardware translates virtual address to real address
● High-level language implementation
    o Written in PL/1, only small part in assembly language
● Shared memory multiprocessor
    o Multiple CPUs share same physical memory
● Relational database
    o Multics Relational Data Store (MRDS) in 1978
● Security
    o Designed to be secure from the beginning
    o First B2 security rating (1980s), only one for years

### Multics Access Model
● Ring structure
    o A ring is a domain in which a process executes
    o Numbered 0, 1, 2, … ; Kernel is ring 0
    o Graduated privileges
        ▪ Processes at ring i have privileges of every ring j > i
● Segments
    o Each data area or procedure is called a segment
    o Segment protection {b1, b2, b3} with b1 > b2 > b3
        ▪ Process/data can be accessed from rings b1 … b2
        ▪ A process from rings b2 … b3 can only call segment at
        restricted entry points

### Multics Process
● Multiple segments
    o Segments are dynamically linked
    o Linking process uses file system to find segment
    o A segment may be shared by several processes
● Multiple rings
    o Procedure, data segments each in specific ring
    o Access depends on two mechanisms
        ▪ **Per-Segment Access Control**
            ▪ File author specifies the users that have access to it
        ▪ **Concentric Rings of Protection** (wiki Ring Protection)
            ▪ Call or read/write segments in outer rings
            ▪ To access inner ring, go through a “gatekeeper”
● Interprocess communication through “channels”

### Multics Summary
● Interesting forerunner to modern systems
    o Principled security guarantees
    o Modern processors still have 'ring' model
● Unwieldy in practice

### OS Mechanisms – Unix
● Each file has owner and group
● Permissions set by owner
    o Read, write, execute
    o Owner, group, other
    o Represented by vector of four octal values
● Only owner, root can change permissions
    o This privilege cannot be delegate(**下放**) or shared
● Setid bits – Discussed in a few slides

### Unix Special Users
● Special user with extra privileges –root.
    o UID is 0.
    o Can do (almost) anything!!
    o Holy grail of hackers!
● Other special users
    o daemon or sys – handles some network services
    o ftp – used for anonymous FTP access.
    o uucp – manages UUCP system.
    o guest – used for site visitors.
    o lp - used by printer system
    o Other special users exist

### Unix Groups
● Every user belongs to one or more groups.
● The GID of primary group the user belongs to is stored in passwd file.
● Groups useful for access control features.
● /etc/groups contains a list of all groups in the system along with GID’s.
● Some special groups – 
o wheel - group of administrators
o uucp, lp, etc. – groups corresponding to special users.

### Unix File Access Control

### Unix File Permission Bits
● File permissions obtained by ls –l command
● First character indicates type of file
    o - plain file
    o d directory
    o c character device (tty or printer)
    o b block device
    o l symbolic link
    o Etc 

### Unix File Permission Bits (continued)
● Next nine characters taken in groups of three indicate who can do what with the file
    o R – Permission to read
    o W – Permission to write
    o X – Permission to execute
● The three classes of permission correspond respectively to
    o Owner
    o Group
    o Other

### File Permission Bits – Special Cases 
● File permission bits do not apply to symbolic links.
● If you have x access but no r access you can execute the program without reading it (not on Linux).
● Execute permission in a directory means you can list the files in a directory.
● What does denying this mean for security?
● File permission bits also commonly specified in octal notation.
    o 0777 means –rwxrwxrwx
    o 0600 means -rw-------, etc.

### Question 就是想说明一个问题, owner是user也是决定于owner, 轮不到group和other
● If owner has fewer privileges than other or group users:
o What happens?
    ▪ Owner gets access?
    ▪ Owner does not?

● If owner has fewer privileges than other or group users:
    o What happens?
        ▪ Owner gets access?
        ▪ Owner does not?
● Prioritized resolution of differences
    if user = owner then owner permission
    else if user in group then group permission
    else other permission

### Umask and Default Permissions
● umask (User file creation mode mask) is a four digit octal number used to determine file permissions for newly created files.
● It defines permission you do not want to be given (the bit-wise complement of the permission you want a file to have by default).
● Set up at time of log in, in environment variables
● 0002 – umask means 0775 permissions.
● 0077 umask means ?
● 0022 umask means ?
**Ubuntu默认0002**
**就是在创建文件后用chmod去减**

### Process Operations and IDs
● Root
    o ID=0 for superuser - root; can access any file
● Fork and Exec
    o Inherit three IDs, except execution of file with setuid bit
● Setuid system calls
    o seteuid(newid) can let a process change it's effective UID!
● Details are actually more complicated
    o Several different calls: setuid, seteuid, setreuid

### Effective User id (euid)
● Each process has three Ids (+ more under Linux)
    o Real user ID (RUID)
        ▪ same as the user ID of parent (unless changed)
        ▪ used to determine which user started the process
    o Effective user ID (EUID)
        ▪ from set user ID bit on the file being executed, or sys call
        ▪ determines the permissions for process
        ▪ file access and port binding
    o Saved user ID (SUID)
        ▪ So previous EUID can be restored
● Real group ID, effective group ID, used similarly

SUID的作用就是出来了,比如 /usr/bin/passwd 这个进程. 每个用户都可以执行, 但是, 可以修改 /etc/shadow 但是 /etc/shadow 只能root 说明 /usr/bin/passwd fork了一个进程, suid把euid设置为root, 之后恢复为euid

**几者关系:进程执行应用时根据euid/egid. 而euid/egid设置规则:**
**(euid,egid)=(suid,sgid)?(suid,sgid):(uid:gid);**

### Setid Bits on Executable Unix File
● Three setid bits
o Setuid – set EUID of process to ID of file owner
o Setgid – set EGID of process to GID of file
o Sticky:
    ▪ If Off: user has write permission on directory, can
    rename or remove files, even if not owner
    ▪ If On: only file owner, directory owner, and root can
    rename or remove file in the directory

这几个id的参考:
https://www.cnblogs.com/limingluzhu/p/5702486.html

**粘滞位权限便是针对此种情况设置，当⽬录被设置了粘滞位权限以后，即便⽤户对该⽬录有写⼊权限，也不能删除该⽬录中其他⽤户的⽂件数据，⽽是只有该⽂件的所有者和root⽤户才有权将其删除。设置了粘滞位之后，正好可以保持⼀种动态的平衡：允许各⽤户在⽬录中任意写⼊、删除数据，但是禁⽌随意删除其他⽤户的数据**

**那么原来的执行标志x到哪里去了呢? 系统是这样规定的, 假如本来在该位上有x, 则这些特别标志 (suid, sgid, sticky) 显示为小写字母 (s, s, t).否则, 显示为大写字母 (S, S, T)**

### More on suid Bit
● Sometimes unprivileged users must perform tasks that are privileged.
    o Change user's shell thereby modify /etc/passwd
● UNIX allows certain programs to change UID to their owner when executed.
    o SUID programs – change UID to owner.
    o SGID programs – change GID to owners group.
● ls –l command indicates if SUID or SGID
    o-rwsr-xr-x indicates SUID
    o-rwxr-sr-x indicates SGID

### Limitations of Unix File System
● Abbreviated ACL’s in general and UNIX in particular may not be flexible enough for many circumstances.
● Consider the following example:
    o 5 users: Anne, Beth, Cathy, Della and Elle.
    o Anne wants Beth to have read-only access.
    o She wants Cathy to write
    o Della to only read and write
    o Elle to only execute
    o Above not possible with Unix file permission bits!! 
**1. 设置用户ACL权限:指定特定用户对此文件/目录拥有的r/w/x权限**
1. 命令格式: setfacl -m u:用户名:权限(rwx)　目录/文件名
2. 使用示例: setfacl -m u:user1:rwx  /aclTest

1、什么是ACL？

ACL是Access Control List的缩写，主要的目的是提供传统的owner、group、others的read、write、execute权限之外的具体权限设置。ACL可以针对单一用户、单一文件或目录来进行r、w、x的权限设置，对于需要特殊权限的使用状况非常有帮助。

2、具体命令就两个：getfacl（获取）、setfacl（设置）

3、针对特定用户的方式：setfacl -m u:[用户账号列表]:[rwx]。举例：setfacl -m u:user1:rx /test/acl_test

4、针对特定用户组的方式：setfacl -m g:[用户账号列表]:[rwx]。举例：setfacl -m g:group1:rx /test/acl_test

5、针对有效权限mask的设置方式：setfacl -m m:[rwx]。举例：setfacl -m m:r /test/acl_test

6、针对默认权限的设置方式：setfacl -m d:[ug]:用户列表:[rwx]。举例：setfacl -m d:u:user1:rx /test/acl_test


### Augmenting Abbreviated ACL’s 

### Unix Summary
● Advantages:
    o Some protection from most users
    o Flexible enough to make actions possible
● Drawbacks:
    o Too tempting to use root privileges
    o No way to assume some root privileges without all root privileges
    (At least with what is described here)

### OS Mechanisms–Windows (NTFS+) 
● Some basic functionality similar to Unix
    o Specify access for groups and users
        ▪ Read, modify, change owner, delete, etc.
● Some additional concepts
    o Tokens
    o Security attributes
● Generally
    o More flexibility than Unix
        ▪ Can define new permissions
        ▪ Can give some but not all administrator privileges

### NT Domains
● A domain is a set of computers with a central security authority
● PDC and the BDC (Backup) must be Windows NT.
● A domain can be set up to:(**domain的划分取决于**)
    o Ease viewing and access to resources.
    o Share a common user account database and security policy.
    o Enforce a common security stance across physical, divisional, or corporate boundaries.
    o Elimination of the need for every machine to provide its own authentication service.
● Users authenticated to the domain, can gain access to resources, such as printing, file sharing or applications, across all of     the servers.

### Access Control Lists
● Each object contains a security descriptor, which
has
    o Security Identifier of the person who owns the object.
    o The regular ACL for access permissions.
    o The system ACL (SACL) which is used for auditing(审计),
    o A group security identifier.

### Access Control Entries ACL由ACE组成, ACE由 R W X D P O组成
● ACL may be composed of Access Control Entries
(ACE) which are composed of:
    ○ Basic permissions (six individual permissions)
        ■ Read (R), Write (W), Execute (X), Delete (D), Change Access Permissions (P), Take Ownership (O)
    ○ Standard permissions which are combinations derived from the basic permissions.
● ACE types:
    ○ Access-denied ACE - Used in ACLs to deny access rights
    ○ Access-allowed ACE - Used in ACLs to allow access rights
    ○ System-audit ACE - Used in SACLs to generate an audit record when the trustee attempts to exercise the specified access rights

### Permission Inheritance
● Static permission inheritance (Win NT)
    o **Initially**, subfolders inherit permissions of folder
    o Folders and subfolders are changed independently
    o Replace Permissions on Subdirectories command
        ▪ Eliminates any differences in permissions
● Dynamic permission inheritance (Win 2000)
    o Child inherits parent permission, remains linked
    o Parent changes are inherited, except for explicit settings
    o Inherited and explicitly-set permissions may conflict
        ▪ Resolution rules
        ▪ Positive permissions are additive
        ▪ Negative permission (deny access) takes priority

### Tokens
● Security Reference Monitor
    o uses tokens to identify the security context of a process or thread
● Security context
    o privileges, accounts, and groups associated with the process or thread
● Impersonation token
    o thread can adopt a different security context, usually of another user

### Impersonation Tokens
● Process uses security attributes of another
    o Client passes impersonation token to server
● Client specifies impersonation level of server
    o Anonymous
        ▪ Token has no information about the client
    o Identification
        ▪ server obtains the SIDs of client and client's privileges, but server cannot impersonate the client
    o Impersonation
        ▪ server identifies and impersonates the client
    o Delegation
        ▪ lets server impersonate client on local, remote systems

### Security Descriptor
● Information associated with an object:
    o Specifies who can perform actions and what actions they can perform on an object
● Several fields
    o SIDs for the owner and primary group of an object
    o A Discretionary Access Control List (DACL)
        ▪ access rights allowed or denied to users or groups
    o A System Access Control List (SACL)
        ▪ types of access attempts that generate audit records for the object.
    o A set of control bits that qualify the meaning of a security descriptor or its individual members

### Windows Summary
● Advantages:
    o Tokens provide contextual information
    o More flexible than Unix
● Drawbacks:
    o Poor implementation of tokens in APIs ( historically, many just use identification)
    o Complex for users / developers

### Android Security Model User-isolation的 permission foucs on 内部组件通信
● OS user-isolation applied to applications
● Permission restrictions focused on intercomponent (application) communications

### Android Challenges
● Battery life
    o Developers must conserve power
    o Applications store the state, thus they can be stopped in order to save power and then restarted – helps with DoS
    o Most foreground activity is never killed
● Android market
    o Not reviewed by Google (different from Apple)
    o No way of stopping bad applications from showing up on market
    o Malware writers may be able to get code onto platform: shifts focus from remote exploit to privilege escalation

### Application Development Concepts
● Activity – one-user task
    o Example: scroll through your inbox
    o Email client comprises many activities
● Service – Java daemon(**守护进程**) that runs in background
    o Example: application that streams an mp3 in background
● Intent – asynchronous messaging system
    o Fire an intent to switch from one activity to another
    o Example: email app has inbox, compose activity, viewer activity
        ▪ User clicks on inbox entry, fires an intent to the viewer activity, which then allows the user to view the email
● Content provider
    o Store and share data using a relational database interface
● Broadcast receiver
    o “mailboxes” for messages from other applications

### Exploit Prevention
● 100 open source libraries + 500 million lines new code
    o Open source -> no obscurity
● Goals
    o Prevent remote attacks
    o Secure drivers, media codecs, new and custom features
● Overflow prevention
    o Some stack and heap protection
● Decided against (in initial release)
    o stack and heap non-execute protections (due to time-to-market constraints and battery life constraints)
o ASLR – performance impact
    ▪ Many pre-linked images for performance
    ▪ Can’t install different images on different devices in the factory
We will discuss many of these topics later 

### Application Sandbox
● Application sandbox
    o Each application runs with its UID in its own Dalvik virtual machine **每一个Android应用程序都在它自己的进程中运行，都拥有一个独立的Dalvik虚拟机实例**
        ▪ Provides CPU protection, memory protection
        ▪ Authenticated communication protection using Unix domain
        sockets
        ▪ Only ping, zygote* - run as root
● Applications announce permission requirement
    o Create a whitelist model – user grants access
        ▪ But don’t want to ask user often – all questions asked at install time --- This is changing!
    o Inter-component communication reference monitor checks permission
*Note: spawns another process

### Android Summary
● Advantages
    o Sandboxes applications, not "users"
    o Focuses on more than just 'allow / disallow'
● Drawbacks
    o Main access control settings via a dialog box at install time
    o Lots of trusted (?) library code

## PPT2

### Recall: Access Control Matrix (ACM) - Example
● Consider system with two files and two processes. Set of rights is - r,w,x,a,o (read, write, execute, append, own).

● As the number of entries increases, the complexity of the file system increases quickly, hence this system is inefficient for general use.

### Capability based access control
● Conceptually, capability is **row** of ACM, i.e. a list of rights for a subject.
If Let O be the set of objects, R the set of rights of a system,
and capability list c is a set of pairs. 
Then
Definition: Capability:= Let cap be the function that
determines capability list c associated with subject s. The
subject s may access oi using any right in ri.

### Example
● For the ACM we saw earlier, capability lists are: 

cap(proc. 1) = {(file1, {r,w,o}), (file2, {r}),
(proc 1, {r,w,x,o}), (proc 2, {w})}.

cap(proc. 2) = {(file1, {a}), (file2, {r,o}),
(proc 1, {r}), (proc 2, {r,w,x,o})}.

### Capability Based Access Control – Implementation
● A capability is an unforgeable “token” giving the possessor certain rights to an object.
● This is analogous to movie ticket or ID card.
● This "token" could be made transferable with an appropriate entry in ticket.
● Used by Kerberos (WIN 2K).
● To make sure capability cannot be forged:
    o Maintained by OS.
    o Programming language restricts access (private).
    o **Stored in a region not accessible to users.**
    o **The goal is to prevent forgery**

### Capabilities
● Operating system concept
    o “… of the future and always will be …”
    o But they are fairly widely used now!!!!
● Examples
o Dennis and van Horn, MIT PDP-1 Timesharing
o Hydra, StarOS, Intel iAPX 432, Eros, …
o Amoeba: distributed, unforgeable tickets

### ACL’s vs. Capabilities
● Two questions arise in access control systems:
    o Given a subject, what objects can it access and how?
    o Given an object, what subjects can access it and how?
● Former easier to answer with capabilities and the latter is easier to answer with ACL. Why? (**因为ACL按列存储的**)
● The latter question is more often asked, hence ACL’s used more often.
● With more distributed processing and agent based systems, perhaps the former question will be asked more frequently in the future

### ACL’s vs. Capabilities
● ACL
    o Associate list with each object
    o Check user/group against list
    o Relies on authentication: need to know user
● Capabilities
    o Capability is unforgeable ticket
        ▪ Random bit sequence, or managed by OS
        ▪ Can be passed from one process to another
o Reference monitor checks ticket
        ▪ Does not need to know identity of user/process

### ACL’s vs. Capabilities
● Delegation
    o Cap: Process can pass capability at run time
    o ACL: Try to get owner to add permission to list?
        ▪ More common: let other process act under current user
● Revocation
    o ACL: Remove user or group from list
    o Cap: Try to get capability back from process?
        ▪ Possible in some systems if appropriate bookkeeping
            ▪ OS knows which data is a capability
            ▪ If capability is used for multiple resources, it has to revoke all or
            none …
▪ Indirection: capability points to pointer to resource
    ▪ If C -> P -> R, then revoke capability C by setting P=0

### OS Mechanisms - Amoeba
● Distributed system
    o Multiple processors, connected by network
    o Process on A can start a new process on B
    o Location of processes designed to be transparent
● Capability-based system
    o Each object resides on server
    o Invoke operation through message to server
        ▪ Send message with capability and parameters
        ▪ Server uses object # to identify object
        ▪ Server checks rights field to see if operation is allowed
        ▪ Check field prevents processes from forging capabilities

### Capabilities
● Owner capability
    o When server creates object, returns owner cap.
        ▪ All rights bits are set to 1 (= allow operation)
        ▪ Check field contains 48-bit random number stored by server
● Derived capability
    o Owner can set some rights bits to 0
    o Calculate new check field
● Server can verify rights and check field
    o Without owner capability, cannot forge derived capability

Protection by user-process at server; no special OS support needed

### Copying Capabilities
● Copying capability means giving rights. How do you allow copying?
● X wants Y to read object O which X owns:
    1.X has a capability with all bits set, flips the bit for writing to 0.
    2.X generates a new check field using the new rights XOR the old check field using a one-way hash function. cnew = h(rnew XOR cold)
    3.X sends the new capability to Y.
    4.Y sends a request to the server
    5.The server XORs the new rights with the old check field. If the hash of this is the new check field, the credential is valid. Assuming:
    6. h(rnew XOR cold) == cnew

### Revoking rights in Capability Systems
● Check each process and delete capability? Too inefficient. How is this done efficiently?
● One method: Use indirection. Capability does not name object but contains a pointer to an object in the global table. To revoke an entry, just invalidate the entry in the global table.
● Amoeba: Change random check and issue new capability. This invalidates all existing capabilities.

### Amoeba OS
Summary:
- Capability based system.
- Provides "single-system" image.
Pros:
Capabilities can be derived independent of the trusted server.
Cons:
- What if a capability is "overheard"?
- Revocation is painful for applications.

### Custom Reference Monitors 
●Assumptions:
    o System knows who the user is
        ▪ Authentication via credentials
o Access requests pass through the gatekeeper, aka, reference monitor
        ▪ System must not allow monitor to be bypassed

● Is it easier to build a custom reference monitor when objects (access-control list) or subjects (capability-based systems) contain permissions?

### Custom Reference Monitor (Cap)
To implement a capability system:
● Get the capability to what you want to mediate
    o Need to ensure that restricted processes do not have a copy of this capability
● Create a new capability for calling your reference monitor
● Pass this capability in place of the original capability
● Can be repeated for multiple reference monitors!

### Custom Reference Monitor (ACL)
System call interposition problems:
● Hooks require lots of kernel code to do things right
● Reference monitor must correctly replicate OS state / code
    o Code is tricky (dup2, rel path / links / chroot)
● Easy to overlook some path
    o Most things in Unix / Linux are files (sockets, devices)
    o We also have descriptor passing
● Race conditions (time-of-check-to-time-of-use)
    o Symbolic link race conditions
    o Relative path races
    o Argument replacement
        ▪ Writable multi-process shared memory or threads

### Custom Reference Monitor (ACL)
System call interposition problems (cont):
● Subsetting an interface is hard
    o Attempt 1: Deny the creation of symlinks to files not allow unrestricted access.
        ▪ Should prevent the impact of a race, right?
        ▪ What about preexisting "unsafe" symlinks?
o Attempt 2: Deny the creation and renaming of symlinks.
    ▪ Protects against previous attacks
    ▪ Directories may contain symlinks
    ▪ Directories can be renamed
o Attempt 3: Deny access through symlinks.
    ▪ What if the path to a file contains a symlink?
    ▪ This is hard to check / prevent

### Custom Reference Monitor (ACL)
System call interposition problems (cont):
● Very tricky to implement correctly in practice
● In most cases:
    o Cannot chain reference monitors
    o Not recommended for security
    o Breaks applications unnecessarily
● Isn't widely used except for debugging
    o As a result, "custom" code ends up in kernel, etc.

### Custom Reference Monitor Summary
Capability systems:
● Very natural and straightforward
    o The monitor hides the current capability behind its checks and exposes a "safe" version
    o Easy to chain multiple together

Access Control List systems:
● Hard to do custom reference monitors
    o Difficult to implement correctly
        ▪ Lots of corner cases to handle
    o Cannot chain multiple together
    o Not popular in practice

### Chrome web browser
● What is interesting about web browsers?
    o Applications run there
    o Important data is stored there...
    o Browser is the “OS of the future”
    o Protect content based on origins instead of user id
    o Leverage OS isolation(**利用操作系统隔离**)

### ecurity Architecture
● Browser ("kernel")
    o Full privileges (file system, networking)
● Rendering engine
    o Up to 20 processes
    o Sandboxed
● One process per plugin
    o Full privileges of browser
    o Sort of like a "device driver" for the browser

### Chromium Threat Model
● Malware
    o Attacker can't write arbitrary files
● File Theft
    o Attacker can't read arbitrary files
● Keylogger
    o Attacker can't listen to the user's keystrokes in other applications
● Out of scope
    o Cookie theft, password theft, etc.

### Components of Browser Security Policy
● Frame-Frame relationships
    o canScript(A,B)
    ▪ Can Frame A execute a script that manipulates arbitrary/nontrivial DOM elements of Frame B?
o canNavigate(A,B)
    ▪ Can Frame A change the origin of content for Frame B?
● Frame-principal relationships
    o readCookie(A,S), writeCookie(A,S)
    ▪ Can Frame A read/write cookies from site S?

### Design Decisions
● Compatibility
    o Sites rely on the existing browser security policy
    o The browser is only as useful as the sites it can render
    o Rules out more “clean slate” approaches
● Black Box
    o Only renderer may parse HTML, JavaScript, etc.
    o Kernel enforces coarse-grained security policy
    o Renderer to enforces finer-grained policy decisions
● Minimize User Decisions

### Leverage OS Isolation
● Sandbox based on four OS mechanisms
    o A restricted token
    o The Windows job object
    o The Windows desktop object
    o Windows Vista only: integrity levels
● Specifically, the rendering engine
    o adjusts security token by converting SIDS to DENY_ONLY, adding
restricted SID, and calling AdjustTokenPrivileges
o runs in a Windows Job Object, restricting ability to create new processes, read or write clipboard, ..
o runs on a separate desktop, mitigating lax security checking of some Windows APIs

### Chrome Summary
● Pros:
    o Backwards compatible
    o Separate processes -> better isolation (OS)
    o Uses multiple security techniques
●Cons:
o Plug-ins still represent a threat
    ▪ Only sandboxes some plug-ins (Flash)
    ▪ This requires work / coordination by the vendor

### Information Flow Control
● Prior approaches to access control:
    ○ ACL: An object has a list of authorized subjects
    ○ Capability: Only a subject with a capability can access an object
● What else could we do to maintain confidentiality?

### Information Flow Control Motivation
Suppose that object X is sensitive (SSN, credit card info, etc.).
● Goal: Keep X confidential
● ACLs, capabilities, etc. all interpose(**干预**) on X
    o This keeps an untrusted process from accessing X
● Information Flow Control idea:
    o Allow X to be accessed freely (read)
    o Prevent X and information about X from being sent to untrusted parties over communication channels
    o This contains X and prevents disclosure.

### Information Flow Control
● Goal: Don't allow credit card information to be sent
● Tag variable and bleed information upon access
● Example:
    o Policy: CCN cannot be sent via network
    o CCN data is 'tagged'
    o Any data written by code that uses this gets tagged
CCNfirstfour = CCN[:4]
# CCNfirstfour is tagged
if (len(CCN) == 16):
correctlength = True
...
# correctlength is tagged with CCN

### Information Channels
● End-to-end security requires controlling information channels [Lampson 1973]
● Storage channels: transmit information explicitly
    o Variable assignment, writing to sockets, files
● Covert channels: transmit by mechanisms not intended for transmitting information
    o System load, locks …
● Timing channels: transmit information based on when
something happens (rather than what happens)

### Declassification(解密)
你不能阻止保密信息露出, 需要密码解决
● Non-interference is too strong
    o Programs release confidential information as part of normal operation
    o "Alice will release her data after you pay her $10"
● Idea: allow the program to release confidential data, but only through a certain computation
● Example: logging in using a secure password
if (password == input) login(); else fail();
    o Information about password must be released … but only through the result of comparison

### Principals
● Principals are users, groups of users, etc.
● Used to express fine-grained policies controlling
use of data
    o Individual users and groups rather than hosts
    o Closer to the semantics of data usage policies
● Principal hierarchy generated by the acts-for relation

### Data Labels
● Label each piece of data to indicate permitted information flows (both to and from)
    o Label specifies a set of policies
● Confidentiality constraints: who may read it?
    o {Alice: Bob, Eve} label means that Alice owns this data, and Bob and Eve are permitted to read it
    o {Alice: Charles; Bob: Charles} label means that Alice and Bob own this data but only Charles can read it
● Integrity constraints: who may write it?
    o {Alice ? Bob} label means that Alice owns this data, and Bob is permitted to change it

### Computation Changes Labels
● Assignment (X=Y) re-labels a variable
    o For every policy in the label of Y, there must be a policy in the label of X that is at least as restrictive
● Combining values
    o Join labels together
    o Label on data reflects all of its sources
● Declassification (**可以重写label**)
    o A principal can rewrite its own part of the label

### Exfiltration (渗出) 就是data可以流出
● Need a way to decide if data can be emitted
    o Use a trusted 'exfiltration' function
        ▪ Can be per user or global
        ▪ Declassify / remove labels
        ▪ How do you code this effectively?

### Web Tax Example

### Quick Summary
● Data gets 'tagged'
    ○ Tags are propagated as data flows through the system
● Upon exfiltration, tags are checked:
    ○ Requires user authentication
    ○ Unclear how easy it is to write good exfiltration logic
    ○ Covert channels are now a major security risk

### Jif
● Jif: Java with information flow control
● Represent principals as Java classes
● Jif augments Java types with labels
oint {Alice:Bob} x;
oObject {L} o;
● Subtyping follows the [order] (lattice order)
● Type inference
oProgrammer may omit types; Jif will infer them from how values are used in expressions

## PPT3
### The operating system's role

### Why Virtualize?
What does an OS do?
    Mediate access between processes (namespace)
        File system permissions are hard to get right.

Provide a programming abstraction
    Very broad and complex. Hard to restrict.

Restrict resource consumption
    Are the OS hooks good enough?

### Resource Isolation
It is critical to isolate "principals" from each other to provide availability.

Principle of least common mechanism / complete mediation!

One technique to circumvent this is, have more resources and flood a site with network traffic, requests, etc.

Once very popular, but sites are smarter now

The most threatening attacks deal with a mismatch of effort

### Fork Bomb
Write a script that loops while forking copies of itself
The operating system can get overwhelmed
Historically, it can be hard to regain control
Why can't root simply kill the process?
Answer: This requires you login and start
processes to send the appropriate signals. It may not be
possible for this to happen given the workload from the forked
script instances

### Filling Memory
One can also write a program that takes all available memory.
Historically: this will cause other programs to swap, slowing
the whole system.
apt package manager:
- Used by Debian, Ubuntu, and many other popular
distributions
- Updates software on Linux machines
- Runs as root
- Would download an update first, then check it
- Would download until the server stops sending
- Filling memory causes the system to slow to the point that it
is unusable

### Filling Disk
One can also write a program that takes all available disk space.
Historically: this will cause nearly everything to crash on the
system. Programmers do not expect logging writes to fail!
yum package manager:
- Used by RedHat, Fedora, and many other popular distributions
- Updates software on Linux machines
- Runs as root
- Would download an update first, writing it to disk
- Would download until the server stops sending
- Fills the disk, crashes and prints no error.
Can't even write the problem to the syslog!

### Why Does Resource Isolation Matter?

Easy for one (badly coded) process to bring down a system(**导致系统崩溃**)
● Apache / HTTP supports "range queries" of documents
    o It is possible to request multiple ranges in the same packet
    o What happens if you request 5-6, 5-7, 5-8, 5-9, 5-10,...?
        ▪ Apache had a flaw where it copied the file for each range (CVE-2011-3192). This effectively filled all memory.
    o What happens if you request 0-, 0-, 0-, ... ?
        ▪ They decided to restrict the number of ranges in a request.

### Another Example
SSL communication requires the server and client to do expensive operations.
● Some servers support requesting renegotiation
    o This means the server redoes the expensive part of its work
● The client can rapidly request this
    o This can cause the server to grind to a halt
(Note this was overhyped in the media)

### OS As A Reference Monitor
● Collection of running processes and files
    o Processes are associated with users
    o Files have access control lists (ACLs) saying which users can read/write/execute them
● OS enforces a variety of safety policies
    o File accesses are checked against file’s ACL
    o Process cannot write into memory of another process
    o Some operations require superuser privileges
        ▪ But may need to switch back and forth (e.g., setuid in Unix)
    o Enforce CPU sharing, disk quotas, etc.(**强制CPU共享, 磁盘配额**)
● Same policy for all processes of the same user

### Hardware / Architecture mechanisms
● TLB: Translation Lookaside Buffer
    o Maps virtual to physical addresses
    o Located next to the cache
    o Only “supervisor process” can manipulate TLB
        ▪ But if OS is compromised, malicious code can abuse TLB to make itself invisible in virtual memory (Shadow Walker)
● TLB miss raises a page fault exception
    o Control is transferred to OS (in supervisor mode)
    o OS brings the missing page to the memory
● This is an expensive context switch

● TLB：Translation Lookaside Buffer
    o 将虚拟地图映射到物理地址
    o 位于缓存旁边
    o 只有“主管进程”才能操纵TLB
        ▪ 但是，如果操作系统受到威胁，恶意代码可能滥用TLB使其自身在虚拟内存中不可见（Shadow Walker）
● TLB未命中引发页面错误异常
    o 控制转移到OS（在管理员模式下）
    o OS将缺少的页面带入内存
● 这是一个昂贵的上下文切换

### Modern Hardware Meets Security
● Modern hardware: large number of registers, big memory pages
● Principle of least privilege → each process should live in its own hardware address space

### Isolation at Multiple Levels
● Data security
    o Each VM is managed independently
        ▪ Possibly different OS, disks (files, registry), MAC address (IP address)
        ▪ Data sharing is often impossible;
        ▪ Mandatory I/O interposition
● Fault isolation
    o Crashes are contained within a VM
● Performance
    o Should be able to guarantee performance levels
● No assumptions required for software inside a VM (important
for security!)

### Native Client (NaCl)
● Goal: download an x86 binary and run it “safely”
    o Much better performance than JavaScript, Java, etc.
● ActiveX: verify signature, then unrestricted
    o Critically depends on user’s understanding of trust
● .NET controls: IL bytecode + verification
● Native Client: sandbox for untrusted x86 code
    o Restricted subset of x86 assembly
    o SFI-like sandbox ensures memory safety
    o Restricted system interface
    o (Close to) native performance 
