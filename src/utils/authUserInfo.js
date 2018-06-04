import wepy from 'wepy'
import { SET_USERINFO } from '@/store/types'

export function canUseUserInfo () {
  return new Promise((resolve, reject) => {
    wepy.getUserInfo({
      success (res) {
        resolve(res)
      },
      fail (error) {
        reject(error)
      }
    })
  })
}

export function authUserInfo (store) {
  wepy.getUserInfo({
    success (res) {
      store.dispatch({
        type: SET_USERINFO,
        payload: res.userInfo
      })
    },
    fail () {
      store.dispatch({
        type: SET_USERINFO,
        payload: null
      })
    }
  })
}
