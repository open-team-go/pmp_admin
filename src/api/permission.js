import request from '@/utils/request'
export function fetchAllList(data) {
	return request({
		url: '/back/perm/all',
		method: 'post',
		data
	})
}
