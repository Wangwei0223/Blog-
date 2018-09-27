### AWS入门之用sdk创建EC2实例

这个EC2是啥百度说的比我优秀

我们完全可以理解为: **一个虚拟机而已,** 然后Amazon叫它实例, 和平常用Linux一样, 一个终端..我是不知道有没有GUI的..望普及..我觉得没有

![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/b92a7859d8928600b69adbdf32cc2fbe.png)

图里的实例就是一个个云端的虚拟机, 我们可以通过SSH访问.

如何创建实例呢? 可以直接在AWS控制台新建实例, 但是这样可太low了, 我们用AWS-SDK去做这件事情.

和其他SDK一样, AWS为我们提供了:
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/fad43230b60e5df2d6c9f482df3326f1.png)

看见没有, 世界第一厂还是牛逼阿..

准备工作:
1. 有个AWS帐号
2. 设置密钥 Linux 在 ~./aws 新建 credentials文件
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/ca953ebf0b958f03e730f822f933e705.png)

 这个key可以在我们账户安全中申请, 完全可以理解为, 有了这两个key, 才能确定这台机器对应的AWS账户

3. 下载sdk
我分别试用了java和node.js的sdk...还是npm大法好..我这里用node.js的环境讲..java的各位可以自行尝试..java都是同步...比node好弄多了

```javascript
npm install aws-sdk
```
官网推荐..那我有洁癖肯定不能这么干的
改用..
```javascript
npm install aws-sdk --save --dev
```
接下来我们引用aws-sdk, fs为了是我要存RSA(忘了的自行补课)
```javascript
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var fs = require("fs");
// Set the region 
AWS.config.update({ region: 'us-west-2' });
```
其实这一步AWS自己去检查了 .aws/credential 的key了

也可以把key写在AWS.config.update里

这里说一下为什么一定要划定区域
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/8de5e4328d48d53292004f7d71ecca46.png)

其实就跟我们买腾讯云阿里云这些乱七八糟的云要选区域一样..

#### 初始化EC2引用并创建密钥组
接下来创建EC2实例的引用...注意这只是个引用..只是new出一个对象为了调api用
```javascript
// Create EC2 service object
var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

var CreateKeyPair = function (ec2, params, resolve) {
    // Create the key pair
    ec2.createKeyPair(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            // console.log(JSON.stringify(data));
            fs.writeFile('WEIWANG.pem', data['KeyMaterial'],  function(err) {
                if (err) {
                    return console.error(err);
                }
                resolve(data);
             });
        }
    });
}
```
data中包括这个实例的各种信息..我只是取了KeyMaterial, 这里是RSA. 保存到WEIWANG.pem

reslove是我加的promise...不懂JS的各位就当我处理异步的方式..因为Node.js默认全部是异步..加它是为了保证异步执行的顺序..("我总不能先建实例再去建key吧"..这个意思)

resolve告诉这个异步已经完成使命的意思..data作为参数传给下一个异步

