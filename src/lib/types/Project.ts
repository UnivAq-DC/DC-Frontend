export enum Language {
    Python = 'Python',
    Cpp = 'Cpp',
    C = 'C',
    Java = 'Java',
}

export interface IProject {
    title: string
    description: string
    languages: Language[]
    id: string
    markdown: string
}