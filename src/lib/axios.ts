import Axios from 'axios'
import type { AxiosRequestConfig, AxiosError, AxiosRequestHeaders} from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { user } from './stores/user'
const API_URL = 'http://localhost:8080/' //ENV???
import { get } from 'svelte/store'
import { api } from './api'
//@ts-ignore
const authInterceptor = createAuthRefreshInterceptor.default || createAuthRefreshInterceptor


function authRequestInterceptor(config: AxiosRequestConfig) {
	if (config.url === 'auth/login') return config
	const token = get(user).token
    const headers: AxiosRequestHeaders = { ...config.headers }
	if (token) {
		headers.authorization = `Bearer ${token}`
	}
	headers.Accept = 'application/json'
    config.headers = headers
	return config
}

export const axios = Axios.create({
	baseURL: API_URL
})
axios.interceptors.request.use(authRequestInterceptor)

axios.interceptors.response.use(
	(res) => res,
	(err:AxiosError) => {
		user.reset()
		return Promise.reject(err)
	}
)
authInterceptor(axios, async (err: any) => {
    if(err) console.error(err)
	console.log("Fetch refresh")
	const response = await api.checkLogin()
	if(response.ok){
		user.setToken(response.data.data)
	}else{
		user.reset()
	}
	return Promise.resolve()
})