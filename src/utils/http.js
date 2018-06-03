import wepy from 'wepy'
import { getUserToken } from './storage'

// const remoteServer = 'http://192.168.10.241:3000/mock/205'
const remoteServer = 'http://192.168.10.166:9651'

function handlerStatus (res) {
  if (res.statusCode === 200) {
    return res.data
  } else {
    wepy.showToast({
      title: '服务器响应失败!',
      icon: 'none',
      duration: 2000
    })
    return null
  }
}

function handlerResponse (res) {
  if (res.head && res.head.code === '200') {
    return res.data
  } else {
    wepy.showToast({
      title: res.head.msg,
      icon: 'none',
      duration: 2000
    })
    return null
  }
}

function request ({ url, method, data }) {
  return new Promise((resolve, reject) => {
    const userToken = getUserToken()
    wepy.request({
      url: remoteServer + url,
      method,
      data,
      header: {
        'Authorization': userToken || '',
        'Content-Type': 'application/json'
      },
      success (res) {
        resolve(handlerResponse(handlerStatus(res)))
      },
      fail (res) {
        reject(res)
      }
    })
  })
}

function get ({ url, data }) {
  return request({ url, method: 'GET', data: data || null })
}

function post ({url, data}) {
  return request({url, data, method: 'POST'})
}

export {
  get,
  post
}
