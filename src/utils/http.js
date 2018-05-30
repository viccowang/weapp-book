import wepy from 'wepy'

const remoteServer = 'http://192.168.10.241:3000'

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
      title: '返回数据有误!',
      icon: 'none',
      duration: 2000
    })
    return null
  }
}

function request ({ url, method, data }) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: remoteServer + url,
      method,
      data,
      header: {
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
