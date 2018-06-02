/**
 * book Storage
 */
import wepy from 'wepy'

export const USER_STORAGE_TOKEN_PERFIX = 'bookUserAuthToken'

export function getUserToken () {
  return wepy.getStorageSync(USER_STORAGE_TOKEN_PERFIX)
}
