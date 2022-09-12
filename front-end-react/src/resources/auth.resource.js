import { axiosInstance } from './axios-instance';

const URN = '/users'

export const authResource = {
	signIn(email = '', password = '') {
		return axiosInstance.post(`${URN}/sign-in`, { email, password })
			.then((data) => {
				const { token } = data;
				axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
				return data
			})
			.catch((err) => {
				axiosInstance.defaults.headers['Authorization'] = ''
				throw err
			})
	}
}
