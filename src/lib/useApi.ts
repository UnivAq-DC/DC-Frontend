import { writable } from "svelte/store";
import type { ApiGetMethod, ApiGetRestMethod, ApiPostMethod, ApiPostNoDataMethod } from "./api";

type ResponseStore<T> = {
    loading: boolean
    error: Error | null
    data: T | null
    ok: boolean
}
const EMPTY_RESPONSE = {
    loading: false,
    error: null,
    data: null,
    ok: false
}
export function useGetApi<T>(method: ApiGetMethod<T>, preFetch?: boolean) {
    const { subscribe, set, update } = writable<ResponseStore<T>>({ ...EMPTY_RESPONSE })
    async function fetch() {
        update(v => ({ ...v, loading: true }))
        const res = await method()
        set({
            loading: false,
            error: res.ok ? null : res.error,
            data: res.ok ? res.data : null,
            ok: res.ok
        })
    }
    if (preFetch) fetch()
    return { subscribe, fetch }
}
export function useGetRestApi<T>(method: ApiGetRestMethod<T>, preFetch?: boolean) {
    const { subscribe, set, update } = writable<ResponseStore<T>>({ ...EMPTY_RESPONSE })
    async function fetch(urlParams: string) {
        update(v => ({ ...v, loading: true }))
        const res = await method(urlParams)
        set({
            loading: false,
            error: res.ok ? null : res.error,
            data: res.ok ? res.data : null,
            ok: res.ok
        })
    }
    if (preFetch) fetch('')
    return { subscribe, fetch }
}


export function usePostNoDataApi<T>(method: ApiPostNoDataMethod<T>) {
    const { subscribe, set, update } = writable<ResponseStore<T>>({ ...EMPTY_RESPONSE })
    async function fetch() {
        update(v => ({ ...v, loading: true }))
        const res = await method()
        set({
            loading: false,
            error: res.ok ? null : res.error,
            data: res.ok ? res.data : null,
            ok: res.ok
        })
    }
    return { subscribe, fetch }

}
export function usePostApi<T, D>(method: ApiPostMethod<T, D>) {
    const { subscribe, set, update } = writable<ResponseStore<T>>({ ...EMPTY_RESPONSE })
    async function fetch(data: D) {
        update(v => ({ ...v, loading: true }))
        const res = await method(data)
        set({
            loading: false,
            error: res.ok ? null : res.error,
            data: res.ok ? res.data : null,
            ok: res.ok
        })
    }
    return { subscribe, fetch }
}
