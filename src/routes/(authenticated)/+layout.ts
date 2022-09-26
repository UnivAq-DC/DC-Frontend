import { api } from "$lib/api";
import { redirect } from "@sveltejs/kit";

export const prerender = false
export const ssr = false

/** @type {import('./$types').LayoutLoad} */
export async function load() {
    const user = await api.checkLogin()
    if(user.ok){
        return {
            props: {
                user: user.data
            }
        }
    }
    console.log(user)
    console.log("Redirecting to login")
    throw redirect(302, '/login')
}