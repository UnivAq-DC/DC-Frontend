import { writable } from "svelte/store";
import type { ApiMethod } from "./api";


type ResponseStore<T> = {
    loading: boolean
    error: Error | null
    data: T | null
    ok: boolean
}
export async function useApi<T>(method: ApiMethod<T>) {
    const { subscribe, set, update } = writable<ResponseStore<T>>({
        loading: false,
        error: null,
        data: null,
        ok: false
    })
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
    fetch()

    return {
        subscribe,
        refetch: fetch
    }
}