import { createAction } from 'redux-actions'
import { IS_IPHONEX } from '../types'

export const isIphoneX = createAction(IS_IPHONEX, res => {
  return res
})
