import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _40c69b5d = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _3ddd05d2 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _7dfbfcd6 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _6fd22054 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _67f1c8d4 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _34f7c1a0 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _a23d99ba = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _40c69b5d,
    children: [{
      path: "",
      component: _3ddd05d2,
      name: "home"
    }, {
      path: "/login",
      component: _7dfbfcd6,
      name: "login"
    }, {
      path: "/register",
      component: _7dfbfcd6,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _6fd22054,
      name: "profile"
    }, {
      path: "/settings",
      component: _67f1c8d4,
      name: "settings"
    }, {
      path: "/editor",
      component: _34f7c1a0,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _a23d99ba,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
