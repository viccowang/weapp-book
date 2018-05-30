import { SET_USERINFO } from '../types'
import { createAction } from 'redux-actions'

export const setUserInfo = createAction(SET_USERINFO, (res) => {
  return res
})
