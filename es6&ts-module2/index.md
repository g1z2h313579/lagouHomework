一、
var a = [];
for(var i = 0; i < 10; i++){
    a[i] = () => console.log(i);
}
a[6]();
答：10。变量提升，var换let就行。实际上a都第几个都一样，都是10

二、
var tmp = 123;
if(true){
    console.log(tmp);
    let tmp
}
答：报错。let块级作用域，不能先于他应用；而且不允许重复声明

三、
var arr = [1,2,3,4,5,6];
答：Math.min(...arr);

四、var, let, const区别
答：三者均可声明变量；
var 会有变量提升
let,const 块级作用域，不可重复声明，不存在变量提升
const 引用绑定，常用声明常量

五、
var a = 10;
var obj = {
    a : 20,
    fn(){
        setTimeout(() => {
            console.log(this.a)
        },0)
    }
}
obj.fn()
答：箭头函数this指向不变，始终指向obj

六、
Symbol ：不可变的值，可以用作obj的key，避免在大型项目中方法名的冲突；

七、
浅拷贝：拷贝引用，内存中的值还是共用一份
深拷贝：拷贝值，内存中多出一份值，和原有值没有了联系；

八、
ts就是js的超集，加入了类型检测，范型，枚举，接口等功能。在语言层面上，ts是强类型语言，js是弱类型，所以ts实现了在语言层面上的类型检测。避免了js只有运行时才发现的问题；

九、
优点：对大型项目友好，在语言层面上实现了类型检测，避免了大量类型错误。实现了范型，枚举，接口等功能，使代码标准化程度变高，可读性更强；渐进式；
缺点：对小型项目不友好，多了很多js本身没有对概念；难学

十、
设置引用数，引用为0即回收垃圾；
优点：空间释放快，最大限度减少程度暂停
缺点：无法回收循环引用的对象，时间长

十一、
1、标记有引用的对象
2、移动对象位置
3、清除没有被标记的对象


十二、
1、空间一分为二
2、活动对象存到使用空间from，
3、标记整理后将活动对象拷贝到to
4、from和to交换空间完成空间释放

十三、
在回收老生代对象时，将垃圾回收步骤拆分成小段，和主程序交替执行，以提高用户体验