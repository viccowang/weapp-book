/**
 * book Storage
 */
import wepy from 'wepy'

export const USER_STORAGE_TOKEN_PERFIX = 'bookUserAuthToken'
export const USER_IS_AUTHORIZED = 'userIsAuthorized'
export const IS_ADMIN = 'bookUserIsAdmin'

export const IS_DEVICE_IPHONEX = 'isDeviceIphoneX'

export function getUserToken () {
  return wepy.getStorageSync(USER_STORAGE_TOKEN_PERFIX)
}

export function getUserIsAdmin () {
  return wepy.getStorageSync(IS_ADMIN)
}
