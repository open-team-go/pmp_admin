import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url: '/back/room/index',
    method: 'post',
    data
  })
}

export function fetchAllList(data) {
  return request({
    url: '/back/room/all',
    method: 'post',
    data
  })
}

export function fetchAllTypes(data) {
  return request({
    url: '/back/room/type',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/back/room/add',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/back/room/delete',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/back/room/update',
    method: 'post',
    data
  })
}
