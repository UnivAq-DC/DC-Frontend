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
export type UserMeResponse = BaseApiResponse & {
    sub: number
    username: string
    email: string
    iat: number
    exp: number
}

export type ErrorLoginResponse = BaseApiResponse & {
    error: string
    statusCode: 401
    message: string
}
export type User = {
    username: string
    token: string
}