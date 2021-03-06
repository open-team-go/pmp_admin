import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['authentication'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  
  if(config.method.toUpperCase()=="POST"){
    let pageNum = 0
    let pageSize = 0
    if(config.data){
      pageNum = config.data.pageNum || 0
      pageSize = config.data.pageSize || 0
      delete config.data.pageNum
      delete config.data.pageSize
    }

    var header = {
      authentication: config.headers['authentication'] || null,
      pageNum,
      pageSize
    }
    console.log(config.data)
    console.log(header)
    config.data = config.data?config.data:{};
    const qdata = {
      body: config.data || {},
      header: Object.assign({},header,config.data.header)
    }
    config.data = qdata
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const rData = response.data
    const res = {
      ...rData.header,
      data: rData.body
    }
    if (res.code !== "SUCCESS") {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })

      // 401:未登录;
      if (res.code === 401||res.code === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.msg,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
