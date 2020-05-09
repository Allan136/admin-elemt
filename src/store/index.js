import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import { commontRouterMap } from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        routersComponents: commontRouterMap,
        menuList: null
    },
    getters,
    mutations
})

export default store