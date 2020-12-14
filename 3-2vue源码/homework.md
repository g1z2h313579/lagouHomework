一、vue首次渲染过程：
new vue() =>
this._init() => 实际调用this.$mount():通过compileToFunctions将模版编译成render() =>
mountComponent(this,el):beforeMount() => vm._render()渲染vdom, vm._update():vdom渲染成dom =>
createWater =>
mounted():vm =>
water.get() =>
updateComponent() => vm._render():vdom => vm.update(vdom):dom

二、vue响应式原理
原理核心在于利用Object.defineProperty和重写push等方法，对data的实现监听。包括依赖收集，和更新派发。就是观察者模式的复杂用法吧。


三、虚拟dom中的key
和react的vdom类似，当有了key之后，同级自节点可以省去比较过程，节约性能

四、vue中模版编译过程：
compileToFunction():render() => compile(template,options) => 
baseCompile(): AST tree => js => compileToFunction():function

