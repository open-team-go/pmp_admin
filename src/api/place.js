import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url: '/back/place/index',
    method: 'post',
    data
  })
}

export function fetchAllList(data) {
  return request({
    url: '/back/place/all',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/back/place/add',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/back/place/delete',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/back/place/update',
    method: 'post',
    data
  })
}
