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