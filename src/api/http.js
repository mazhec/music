import axios from 'axios'
import router from '../router'

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
// Content-type 相应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 基础url
// axios.defaults.baseURL = 'http://localhost:8888' // 304754dc-2c37-423a-be0a-cbcc95ff919e
axios.defaults.baseURL = 'http://123.57.86.194:8888'
// 相应拦截器
axios.interceptors.response.use(response => {
  // 如果response里面的status是200，说明访问到接口了，否则错误
  if(response.status == 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, err => {
  if (err.response.status) {
    switch(error.response.status) {
      case 401: //未登录
        router.replace({
          path: '/',
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
        break;
      case 404: // 没找到
        break;
    }
    return Promise.reject(err.response)
  }
})

/**
 * 封装get方法
 */
export function get(url, params={}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post方法
 */
 export function post(url, data={}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装put方法
 */
 export function put(url, data={}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装delete方法
 */
 export function del(url, data={}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}