

export type ServerError = {
    message: string
    statusCode: 500
}

export type UnauthorizedError = {
    message: string
    statusCode: 401
}

export type BadRequestError = {
    message: string
    statusCode: 400
}

export type SuccessfulRequest<T> = T & {
    message: string
    statusCode: 200
}

export type PreconditionFailed = {
    message: string
    statusCode: 412
}

export type ErrorRequest<T> =  T | ServerError | UnauthorizedError | BadRequestError | PreconditionFailed 