import { createAction } from 'redux-actions'
import { SET_USERINFO, SET_ADMIN } from '../types'

export const setUserInfo = createAction(SET_USERINFO, (res) => {
  return res
})

export const setAdmin = createAction(SET_ADMIN, res => {
  return res
})
