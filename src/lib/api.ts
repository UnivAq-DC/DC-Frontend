import type { AxiosRequestConfig, AxiosResponse } from "axios"
import type { Problem, ProblemPreview } from "$lib/types/Problem"
import type { ErrorLoginResponse, UserLogin, UserLoginResponse } from "$lib/types/User"
import { axios } from "./axios"
import type { Submitment, UserSubmitment, UserSubmitmentErrorResponse, UserSubmitmentResponse } from "./types/UserSubmitment"


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
export type ErrorResponse = any
type Response<T, E = ErrorResponse> = Promise<BaseResponseOk<T> | BaseResponseError<E>>
export type ApiGetMethod<T, E = ErrorResponse> = () => Response<T, E>
export type ApiGetRestMethod<T, E = ErrorResponse> = (urlParams: string) => Response<T, E>
export type ApiPostMethod<T, P, E = ErrorResponse> = (data: P) => Response<T, E>
export type ApiPostNoDataMethod<T, E = ErrorResponse> = () => Response<T, E>

export class Api {
    //keep as anonymous function to preserve `this` context
    getJson = async <T, E = ErrorResponse>(path: string, options?: AxiosRequestConfig): Response<T, E> => {
        try {
            const res = await axios.get<T>(path, options)
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
    postJson = async <T, D, E = ErrorResponse>(path: string, requestData: D, options?: AxiosRequestConfig): Response<T, E> => {
        try {
            const res = await axios.post<T>(path, requestData, options)
            const data = res.data
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
    fetchProblems = async (): Response<ProblemPreview[]> => {
        return this.getJson<ProblemPreview[]>('problems')
    }
    fetchUserSubmitments = async (): Response<Submitment[]> => {
        return this.getJson('submitments')
    }
    submitSubmitment = async (data: UserSubmitment): Response<UserSubmitmentResponse, UserSubmitmentErrorResponse> => {
        return this.postJson('submitments', data)
    }
    fetchProblem = async (id: string): Response<Problem> => {
        return this.getJson<Problem>(`problems/${id}`)
    }
    loginUser = async (data: UserLogin): Response<UserLoginResponse, ErrorLoginResponse> => {
        return this.postJson('auth/signin', data)
    }
    static validationRoute = "users/me"
    checkLogin = async (): Response<UserLoginResponse> => {
        return this.getJson(Api.validationRoute, { withCredentials: true })
    }
}



export const api = new Api()