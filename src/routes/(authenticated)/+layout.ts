import { dev } from "$app/environment";
import { api } from "$lib/api";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutLoad} */
export async function load() {
    const user = await api.checkLogin()
    if(dev){
        return {
            props: {
                user: {
                    username: 'test',
                    id: 'test',
                }
            }
        }
    }
    if(user.ok){
        return {
            props: {
                user: user.data
            }
        }
    }
    console.log("Redirecting to login")
    throw redirect(302, '/user/login')
}