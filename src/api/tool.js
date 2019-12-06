import request from '@/utils/request'

export function clearCache(data) {
  return request({
    url: '/cache/clean/conf',
    method: 'post',
    data
  })
}