附赠删除的
```javascript
var DeleteKeyPair = function (ec2, params) {
    // Delete the key pair
    ec2.deleteKeyPair(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Key Pair Deleted");
        }
    });
}
```
创建一个指纹的东西..和git的一样..(忘了自行复习)
![](https://174studio.com:17480/blog/wp-content/uploads/2018/09/cf1ac53a8e69cf3a6acf9cb39046cad9.png)

#### 创建安全组
```javascript
var CreateVPC = function (ec2, resolve) {
    // Variable to hold a ID of a VPC
    var vpc = null;
    // Retrieve the ID of a VPC
    ec2.describeVpcs(function (err, data) {
        if (err) {
            console.log("Cannot retrieve a VPC", err);
        } else {
            vpc = data.Vpcs[0].VpcId;
            var paramsSecurityGroup = {
                Description: 'WEIs group',
                GroupName: 'WEIWANG',
                VpcId: vpc
            };
            // Create the instance
            ec2.createSecurityGroup(paramsSecurityGroup, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    var SecurityGroupId = data.GroupId;
                    console.log("Success", SecurityGroupId);
                    var paramsIngress = {
                        GroupName: 'WEIWANG',
                        IpPermissions: [
                            {
                                IpProtocol: "tcp",
                                FromPort: 22,
                                ToPort: 22,
                                IpRanges: [{ "CidrIp": "0.0.0.0/0" }, { "CidrIp": "255.255.255.255/32" }]
                            }
                        ]
                    };
                    ec2.authorizeSecurityGroupIngress(paramsIngress, function (err, data) {
                        if (err) {
                            console.log("Error", err);
                        } else {
                            console.log("Ingress Successfully Set", data);
                            resolve(data);
                        }
                    });
                }
            });
        }
    });
}
```

安全组定义了可以访问我们虚拟机的ip地址范围, 出站入站ip, 协议, 端口等等规则.
我这里定义的是22, 为了能ssh

附赠删除的
```javascript
var DeleteVPC = function () {
    var params = {
        GroupId: 'SECURITY_GROUP_ID'
    };

    // Delete the security group
    ec2.deleteSecurityGroup(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Security Group Deleted");
        }
    });
}
```

#### 展示当前地区
```javascript
var DescriptionRegion = function (ec2, params) {
    // Retrieves all regions/endpoints that work with EC2
    ec2.describeRegions(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Regions: ", data.Regions);
        }
    });

    // Retrieves availability zones only for region of the ec2 service object
    ec2.describeAvailabilityZones(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Availability Zones: ", data.AvailabilityZones);
        }
    });
}
```

#### 创建实例
```javascript
var CreateInstance = function (ec2, instanceParams, resolve) {
    // Create a promise on an EC2 service object
    var instancePromise = ec2.runInstances(instanceParams).promise();
    // Handle promise's fulfilled/rejected states
    instancePromise.then(
        function (data) {
            console.log("info of Instance", data);
            resolve(data);
            var instanceId = data.Instances[0].InstanceId;
            console.log("Created instance", instanceId);
            // Add tags to the instance
            tagParams = {
                Resources: [instanceId], Tags: [
                    {
                        Key: 'WEI WANG',
                        Value: 'WEI Sample'
                    }
                ]
            };
            // Create a promise on an EC2 service object
            var tagPromise = ec2.createTags(tagParams).promise();
            // Handle promise's fulfilled/rejected states
            tagPromise.then(
                function (data) {
                    console.log("Instance tagged");
                }).catch(
                function (err) {
                    console.error(err, err.stack);
                });
        }).catch(
        function (err) {
            console.error(err, err.stack);
        });
}
```

#### 最后把一系列异步骚操作集合一下子让他们保持顺序
```javascript
var key_params = {
    KeyName: 'WEIWANG'
};

var instanceParams = {
    ImageId: 'ami-7172b611', // 相当于机器号, 可查
    InstanceType: 't2.micro', // 相当于机器类型, 可查
    KeyName: 'WEIWANG',
    MinCount: 1,
    MaxCount: 1
};

new Promise(function (resolve, reject) {
    CreateKeyPair(ec2, key_params, resolve);
    // resolve('CreateKeyCompleted');
}).then(function (data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        // resolve('CreateVPCCompleted');
        CreateVPC(ec2, resolve);
    });
}).then(function (data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        CreateInstance(ec2, instanceParams, resolve);
    });
}).then(function (data) {
    var instanceId = data.Instances[0].InstanceId;
    console.log('instanceId: ' + instanceId);
    if (data.Instances[0].PublicIpAddress) {
        console.log('PublicIpAddress: ' + data.Instances[0].PublicIpAddress);
    }
    DescriptionRegion(ec2, {});
});
```

然后
```javascript
node  '你的文件名'
```

#### 骚操作结果
可以看到关于实例的信息..可以挨条挨条的检查一下自己的计算机网络基础

#### SSH
改权限
```javascript
chmod 444 WEIWANG.pem
```
建完实例就可以看到实例已经在跑了, 取得公网dns 后就可以连接到实例啦~

```javascript
ssh -i WEIWANG.pem ec2-user@'公网dns地址'
```

需要更多交流的请直接练习我, 共同学习AWS

赋赠一个java版的..java就同步比node好, 而且是典型的包多代码少的类型...node全部是异步队列现在我用Promise都还觉得麻烦, 适合一个服务一个JS文件..只不过我把它写在一起了...
但是一颗搞JS的心...死磕Node! 不把自己孵化成Node大神不罢休!
```java
package CreateInstance;
/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import java.util.Collection;
import java.util.List;

import com.amazonaws.AmazonClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2Client;
import com.amazonaws.services.ec2.model.CreateKeyPairRequest;
import com.amazonaws.services.ec2.model.CreateKeyPairResult;
import com.amazonaws.services.ec2.model.KeyPair;
import com.amazonaws.services.ec2.model.Reservation;
import com.amazonaws.services.ec2.model.RunInstancesRequest;
import com.amazonaws.services.ec2.model.RunInstancesResult;
import com.amazonaws.services.ec2.model.DescribeInstancesRequest;
import com.amazonaws.services.ec2.model.DescribeInstancesResult;
import com.amazonaws.services.ec2.model.Instance;
/**
 * Welcome to your new AWS Java SDK based project!
 *
 * This class is meant as a starting point for your console-based application that
 * makes one or more calls to the AWS services supported by the Java SDK, such as EC2,
 * SimpleDB, and S3.
 *
 * In order to use the services in this sample, you need:
 *
 *  - A valid Amazon Web Services account. You can register for AWS at:
 *       https://aws-portal.amazon.com/gp/aws/developer/registration/index.html
 *
 *  - Your account's Access Key ID and Secret Access Key:
 *       http://aws.amazon.com/security-credentials
 *
 *  - A subscription to Amazon EC2. You can sign up for EC2 at:
 *       http://aws.amazon.com/ec2/
 *
 */

public class CreateEC2Sample {

    /*
     * Before running the code:
     *      Fill in your AWS access credentials in the provided credentials
     *      file template, and be sure to move the file to the default location
     *      where the sample code will load the credentials from.
     *      https://console.aws.amazon.com/iam/home?#security_credential
     *
     * WARNING:
     *      To avoid accidental leakage of your credentials, DO NOT keep
     *      the credentials file in your source directory.
     */

    public static void main(String[] args) {
        //============================================================================================//
        //=============================== Submitting a Request =======================================//
        //============================================================================================//

        /*
         * The ProfileCredentialsProvider will return your [default]
         * credential profile by reading from the credentials file.
         */
        AWSCredentials credentials = null;
        try {
            credentials = new ProfileCredentialsProvider("default").getCredentials();
        } catch (Exception e) {
            throw new AmazonClientException(
                    "Cannot load the credentials from the credential profiles file. " +
                    "Please make sure that your credentials file is at the correct " +
                    "location, and is in valid format.", e);
        }

        // Create the AmazonEC2Client object so we can call various APIs.
        @SuppressWarnings("deprecation")
		AmazonEC2 ec2 = new AmazonEC2Client(credentials);
        Region usWest2 = Region.getRegion(Regions.US_WEST_2);
        ec2.setRegion(usWest2);
        
        // Create a key pair
        // Fill code Here 
        
        
        //Initializes a Run Instance Request
        RunInstancesRequest runInstancesRequest = new RunInstancesRequest();
        
        // Setup the specifications of the launch. This includes the instance type (e.g. t2.micro)
        // and the latest Amazon Linux AMI id available. Note, you should always use the latest
        // Amazon Linux AMI id or another of your choosing.
        runInstancesRequest.withImageId("ami-7172b611")
        				.withInstanceType("t2.micro")
        				.withMinCount(1)
        				.withMaxCount(1)
        				.withKeyName("my-key-pair")
        				.withSecurityGroups("my-security-group");

        RunInstancesResult runInstancesResult = ec2.runInstances(runInstancesRequest);
        
        // do something here to get the results after the instance is created
        
        DescribeInstancesRequest request =  new DescribeInstancesRequest();
        Collection<String> instanceIds = null;
		request.setInstanceIds(instanceIds);
        DescribeInstancesResult result = ec2.describeInstances(request);
        List<Reservation> reservations = result.getReservations();
        List<Instance> instances;
        for(Reservation res : reservations){
        	instances = res.getInstances();
            for( Instance ins:instances){
                System.out.println("Instance ID:" + ins.getInstanceId() + "\t Public IP: " + ins.getPublicIpAddress() + "\t Region: " + ins.getPlacement().getAvailabilityZone());
                
            }
        
    }
}
}

```
