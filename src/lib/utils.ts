import type { ErrorRequest } from "./types/Base"


export function getApiErrorMessage<T>(error: ErrorRequest<T>){
    //@ts-ignore
    if(Array.isArray(error.message)){
        //@ts-ignore
        return error.message.join(", ")
    }
    //@ts-ignore
    return error.message ?? "Unknown error"
}


export function isUrl(url: string){
    try {
        new URL(url)
        return true
    } catch (error) {
        return false
    }
}