/**
 * book Storage
 */
import wepy from 'wepy'

export const USER_STORAGE_TOKEN_PERFIX = 'bookUserAuthToken'
export const IS_ADMIN = 'bookUserIsAdmin'

export function getUserToken () {
  return wepy.getStorageSync(USER_STORAGE_TOKEN_PERFIX)
}

export function getUserIsAdmin () {
  return wepy.getStorageSync(IS_ADMIN)
}
