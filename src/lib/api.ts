import type { AxiosResponse } from "axios"
import type { IProject } from "src/types/Project"
import type { UserLogin, UserLoginResponse } from "src/types/User"
import { axios } from "./axios"

type BaseResponse = {
    res: AxiosResponse
}
type BaseResponseError = BaseResponse &  {
    ok: false
    error: Error
}
type BaseResponseOk<T> = BaseResponse & {
    ok: true
    data: T
}
type Response<T> = Promise<BaseResponseOk<T> | BaseResponseError>
export type ApiGetMethod<T> = () => Response<T>
export type ApiGetRestMethod<T> = (urlParams: string) => Response<T>
export type ApiPostMethod<T, P> = (data: P) => Response<T>
export type ApiPostNoDataMethod<T> = () => Response<T>

class Api{
    //keep as anonymous function to preserve `this` context
    getJson = async <T>(path: string) : Response<T> => {
        const res = await axios.get(path)
        try{
            const data = res.data as T
            return {ok: true, data, res}
        }catch(e: any){
            return {ok: false, error: e, res}
        }
    }
    postJson = async <T, D>(path: string, data: D) : Response<T> => {
        const res = await axios.post(path, data)
        try{
            const data = res.data as T
            return {ok: true, data, res}
        }catch(e: any){
            return {ok: false, error: e, res}
        }
    }
    fetchProjects = async (): Response<IProject[]> => {
        return this.getJson<IProject[]>('projects')
    }
    loginUser = async (data: UserLogin): Response<UserLoginResponse> => {
        return this.postJson('login', data)
    }   
    
}



export const api = new Api()