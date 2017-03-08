/**
 * Created by zhongzhengkai on 2016/11/10.
 */

/*
 class 字面语法不能声明属性（只能声明方法）。
 看起来这是一种限制，但是它会排除掉许多不好的情况，
 如果没有这种限制的话，原型链末端的“实例”可能会意外地获取其他地方的属性（这些属性隐式被所有“实例”所“共享”）。
 所以，class 语法实际上可以帮助你避免犯错。
 */


//通过类声明定义类 (注:也可以通过表达式声明定义类)
class Animal {
  static showCount() {
    console.log(Animal.newCount + ' animal count');
  }

  constructor(category) {
    this.category = category;
    Animal.newCount++;
  }

  showAge() {
    console.log('show age');
  }
}
Animal.newCount = 0;

class Cat extends Animal {
  constructor(name) {
    super('cat');
    this.name = name;
  }
}

var cat = new Cat('kitty');

var cat2 = new Cat('hello');
console.log(cat.name);//kitty
console.log(cat.category);//cat
Animal.showCount();//2 animal count

class People {
  constructor(name) { //构造函数
    this.name = name;
  }
  get name() {
    return this._name.toUpperCase();
  }
  set name(name) {
    this._name = name;
  }
  sayName() {
    console.log(this.name);
  }
}
var p = new People("tom");
console.log(p.name);    //TOM
console.log(p._name);    //tom
p.sayName();    //TOM

var student = {name: 'zzk', age: 1, clazz: 1, grade: 22, addr: 'beijing'};
var {name,age,clazz,grade,addr} = student;
console.log(name, age, clazz, grade);

//es6, react, git, nodejs

