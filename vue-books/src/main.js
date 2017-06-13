import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './Home.vue'
import Explorer from './Explorer.vue'
import Cart from './Cart.vue'
import Me from './Me.vue'

//使用路由实例插件
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    baseline: _dirname,
    routes: [
        //将页面组件与path指定路由关联
        {path: '/home', conponent: Home},
        {path: '/explorer', conponent: Explorer},
        {path: '/cart', conponent: Cart},
        {path: '/me', conponent: Me},
    ]
})


new Vue({
    el: '#app',
    //将路由实例添加到Vue实例中
    router,
    render: h => h(App)
})
