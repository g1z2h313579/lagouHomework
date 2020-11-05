//homework
// const _ = require('lodash');
const fp = require('lodash/fp');

// 1、如何理解js异步编程；eventloop,消息队列都是做什么的？；什么是宏任务，微任务？
//  答：异步编程解决的主要问题是js在执行过程中可能存在的阻塞问题，造成问题的原因可能是冗长的代码，可能是接口请求等等；为了使js的运行效率提高，引入事件循环和消息队列的概念，其中事件循环即指微任务和宏任务之间的循环，在彼此的任务执行完成之后执行另一种任务，而消息队列则是指在那些异步执行的代码形成的队列，可以简单理解成异步代码的回调函数形成的队列；在此基础上，宏任务和微任务就很好区分了，宏任务即所有同步代码，包括setTimeout，setInterval等，微任务则以promise为首，相互循环。

//1、将代码改进 promise
setTimeout(() => {
    let a = 'hello';
    setTimeout(() => {
        let b = 'lagou';
        setTimeout(() => {
            let c = 'I love you';
            // console.log(a + b + c)
        },10)
    },10)
},10)

Promise.resolve('hello').then(res => {
    return res + 'lagou';
}).then(res => {
    return res + 'I love you'
}).then(res => {
    // console.log(res)
})


//2、
const cars = [
    {
        a : 'a b',
        b : 660,
        c : 700000,
        d : true
    },
    {
        a : 'b c',
        b : 650,
        c : 648000,
        d : false
    },
    {
        a : 'c d',
        b : 550,
        c : 132000,
        d : false
    },
    {
        a : 'd e',
        b : 525,
        c : 114200,
        d : false
    },
    {
        a : 'e f',
        b : 750,
        c : 1850000,
        d : true
    },
    {
        a : 'f g',
        b : 700,
        c : 1300000,
        d : false
    },
]

// 2.1  fp.flowRight()改造
let a = ((cars) => fp.prop('d',fp.last(cars)))(cars);
// console.log(a);
let b = (fp.flowRight(fp.prop('d'),fp.last))(cars);
// console.log(b)

//2.2 fp.flowRight,fp.prop,fp.first  获取第一个car的name
let c = (fp.flowRight(fp.prop('a'),fp.first))(cars);
// console.log(c)

//2.3 average重构averageDollarValue
let average = (xs) => fp.reduce(fp.add, 0, xs)/xs.length;

let averageDollarValue = (cars) => {
    let dollarValues = fp.map((car) => car.c, cars);
    return average(dollarValues);
}
// console.log(averageDollarValue(cars));

//原生：//从左到右
// let compose = (...rest) => {
//     return (value) => {
//         return Array.from(rest).reduce((pre,cur) => {
//             return cur(pre);
//         },value)
//     }
// }
let compose = (...rest) => (value) => Array.from(rest).reduce((pre,cur) => cur(pre),value);

let map = (data) => data.map(v => v.c);

// console.log(compose(map,average)(cars));

// 2.4 转换形式;
let underCore = fp.replace(' ','_');
let sanitizeNames = (cars) => {
    return fp.flowRight(
        (data) => data.map(val => {val.a = underCore(val.a); return val}),
        (data) => data.map(val => {val.a = fp.toUpper(val.a); return val})
    )(cars)
}
// console.log(sanitizeNames(cars));



//3、
class Container {
    static of (value) {
        return new Container(value);
    }

    constructor(value){
        this._value = value;
    }

    map(fn){
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of (value) {
        return new Container(value);
    }

    isNothing() {
        return this._value === null || this._value === undefined;
    }

    constructor(value) {
        this._value = value;
    }

    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }

}

//3.1  add + map 创建一个能让functor增加的函数
// let maybe = Maybe.of([5,6,1]);
// let ex1 = (num) => {
//     let co = (data) => fp.map(v => fp.add(v,num),data)
//     return maybe.map(co)
// }
// let maybe2 = ex1(5);
// console.log(maybe2._value)


//3.2  first获取列表第一个元素
// let xs = Container.of(['a','b','c','d']);
// let ex2 = () => {
//     return xs.map(fp.first)
// }
// let xs2 = ex2();
// console.log(xs2._value)


//3.3  使用safeProp和fp.first找到user的名字首字母；
// let safeProp = fp.curry((x,o) => Maybe.of(o[x]));
// let user = {id : 2, name : 'Albert'};
// let ex3 = () => {
//     let xs = safeProp('name',user);
//     return xs.map(fp.first)
// }
// let xs = ex3();
// console.log(xs);

//3.4  maybe重写ex4 no if
// let ex4 = (n) => {
//     if(n) return parseInt(n)
// }
// let n = 'a';
// let maybe = Maybe.of(n);
// let m = maybe.map(parseInt);
// console.log(m);


//4、手写promise
// let p = new Promise((resolve,reject) => {
//     // resolve(asd)
//     // reject(asd)
// })
// p.then(res => {},err => {})
class P {                                       //时间不多，简单实现
    constructor(fn) {
        fn(this.resolve,this.reject);//扔方法
    }
    //以下内部状态和参数
    status = 'pendding';
    sucValue = null;
    failValue = null;
    succbArr = [];
    failcbArr = [];

    resolve(value) {
        if(this.status !== "pendding") return;      
        this.status =  'fulfilled';                 //判断状态
        this.sucValue = value;                      //存储值
        succbArr.map(val => val(this.sucValue));    //循环调用then里的回调
        this.succbArr = [];                         //调用完了清空
    }

    reject (value) {
        if(this.status !== "pendding") return;      //同上
        this.status =  'reject';
        this.failValue = value;
        failcbArr.map(val => val(this.failValue));
        this.failcbArr = [];
    }

    then(succb,failcb){                             
        if(this.status === 'fulfilled'){
            succb()
        }else if(this.status === 'reject'){
            failcb()
        }else {
            this.succbArr.push(succb);
            this.failcbArr.push(failcb);
        }
    }
}


// async function a() {
//     let b = await '1';
//     console.log(b);
// }
// a();
// console.log('2')

console.log('--------------------')

// let aaa = {name : 'asd'};
// let bbb = aaa;
// // aaa = null;
// aaa.name = 'qweqwe';
// aaa = null;
// console.log(bbb);
// console.log(aaa)


// function aaa (){
//     let b = 'asd'
//     return `${b},zxc`;
// }
// function aaa (){
//         const b = 'asd'
//         return `${b},zxc`;
//     }
    // function aaa (){
    //         var b = 'asd'
    //         return `${b},zxc`;
    //     }
        function aaa (){
                b = 'asd'
                return `${b},zxc`;
            }
            console.log("a()",aaa())