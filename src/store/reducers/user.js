import { handleActions } from 'redux-actions'
import { SET_USERINFO } from '../types/user'

export default handleActions({
  [SET_USERINFO] (state, action) {
    return {
      ...state,
      isAuthorized: !!action.payload.nickName,
      userInfo: Object.assign({}, state.userInfo, action.payload)
    }
  }
}, {
  isAuthorized: false,
  userInfo: {}
})
