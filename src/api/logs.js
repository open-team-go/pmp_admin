import request from '@/utils/request'

export function FetchLogs(data) {
  return request({
    url: '/back/log/index',
    method: 'post',
    data
  })
}