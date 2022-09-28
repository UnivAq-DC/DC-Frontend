import type { Language } from "./Problem"
import type { BaseApiResponse } from "./User"


export type UserSubmitment = {
    code: string
    language: Language
    problemId: number
    isCode: boolean
}
export type Submitment = {
    id: number
    createdAt: string
    score: number
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
    statusCode: 401
    message: string[]
}