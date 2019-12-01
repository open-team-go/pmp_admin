import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url: '/back/course/index',
    method: 'post',
    data
  })
}

export function fetchAllList(data) {
  return request({
    url: '/back/course/all',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/back/course/add',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/back/course/delete',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/back/course/update',
    method: 'post',
    data
  })
}
