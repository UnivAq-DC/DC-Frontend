export enum Language {
    Python = 'Python',
    Cpp = 'Cpp',
    C = 'C',
    Java = 'Java',
    Plain = 'Plain',
}
export interface ProblemPreview{ 
    id: number
    createdAt: string
    updatedAt: string
    name: string
    description: string
    attachment: string
    template?: string
}

export type Problem = {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    description: string
    attachment: string
    template?: string
    testcaseList?: Testcase[]
}



export type Testcase = {
    id: number
    createdAt: string
    updatedAt: string
    number: number
    input: string
    expectedOutput: string
    score: number
    problemId: number
}
