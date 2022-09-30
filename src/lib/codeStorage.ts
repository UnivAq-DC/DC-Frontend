import Dexie from 'dexie';
import { Language } from './types/Problem';


type StoredProblem = {
    language: Language,
    code: string,
    problemId: number,
    id: string,
}
type StoredProblemResult = {
    problem: StoredProblem | null,
    defaultOfLanguage: string,
}


class CodeStorage extends Dexie {
    private code!: Dexie.Table<StoredProblem, string>
    constructor(){
        super('CodeStorage')
        this.version(1).stores({
            code: 'id, problemId, language, code'
        })
    }
    async getProblemCode(problemId: number, language: Language): Promise<StoredProblemResult> {
        const id = `${problemId}-${language}`
        const problem = (await this.code.get({ id })) ?? null
        let defaultOfLanguage = defaultByLanguage[language] ?? ''
        return { problem, defaultOfLanguage }
    }
    async storeProblemCode(problemId: number, language: Language, code: string): Promise<void> {
        const id = `${problemId}-${language}`
        await this.code.put({ id, problemId, language, code }, id)
    }
    getDefaultByLanguage(language: Language): string {
        return defaultByLanguage[language] ?? ''
    }
}
export const codeStorage = new CodeStorage();


const defaultByLanguage: Record<Language, string> = {
    [Language.C]: 
    `
#include <stdio.h>
int main(){
    return 0;
}`.trim(),
    [Language.Cpp]: 
`
#include <iostream>
int main(){
    return 0;
}`.trim(),
    [Language.Java]: 
`
public class Main{
    public static void main(String[] args){

    }
}`.trim(),
    [Language.Python]: 
`
def main():


main()
`.trim(),
    [Language.Plain]: ''
}


