// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import '@/styles/index.scss'
import './icons'


Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})