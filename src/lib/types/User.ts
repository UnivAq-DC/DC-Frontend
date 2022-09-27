export type BaseApiResponse = {
    message: string
    statusCode: number
}

export type UserLogin = {
    email: string
    password: string
}
export type UserLoginResponse = BaseApiResponse & {
    data: string
}
export type ErrorLoginResponse = BaseApiResponse & {
    error: string
    message: string
}
export type User = {
    username: string
    token: string
}