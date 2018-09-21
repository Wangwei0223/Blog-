var mySingleton = {
    property: '1',
    property_: '2',
    method: function () {
        console.log(this.property + this.property_);
    }
}

// 有个缺点, 属性暴露了且可以随意修改


// 利用闭包, 无法修改闭包内部变量

var mySingleton_ = function (salary) {
    var private_salary = salary || 0;
    return {
        public_var: '',
        showSalary: function () {
            return private_salary;
        }
    }
}

var myInstance = mySingleton_(300, 5000, 7000); // 实参形参不一致时已实参为准

console.log(myInstance.showSalary());

// 再改进 形成单例模式

var mySingleton_1 = (function(salary){
    var instance; // 判断是否已经形成单例
    var init = function(){ // 单例初始化
        return {
            public_var: 'public',
            getSalary: function(){
                return salary + this.public_var;
            }
        }
    }

    return {
        getInstance:function(){
            if(!instance){
                instance = init(salary);
            }
            return instance;
        }
    }
})(5000);

console.log(mySingleton_1.getInstance().getSalary()); //5000

mySingleton_1.getInstance().public_var = 2;
console.log(mySingleton_1.getInstance().getSalary()); //5002

console.log(mySingleton_1.getInstance() === mySingleton_1.getInstance()); // true

// 其他方法

function Single(a, b){
    if(Single.instance){
        return Single.instance;
    }
    var var_1 = a || 0;
    var var_2 = b || 0;
    this.getVar = function(){
        return var_1 + var_2;
    }
    Single.instance = this;
}

var u1 = new Single(1, 2);
var u2 = new Single();
console.log(u1 === u2);

console.log(u1.getVar(), u2.getVar());

