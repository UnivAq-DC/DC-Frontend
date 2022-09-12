import type { AxiosResponse } from "axios"
import type { IProject } from "src/types/Project"
import type { UserLogin, UserLoginResponse } from "src/types/User"
import { axios } from "./axios"


type BaseResponseError<E> = {
    ok: false
    error: Error
    errorData?: E
    req?: any
    res?: AxiosResponse
    code: number
}
type BaseResponseOk<T> = {
    ok: true
    res: AxiosResponse
    data: T
}
type ErrorResponse = any
type Response<T, E = ErrorResponse> = Promise<BaseResponseOk<T> | BaseResponseError<E>>
export type ApiGetMethod<T, E = ErrorResponse> = () => Response<T, E>
export type ApiGetRestMethod<T, E = ErrorResponse> = (urlParams: string) => Response<T, E>
export type ApiPostMethod<T, P, E = ErrorResponse> = (data: P) => Response<T, E>
export type ApiPostNoDataMethod<T, E = ErrorResponse> = () => Response<T, E>

class Api {
    //keep as anonymous function to preserve `this` context
    getJson = async <T, E = ErrorResponse>(path: string): Response<T, E> => {
        try {
            const res = await axios.get<T>(path)
            return { ok: true, data: res.data, res }
        } catch (e: any) {
            if (e.response) {
                return {
                    ok: false,
                    error: e,
                    res: e.response,
                    errorData: e.response.data as E,
                    code: e.response.status
                }
            }
            return {
                ok: false,
                error: e,
                req: e.request,
                code: 0
            }
        }
    }
    postJson = async <T, D, E = ErrorResponse>(path: string, requestData: D): Response<T, E> => {
        try {
            const res = await axios.post(path, requestData)
            const data = res.data as T
            return { ok: true, data, res }
        } catch (e: any) {
            if (e.response) {
                return {
                    ok: false,
                    error: e,
                    res: e.response,
                    errorData: e.response.data as E,
                    code: e.response.status
                }
            }
            return {
                ok: false,
                error: e,
                req: e.request,
                code: 0
            }
        }
    }
    fetchProjects = async (): Response<IProject[]> => {
        return this.getJson<IProject[]>('projects')
    }
    loginUser = async (data: UserLogin): Response<UserLoginResponse> => {
        return this.postJson('login', data)
    }
    checkLogin = async (): Response<UserLoginResponse> => {
        return this.getJson('status')
    }
}



export const api = new Api()