import type { UserLoginResponse } from '$lib/types/User'
import { writable } from 'svelte/store'


function createUserStore() {
    const { subscribe, set, update } = writable<UserLoginResponse>({
        username: '',
        token: ''
    })

    function reset(){
        set({ username: '', token: '' })
    }
    return {
        subscribe,
        set,
        update,
        reset
    }
}

export const user = createUserStore()