import { post } from '@/utils/http'

/**
 * book state
 * @param {Object} isbn
 */
export function entryBook (isbn) {
  return post({
    url: '/api/sysBooks/addBooks',
    data: isbn
  })
}
