export enum Language {
    Python = 'Python',
    Cpp = 'Cpp',
    C = 'C',
    Java = 'Java',
    Plain = 'Plain',
}
export type ProblemPreview = { 
    id: number
    createdAt: string
    updatedAt: string
    languages: Language[]
    name: string
    description: string
    attachment: string
    template?: string
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