import Axios from 'axios'
import type { AxiosRequestConfig, AxiosError, AxiosRequestHeaders} from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
const API_URL = 'http://localhost:5000/' //ENV???

//@ts-ignore
const authInterceptor = createAuthRefreshInterceptor.default || createAuthRefreshInterceptor

const storage = {
    token: '',
}

function authRequestInterceptor(config: AxiosRequestConfig) {
	if (config.url === 'auth/login') return config
	const token = storage.token
    const headers: AxiosRequestHeaders = { ...config.headers }
	if (token) {
		headers.authorization = `Bearer ${token}`
	}
	headers.Accept = 'application/json'
    config.headers = headers
	return config
}

export const axios = Axios.create({
	baseURL: API_URL,
	withCredentials: true
})
axios.interceptors.request.use(authRequestInterceptor)

axios.interceptors.response.use(
	(res) => res.data,
	(err:AxiosError) => {
		storage.token = ""
		return Promise.reject(err)
	}
)
authInterceptor(axios, async (err: any) => {
    if(err) console.error(err)
	console.log("Fetch refresh")
	const response = await Axios.post(API_URL + 'auth/refresh', {}, { withCredentials: true })
	if (response.data)
		storage.token = response.data
	return Promise.resolve()
})