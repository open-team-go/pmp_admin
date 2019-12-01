import request from '@/utils/request'
export function fetchAllList(data) {
	return request({
		url: '/back/role/all',
		method: 'post',
		data
	})
}

export function fetchList(data) {
	return request({
		url: '/back/role/index',
		method: 'post',
		data
	})
}

export function getPerms(data) {
	return request({
		url: '/back/role/perms',
		method: 'post',
		data
	})
}


export function updatePerms(data) {
	return request({
		url: '/back/role/perms/update',
		method: 'post',
		data
	})
}