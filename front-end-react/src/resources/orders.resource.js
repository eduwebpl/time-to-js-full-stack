import { axiosInstance } from './axios-instance';

const URN = '/orders'

export const ordersResource = {
	getAll() {
		return axiosInstance.get(URN)
	},
	getOne(id) {
		return axiosInstance.get(`${URN}/${id}`)
	},
	makeOrder({restaurantId, productsIds, address}) {
		return axiosInstance.post(URN, {restaurantId, productsIds, address})
	}
}
