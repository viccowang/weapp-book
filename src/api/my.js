import { get } from '@/utils/http'

/**
 * my borrow list
 * @param {Object} isbn
 */
export function myBorrowList (userId) {
  return get({
    url: '/api/sysBooks/myBorrow',
    data: userId
  })
}
