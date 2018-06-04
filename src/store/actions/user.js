import { createAction } from 'redux-actions'
import { SET_USERINFO, SET_CANUSE_USERINFO, SET_AUTHORIZED, SET_ADMIN } from '../types'

// 配置用户基本信息
export const setUserInfo = createAction(SET_USERINFO, res => {
  return res
})

// 是否可以使用UserInfo接口,也就是判断用户是否授权了该接口
export const canUseUserInfo = createAction(SET_CANUSE_USERINFO, res => {
  return res
})

// 配置用户授权
export const setAuthorized = createAction(SET_AUTHORIZED, res => {
  return res
})

// 设置当前用户是否为管理员
export const setAdmin = createAction(SET_ADMIN, res => {
  return res
})
