import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url: '/back/user/index',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/back/user/add',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/back/user/delete',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/back/user/detail',
    method: 'post',
    data
  })
}


export function update(data) {
  return request({
    url: '/back/user/update',
    method: 'post',
    data
  })
}

export function education(data) {
  return request({
    url: '/back/user/education',
    method: 'post',
    data
  })
}

export function payType(data) {
  return request({
    url: '/back/user/payType',
    method: 'post',
    data
  })
}


export function importUser(data) {
  return request({
    url: '/back/import/user',
    method: 'post',
    data
  })
}
