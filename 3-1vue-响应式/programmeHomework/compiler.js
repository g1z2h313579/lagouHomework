class Compiler {
    constructor(vm){
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }

    //编译模版，处理文本节点和元素节点
    /**
     * @param {Element} el 
     */
    compile(el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if(this.isTextNode(node)){
                this.compileText(node)
            }else if(this.isElementNode(node)){
                this.compileElement(node)
            }

            if(node.childNodes && node.childNodes.length){
                this.compile(node)
            }
        })
    }
    //编译元素节点，处理指令
    /**
     * 
     * @param {Element} node 
     */
    compileElement(node) {
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name
            if(this.isDirective(attrName)){
                attrName = attrName.substr(2)
                let key = attr.value
                this.update(node, key, attrName)
            }
        })
    }

    update(node, key, attrName) {
        if(attrName.includes(':')){
            let aN = attrName.split(':')
            let updateFn = this[aN[0] + 'Updater']
            updateFn && updateFn(node,aN[1], this.vm.$options.methods[key])
        }else {
            let updateFn = this[attrName + 'Updater']
            updateFn && updateFn(node, this.vm[key])
        }
        
    }

    //处理 v-text
    textUpdater(node,value) {
        node.textContent = value
    }
    // 处理 v-model
    modelUpdater(node,value){
        node.value = value
    }

    //v-html
    htmlUpdater (node,value) {
        node.innerHTML = value
    }

    //v-on
    /**
     * 
     * @param {Element} node 
     * @param {string} eventName 
     * @param {function} method 
     */
    onUpdater (node,eventName, method){
        node.addEventListener(eventName,method)
    }



    //编译文本节点，处理差值表达式
    /**
     * 
     * @param {Element} node 
     */
    compileText(node) {
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if(reg.test(value)){
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
        }
    }
    //判断元素属性是否是指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    //判断节点是否是文本节点
    /**
     * 
     * @param {Element} node 
     */
    isTextNode(node){
        return node.nodeType === 3
    }
    //判断节点是否是元素节点
    /**
     * 
     * @param {Element} node 
     */
    isElementNode(node){
        return node.nodeType === 1
    }
}