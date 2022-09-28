import { writable } from "svelte/store";
import type { ApiGetMethod, ApiGetRestMethod, ApiPostMethod, ApiPostNoDataMethod, ErrorResponse } from "./api";

type ResponseStore<T, E = ErrorResponse> = {
    loading: boolean
    error: E | null
    data: T | null
    ok: boolean
}

const EMPTY_RESPONSE = {
    loading: false,
    error: null,
    data: null,
    ok: false
}

type UseApiOptions<T, E = ErrorResponse> = {
    autoFetch?: boolean
    baseData?: T
    onError?: (typedError: E | null, error: any) => void
    onSuccess?: (data: T) => void
}

type UseApiOptionsNoAutoFetch<T, E = ErrorResponse> = {
    baseData?: T
    onError?: (typedError: E | null, error: any) => void
    onSuccess?: (data: T) => void
}

export function useGetApi<T>(method: ApiGetMethod<T>, options?: UseApiOptions<T>) {
    const { subscribe, set, update } = writable<ResponseStore<T>>({ ...EMPTY_RESPONSE, data: options?.baseData ?? null })
    async function fetch() {
        update(v => ({ ...v, loading: true }))
        const res = await method()
        if(!res.ok && options?.onError) options.onError(res.errorData, res.error)
        if(res.ok && options?.onSuccess) options.onSuccess(res.data)
        set({
            loading: false,
            error: res.ok ? null : res.error,
            data: res.ok ? res.data : null,
            ok: res.ok
        })
    }
    if (options?.autoFetch) fetch()
    return { subscribe, fetch }
}
export function useGetRestApi<T>(method: ApiGetRestMethod<T>, options?: UseApiOptions<T>) {
    const { subscribe, set, update } = writable<ResponseStore<T>>({ ...EMPTY_RESPONSE, data: options?.baseData ?? null })
    async function fetch(urlParams: string) {
        update(v => ({ ...v, loading: true }))
        const res = await method(urlParams)
        if(!res.ok && options?.onError) options.onError(res.errorData, res.error)
        if(res.ok && options?.onSuccess) options.onSuccess(res.data)
        set({
            loading: false,
            error: res.ok ? null : res.error,
            data: res.ok ? res.data : null,
            ok: res.ok
        })
    }
    if (options?.autoFetch) fetch('')

    return { subscribe, fetch }
}


export function usePostNoDataApi<T>(method: ApiPostNoDataMethod<T>, options?: UseApiOptions<T>) {
    const { subscribe, set, update } = writable<ResponseStore<T>>({ ...EMPTY_RESPONSE, data: options?.baseData ?? null })
    async function fetch() {
        update(v => ({ ...v, loading: true }))
        const res = await method()
        if(!res.ok && options?.onError) options.onError(res.errorData, res.error)
        if(res.ok && options?.onSuccess) options.onSuccess(res.data)
        set({
            loading: false,
            error: res.ok ? null : res.error,
            data: res.ok ? res.data : null,
            ok: res.ok
        })
    }
    if (options?.autoFetch) fetch()
    return { subscribe, fetch }

}
export function usePostApi<T, D>(method: ApiPostMethod<T, D>, options?: UseApiOptionsNoAutoFetch<T>) {
    const { subscribe, set, update } = writable<ResponseStore<T>>({ ...EMPTY_RESPONSE, data: options?.baseData ?? null })
    async function fetch(data: D) {
        update(v => ({ ...v, loading: true }))
        const res = await method(data)
        if(!res.ok && options?.onError) options.onError(res.errorData, res.error)
        if(res.ok && options?.onSuccess) options.onSuccess(res.data)
        set({
            loading: false,
            error: res.ok ? null : res.error,
            data: res.ok ? res.data : null,
            ok: res.ok
        })
    }
    return { subscribe, fetch }
}
