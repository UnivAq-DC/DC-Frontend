
export enum Language{
    Python = 'Python',
    Cpp = 'Cpp',
    C = 'C',
}

export interface IProject{
    title: string
    description: string
    languages: Language[]
    id: string
    markdown: string
}