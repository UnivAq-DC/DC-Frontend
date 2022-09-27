import type { Language } from "./Problem"
import type { BaseApiResponse } from "./User"


export type UserSubmitment = {
    code: string
    language: Language
    problemId: number
}
export type Submitment = {
    id: number
    createdAt: string
    updatedAt: string
    code: string
    language: Language
    userId: number
    problemId: number
}
export type UserSubmitmentResponse = BaseApiResponse & {
    data: Submitment
}


export type UserSubmitmentErrorResponse = {
    error: string
    statusCode: number
    message: string[]
}