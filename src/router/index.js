import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Login from '@/components/Login'
import Home from '@/components/Home'
import HomeIndex from '@/components/HomeIndex'
import UserList from '@/components/UserList'
import Rules from '@/components/Rules'
import NavigateConfig from '@/components/NavigateConfig'
import NavigateClassifyConfig from '@/components/NavigateClassifyConfig'
import StrategyConfig from '@/components/StrategyConfig'
import createExample from '@/components/StrategyModel'

Vue.use(Router)

export const commontRouterMap = [{
    path: '/login',
    name: 'Login',
    hidden: true,
    component: Login
}, {
    path: '/',
    redirect: '/login'
}];

export const asyncRouterMap = [{
    path: '/admin',
    name: 'Home',
    hidden: true,
    component: Home,
    children: [{
        path: 'HomeIndex',
        name: 'HomeIndex',
        hidden: true,
        component: HomeIndex
    }]
}, {
    path: '/manage',
    name: 'Home',
    hidden: true,
    component: Home,
    children: [{
            path: 'UserList',
            name: 'UserList',
            hidden: true,
            component: UserList
        },
        {
            path: 'Rules',
            name: 'Rules',
            hidden: true,
            component: Rules
        },
        {
            path: 'NavigateConfig',
            name: 'NavigateConfig',
            hidden: true,
            component: NavigateConfig
        },
        {
            path: 'NavigateClassifyConfig',
            name: 'NavigateClassifyConfig',
            hidden: true,
            component: NavigateClassifyConfig
        },
        {
            path: 'StrategyConfig',
            name: 'StrategyConfig',
            hidden: true,
            component: StrategyConfig
        },
        {
            path: 'createExample',
            name: 'createExample',
            hidden: true,
            component: createExample
        }
    ]
}, {
    path: '/',
    redirect: '/login'
}]
console.log(store)

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: commontRouterMap.concat(asyncRouterMap)
})