import { get } from '@/utils/http'

/**
 * user Login
 * @param {*} code
 */
export function userLogin (code) {
  return get({
    url: '/api/sysUser/login',
    data: code
  })
}
