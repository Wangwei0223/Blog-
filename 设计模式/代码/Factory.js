var Car = (function () {

    var Car = function (name, price) {
        this.name = name;
        this.price = price;
    }
    return function (name, price) {
        return new Car(name, price);
    }
})();

var car1 = new Car('ss', 111);

console.log(car1);


var productManager = {
    createProductA: function () {
        console.log('ProductA');
    },
    createProductB: function () {
        console.log('ProductB');
    },
    factory: function (typeType) {
        return new productManager[typeType];
    }
};

var pm1 = productManager.factory("createProductA");

console.log(pm1);