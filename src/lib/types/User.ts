import type { ErrorRequest } from "./Base"

export type BaseApiResponse = {
    message: string
    statusCode: number
}

export type UserLogin = {
    email: string
    password: string
}
export type UserRegister = {
    username: string
    email: string
    password: string
    passwordConfirm: string
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
export type UserRegisterResponse = BaseApiResponse & {
    id: number
    createdAt: string
    updatedAt: string
    username: string
    email: string
}

export type UserRegisterError = {
    statusCode: 422
    message: string
    error: string
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