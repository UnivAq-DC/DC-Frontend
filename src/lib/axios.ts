import Axios from 'axios'
import type { AxiosRequestConfig, AxiosRequestHeaders} from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { user } from './stores/user'
const API_URL = import.meta.env.DEV ? 'http://localhost:8080' : 'WRITE_YOUR_API_URL_HERE'
import { get } from 'svelte/store'
import { Api } from './api'
//@ts-ignore
const authInterceptor = createAuthRefreshInterceptor.default || createAuthRefreshInterceptor


function authRequestInterceptor(config: AxiosRequestConfig) {
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

authInterceptor(axios, async (err: any) => {
    if(err) console.error(err)
	console.log("Fetch refresh")
	try{
		const response = await fetch(`${API_URL}${Api.validationRoute}`)
		const data = await response.json()
		if(response.ok){
			user.setToken(data.data)
		}else{
			user.reset()
		}
	}catch(e){
		console.error(e)
		user.reset()
	}

	return Promise.resolve()
})