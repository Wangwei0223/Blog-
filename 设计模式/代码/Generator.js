/**
 * 构造函数强制用new
 */

var Car = function (name, price) {

    if (!(this instanceof Car)) { // 防止无限循环
        return new Car(name, price);
    }

    this.name = name;
    this.price = price;
}

Car.prototype.getInfo = function () {
    return this.name + ': ' + this.price;
}


console.log(new Car('voe', 23333).getInfo());
console.log(Car('ssss', 12312).getInfo());

// 其实这真的是JS中无处不在的构造模式

var s = new String('Hello world');
var n = new Number(1);
var b = new Boolean(true);

// 延伸考题 new String 和直接定义真的一样吗

// 包装函数可以加属性进去

s.var_1 = 'var a';

console.log(s.var_1);

// 原始类型不行
var string = 'abc';
string.aa = 'bcd';
console.log(string.aa); // undefined