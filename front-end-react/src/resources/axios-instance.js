import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL
})

axiosInstance.interceptors.response.use((res) => {
	return res.data
})
