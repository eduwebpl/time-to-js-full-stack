import { writable, derived } from 'svelte/store'
import { axiosInstance } from '../resources/axios-instance.js';

const ANONYMOUS_USER = {
	id: 0,
	email: '',
	token: ''
}

function createAuthStore() {
	const { subscribe, set } = writable(ANONYMOUS_USER)

	return {
		subscribe,
		singIn(email, token) {
			set({	id: 1, email, token})
			axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
		},
		signOut() {
			set(ANONYMOUS_USER)
			axiosInstance.defaults.headers["Authorization"] = ''
		}
	}
}

export const authStore = createAuthStore()
export const isAuth = derived(authStore, ({token}) => Boolean(token))
