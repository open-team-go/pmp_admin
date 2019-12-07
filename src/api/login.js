import request from '@/utils/request'

// export function getInfo() {
//   return request({
//     url: '/admin/info',
//     method: 'get',
//   })
// }


export function login(data) {
	return request({
		url: '/back/admin/login',
		method: 'post',
		data
	})
}


export function logout(data) {
	return request({
		url: '/back/admin/login/out',
		method: 'post',
		data
	})
}