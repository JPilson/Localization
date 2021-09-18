import {LanguageModelInterface} from "@/models/Language";

export interface ProjectModelInterface {
    title:string,
    description?:string
    owner:string  | null
    contributors:Array<string>
    localization:Array<ProjectLocal>
    ref:string | null
    createdOn:string,
    themeColor:string
}

export interface Key {
    value:string,
    label?:string
}

/**
 * Language or key
 */
export interface ProjectLocal {
    local: LanguageModelInterface
    isDefault?: boolean
    isKey?: boolean,
    isExpanded?: boolean,
    keys: Array<Key>
}



export default class ProjectModel {
    _project!: ProjectModelInterface

    constructor(project: ProjectModelInterface) {
        this._project = project;

    }
}