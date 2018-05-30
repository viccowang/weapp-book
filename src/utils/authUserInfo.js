import wepy from 'wepy'
import { SET_USERINFO } from '@/store/types'
import { getStore } from 'wepy-redux'

const store = getStore()

export function authUserInfo () {
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
        payload: {}
      })
    }
  })
}
