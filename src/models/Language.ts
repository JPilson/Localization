export interface LanguageModelInterface {
    name:string,
    flag?:string,
    code:string,
    isDefault?:boolean
}


export default class LanguageModel {
    _language!: LanguageModelInterface

    constructor(language: LanguageModelInterface) {
        this._language = language;

    }
}

export const languageList:Array<LanguageModelInterface> = [
    {name: "English", code: "en"},
    {name: "Portuguese", code: "pt"},
    {name: "Deutsch", code: "de"},
    {name: "French", code: "fr"},
    {name: "Spanish", code: "sp"},
    {name: "Chinese", code: "ch"}
]