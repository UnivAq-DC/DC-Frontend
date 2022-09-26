type DefaultResponse = {
    message: string
    statusCode: number
}

export type UserLogin = {
    email: string
    password: string
}
export type UserLoginResponse = DefaultResponse & {
    data: string
}
export type ErrorLoginResponse = DefaultResponse & {
    error: string
    message: string
}
export type User = {
    username: string
    token: string
}