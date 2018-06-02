import { get, post } from '@/utils/http'

/**
 * book state
 * @param {Object} isbn
 */
export function getBookState (isbn) {
  return get({
    url: '/api/sysBooks/bookStatus',
    data: isbn
  })
}

/**
 * borrow a book
 * @param {Object} isbn
 */
export function borrowBook (isbn) {
  return post({
    url: '/api/sysBooks/borrowBooks',
    data: isbn
  })
}

/**
 * return a book
 * @param {Object} isbn
 */
export function returnBook (isbn) {
  return post({
    url: '/api/sysBooks/returnBooks',
    data: isbn
  })
}

/**
 * book detail
 * @param {Object} isbn
 */
export function bookDetail (isbn) {
  return get({
    url: '/api/sysBooks/getBooks',
    data: isbn
  })
}

/**
 * book rate
 * @param {Object} isbn
 */
export function rateBook (params) {
  return post({
    url: '/api/sysBooks/addGrade',
    data: params
  })
}
