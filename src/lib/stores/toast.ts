import { writable } from "svelte/store"

enum ToastType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
}

type Toast = {
    title: string
    message: string
    type: ToastType
    timeout: number
    color: string
    _id: number
}
const colorMap = {
    'success': 'var(--accent)',
    'error': 'var(--red)',
    'info': 'var(--accent2)'
}
let id = 0
function createToastStore() {
    const { subscribe, set, update } = writable<Toast[]>([])

    function log(title: string, message: string, type: ToastType, timeout: number) {
        const color = colorMap[type]
        const _id = ++id
        update(v => [ ...v, { title, message, type, timeout, color, _id } ])
        setTimeout(() => {
            update(v => v.filter(t => t._id !== _id))
        }, timeout)
    }
    function error(message: string, timeout: number = 3000) {
        log('Error', message, ToastType.Error, timeout)
    }
    function success(message: string, timeout: number = 3000) {
        log('Success', message, ToastType.Success, timeout)
    }
    function warn(message: string, timeout : number = 3000) {
        log('Warning', message, ToastType.Info, timeout)
    }
    return {
        subscribe,
        log,
        error,
        success,
        warn
    }
}



export const logger = createToastStore()