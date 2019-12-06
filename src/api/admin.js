import request from '@/utils/request'
export function fetchList(data) {
	return request({
		url: '/back/admin/index',
		method: 'post',
		data
	})
}

export function add(data) {
	return request({
		url: '/back/admin/add',
		method: 'post',
		data
	})
}

export function del(data) {
	return request({
		url: '/back/admin/delete',
		method: 'post',
		data
	})
}

export function search(data) {
	return request({
		url: '/back/admin/search',
		method: 'post',
		data
	})
}


export function update(data) {
	return request({
		url: '/back/admin/update',
		method: 'post',
		data
	})
}
