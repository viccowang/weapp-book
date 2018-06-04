import { get } from '@/utils/http'

/**
 * Company List
 */
export function getCompanyList () {
  return get({
    url: '/api/sysUser/getCompany'
  })
}
