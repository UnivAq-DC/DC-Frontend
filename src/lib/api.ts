import type { AxiosResponse } from "axios"
import type { IProject } from "src/types/Project"
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
export type ApiMethod<T> = () => Response<T>
class Api{
    //keep as anonymous function to preserve `this` context
    fetchJson = async <T>(path: string) : Response<T> => {
        const res = await axios.get(path)
        try{
            const data = res.data as T
            return {ok: true, data, res}
        }catch(e: any){
            return {ok: false, error: e, res}
        }
    }

    fetchProjects = async (): Response<IProject[]> => {
        return this.fetchJson<IProject[]>('projects')
    }
}



export const api = new Api()