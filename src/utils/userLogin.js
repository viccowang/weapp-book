import wepy from 'wepy'
import { getStore } from 'wepy-redux'
import { userLogin } from '@/api/login'
import { canUseUserInfo, authUserInfo } from '@/utils/authUserInfo'
import { getUserInfoState } from '@/api/my'
import { USER_STORAGE_TOKEN_PERFIX, IS_ADMIN } from '@/utils/storage'
import { SET_AUTHORIZED, SET_CANUSE_USERINFO, SET_ADMIN } from '@/store/types'

function getUserInfo() {
  const store = getStore()
  canUseUserInfo()
    .then(() => {
      store.dispatch({
        type: SET_CANUSE_USERINFO,
        payload: true
      })
    })
    .then(() => {
      // 获取用户信息存入store
      authUserInfo(store)
    })
    .catch(() => {})
}

function clearUserLoginInfo () {
// 清空所有已存的缓存数据
  wepy.clearStorage()
  //
  const store = getStore()
  //
  store.dispatch({ type: SET_AUTHORIZED, payload: false })
  store.dispatch({type: SET_ADMIN, payload: false})
}

/**
 * 调用微信接口后生产CODE, 与服务端请求获取用户TOKEN, 并做一些后续工作
 */
export default function userLoginFunc () {
  return new Promise((resolve, reject) => {
    wepy.showLoading({ title: '正在登录...' })
    // 初始化所有值
    clearUserLoginInfo()
    // 开启登录
    wepy.login({
      success (res) {
        const store = getStore()
      // 登录本地服务器验证获取登录TOKEN
        userLogin({code: res.code}).then(res => {
          if (res && res.token) {
          // 配置全局TOKEN
            wepy.setStorage({
              key: USER_STORAGE_TOKEN_PERFIX,
              data: res.token
            })
          // 配置全局认证环境
            store.dispatch({ type: SET_AUTHORIZED, payload: true })
          // 配置该用户是否为管理员
            const isAdmin = res.isAdmin === '1'
            wepy.setStorage({
              key: IS_ADMIN,
              data: isAdmin
            })
            store.dispatch({type: SET_ADMIN, payload: isAdmin})
          // 配置改用户是否授权了用户资料接口
            getUserInfo()
          // 监测用户是否填入了真实信息,因为后期真实信息在做统计,借阅制度管理时非常重要,
          // 所以这里必须走该流程
            getUserInfoState().then(res => {
              const exitsUserInfo = res.exitsUserInfo
              // 监测通过跳转至首页
              if (!exitsUserInfo) {
                wepy.redirectTo({
                  url: './newbie',
                  success () {
                    // 隐藏登录状态
                    wepy.hideLoading()
                  }
                })
              } else {
                // 隐藏登录状态
                wepy.hideLoading()
              }
            })
            resolve()
          } else {
            wepy.hideLoading()
            wepy.showModal({
              title: '提醒',
              content: '获取用户Token失败,请联系钱大仙确认服务器无问题.',
              showCancel: false
            })
          }
        })
      },
      fail () {
        wepy.hideLoading()
        wepy.showModal({
          title: '提醒',
          content: '微信登录服务调用失败,请确认网络连接后稍后再尝试.',
          showCancel: false
        })
      }
    })
  })
}
