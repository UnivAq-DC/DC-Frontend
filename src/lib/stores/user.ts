import { browser } from '$app/environment'
import type { User, UserLoginResponse } from '$lib/types/User'
import { writable } from 'svelte/store'


function createUserStore() {
    const { subscribe, set, update } = writable<User>({
        username: '',
        token: ''
    })

    function reset(){
        set({ username: '', token: '' })
    }
    
    function setToken(token: string){
        localStorage.setItem('auth_token', token)
        update(user => {
            user.token = token
            return user
        })
    }
    if(browser){
        const token = localStorage.getItem('auth_token')
        if(token) setToken(token)
    }
    return {
        subscribe,
        set,
        update,
        reset,
        setToken
    }
}

export const user = createUserStore()