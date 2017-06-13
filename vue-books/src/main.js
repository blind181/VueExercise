import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './Home.vue'
import Explorer from './Explorer.vue'
import Cart from './Cart.vue'
import Me from './Me.vue'

//
Vue.use(VueRouter)



new Vue({
  el: '#app',
  render: h => h(App)
})
