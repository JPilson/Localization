
// eslint-disable-next-line @typescript-eslint/no-var-requires
import {UserModelInterface} from "@/models/User";
import {ProjectModelInterface} from "@/models/Project";
// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios').default;

const END_POINT = process.env["VUE_APP_END_POINT "]??"http://localhost:5000/"
enum endpoint {

}

export default class APiHelper {

    constructor() {
    //    EMPTY
    }
    async registerUser (userInfo:UserModelInterface): Promise<{ data?: Array<UserModelInterface>; error: boolean; message?: string }> {

        const body = new URLSearchParams(userInfo as Record<string, any>)

        return await this._request<UserModelInterface>(END_POINT + 'register/user', body)
    }
    async  registerProject(project:ProjectModelInterface): Promise<{ data?: Array<ProjectModelInterface>; error: boolean; message?: string,reason?: string }> {
        const body = new URLSearchParams(project as Record<string, any>)
        body.set("contributors",JSON.stringify(project.contributors));
        body.set("localization",JSON.stringify(project.localization));
        return await this._request<ProjectModelInterface>(END_POINT + 'register/project', body)
    }
    async getUserByUId (uid:string):Promise<{ data?: Array<UserModelInterface>; error: boolean; message?: string,reason?:string }> {
        return await this._request<UserModelInterface>(END_POINT + `user/${uid}`)
    }
    async getProjects (uid:string):Promise<{ data?: Array<ProjectModelInterface>; error: boolean; message?: string,reason?:string }> {
        return await this._request<ProjectModelInterface>(END_POINT + `user/${uid}/projects`)
    }

    async updateProject(project:ProjectModelInterface): Promise<{ data?: Array<ProjectModelInterface>; error: boolean; message?: string,reason?: string }>{
        const body =  new URLSearchParams({
            owner : project.owner as string,
            ref: project.ref as string,
            updatedFilled:"localization",
            newValue: JSON.stringify(project.localization) // TODO remove this so that this function can be used to update anything related to the project
        })
        return await this._request<ProjectModelInterface>(END_POINT + "update/project/specific",body)

    }

    async _request<T>(url:string,body?:URLSearchParams|null,deepFilter = false):Promise<{ data?: Array<T>; error: boolean,message?:string }>{
        try {
            const config = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: body,
                url,
            };
            const result = await axios(config)

            if(result.data.error ){
                return result.data
            }
            return  deepFilter ? result.data : result.data


        } catch (e) {
            return {
                error:true,
                message:e
            }
        }
    }
}
