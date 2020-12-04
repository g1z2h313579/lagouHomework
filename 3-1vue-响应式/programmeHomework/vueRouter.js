let _Vue = null;

export default class VueRouter{
    static install (Vue) {
        if(VueRouter.install.installed) return
        VueRouter.install.installed = true
        _Vue = Vue

        _Vue.mixin({
            beforeCreate() {
                if(this.$options.router){
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            }
        })
    }


    constructor( options ){
        this.options = options
        this.routerMap = {}
        this.data = _Vue.observable({
            current : '/'
        })
    }

    init() {
        this.createRouterMap();
        this.initComponents(_Vue)
    }

    createRouterMap () {
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }

    initComponents(Vue) {
        Vue.component('router-link', {
            props : {
                to : String
            },
            render (h) {
                return h('a', {
                    attrs : {
                        href : this.to
                    },
                    on : {
                        click : this.clickHandler
                    }
                }, [this.$slots.default])
            },
            methods : {
                clickHandler (e) {
                    window.onhashchange = () => {
                        this.$router.data.current = this.to
                    }
                    e.preventDefault()
                }
            }
        })

        Vue.component('router-view', {
            render = (h) => {
                const component = this.routeMap[this.data.current]
                return h(component)
            }
        })
    }
}