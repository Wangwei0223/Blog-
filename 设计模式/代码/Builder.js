var Car = function (name, value, wheel) {
    this.name = '';
    this.value = '';
    this.wheel = '';
}

var carBuilder = function () {
    this.nameBuilder = function () {
        this.name = '很厉害的车'
    }
    this.numberBuilder = function () {
        this.number = '88888888'
    }
    this.wheelBuilder = function () {
        this.wheel = '高级橡胶做的轮子'
    }
    this.getCar = function () {
        var car = new Car()
        car.name = this.name;
        car.value = this.number;
        car.wheel = this.wheel;
        return car;
    }

    this.action = function () {
        this.nameBuilder();
        this.numberBuilder();
        this.wheelBuilder();
    }
}

var Director = function () {
    this.action = function (builder) {
        bulider.action();
    }
}

var bulider = new carBuilder();
var director = new Director();
director.action(bulider);
var car = bulider.getCar();

console.log(car);