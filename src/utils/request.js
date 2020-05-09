import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import Vue from 'vue'

const baseURL = 'http://ruiguo.ruiguohealth.com/api/public/index.php/api/'
    // const baseURL = process.env.NODE_ENV === 'production' ?
    //     process.env.API_ROOT.pro :
    //     process.env.API_ROOT.dev
const request = axios.create({
    baseURL,
    timeout: 20000,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
})


// 请求拦截器
request.interceptors.request.use(config => {
    //请求前
    if (config.method === 'post') {
        var data = ''
        for (let key in config.data) {
            data += key + '=' + config.data[key] + '&'
        }
        data = data.substr(0, data.length - 1)
        config.data = data
    }
    if (config.method == 'get') {}
    return config
}, err => {
    //请求错误时
    return Promise.reject(err)
})


// 响应拦截器

request.interceptors.response.use(response => {
    // if (response.data.code == 100) Message({
    //     type: "info",
    //     message: response.data.msg
    // })
    return response.data
}, err => {

    //请求错误时
    return Promise.reject(err)
})





export default request