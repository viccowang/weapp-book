import { handleActions } from 'redux-actions'
import { SET_USERINFO, SET_ADMIN } from '../types/user'

export default handleActions({
  [SET_ADMIN] (state, action) {
    return {
      ...state,
      isAdmin: action.payload
    }
  },
  [SET_USERINFO] (state, action) {
    return {
      ...state,
      isAuthorized: !!action.payload.nickName,
      userInfo: Object.assign({}, state.userInfo, action.payload)
    }
  }
}, {
  isAuthorized: false,
  isAdmin: false,
  userInfo: {}
})
