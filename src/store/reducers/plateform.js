import { handleActions } from 'redux-actions'
import { IS_IPHONEX } from '../types'

export default handleActions({
  [IS_IPHONEX] (state, action) {
    return {
      ...state,
      isIphoneX: action.payload
    }
  }
}, {
  isIphoneX: false
})
