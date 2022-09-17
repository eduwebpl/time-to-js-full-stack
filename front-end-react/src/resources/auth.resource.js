import { axiosInstance } from './axios-instance';

const URN = '/users'

export const authResource = {
	signIn(email = '', password = '') {
		return axiosInstance.post(`${URN}/sign-in`, { email, password })
	}
}
