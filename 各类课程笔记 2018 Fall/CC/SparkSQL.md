Spark SQL运行架构
　　SparkSQL有两个分支，sqlContext和hiveContext，sqlContext现在只支持SQL语法解析器（SQL-92语法）；hiveContext现在支持SQL语法解析器和hivesql语法解析器，默认为hiveSQL语法解析器，用户可以通过配置切换成SQL语法解析器，来运行hiveSQL不支持的语法。

　　1）sqlContext具体的执行过程如下：

　　　　1、SQL | HQL语句经过SqlParse解析成UnresolvedLogicalPlan；

　　　　2、使用analyzer结合数据数据字典（catalog）进行绑定，生成resolvedLogicalPlan；在这个过程中，Catalog提取出SchemRDD，并注册类似case class的对象，然后把表注册进内存中。

　　　　3、Analyzed Logical Plan经过Catalyst Optimizer优化器优化处理后，生成Optimized Logical Plan，该过程完成以后，以下的部分在spark core中完成。

　　　　4、Optimized Logical Plan的结果交给SparkPlanner，然后SparkPlanner处理后交个PhysicalPlan，经过该过程后生成Spark Plan

　　　　5、使用SparkPlan将LogicalPlan转换成PhysicalPlan；

　　　　6、使用prepareForExecution()将PhysicalPlan转换成可执行物理计划；

　　　　7、使用execute()执行可执行物理计划；

　　　　8、生成SchemaRDD。

　　在整个运行过程中涉及到多个SparkSQL的组件，如SqlParse、analyzer、optimizer、SparkPlan等等

