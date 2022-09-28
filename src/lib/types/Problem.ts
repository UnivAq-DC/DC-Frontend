export enum Language {
    Python = 'python',
    Cpp = 'c++',
    C = 'c',
    Java = 'java',
    Plain = 'plain',
}
export type ProblemPreview = { 
    id: number
    createdAt: string
    updatedAt: string
    availableLanguages: Language[]
    name: string
    description: string
    attachment: string
    template?: string
    isCoding: boolean
}

export type Problem = ProblemPreview & {
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