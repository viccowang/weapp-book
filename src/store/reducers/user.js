import { handleActions } from 'redux-actions'
import { SET_USERINFO, SET_CANUSE_USERINFO, SET_AUTHORIZED, SET_ADMIN } from '../types/user'

export default handleActions({
  [SET_ADMIN] (state, action) {
    return {
      ...state,
      isAdmin: action.payload
    }
  },
  [SET_CANUSE_USERINFO] (state, action) {
    return {
      ...state,
      canUseUserInfo: action.payload
    }
  },
  [SET_AUTHORIZED] (state, action) {
    return {
      ...state,
      isAuthorized: action.payload
    }
  },
  [SET_USERINFO] (state, action) {
    return {
      ...state,
      userInfo: action.payload
    }
  }
}, {
  isAuthorized: false,
  canUseUserInfo: false,
  isAdmin: false,
  userInfo: null
})
