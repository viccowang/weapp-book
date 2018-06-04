import { get, post } from '@/utils/http'

/**
 * my borrow list
 * @param {Object} isbn
 */
export function myBorrowList (userId) {
  return get({
    url: '/api/sysBooks/myBorrow',
    data: userId
  })
}

/**
 * 获取用户是否填入了真实信息
 */
export function getUserInfoState () {
  return get({
    url: '/api/sysUser/userInfoInputStatus'
  })
}

/**
 * 用户录入的真实信息
 */
export function setUserRealInfo (info) {
  return post({
    url: '/api/sysUser/addUserInfo',
    data: info
  })
}

/**
 * 获取用户录入的真实信息
 */
export function getUserRealInfo () {
  return get({
    url: '/api/sysUser/userInfo'
  })
}
