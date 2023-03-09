// eslint-disable-next-line @typescript-eslint/no-var-requires
import {UserModelInterface} from "@/models/User";
import {ProjectLocal, ProjectModelInterface} from "@/models/Project";
import FaunaDbHelper, {DB_COLLECTION, DB_INDEX, FaunaData} from "@/faundaHelper/FaunaDbHelper";
import Utils from "@/faundaHelper/Utils";
// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios').default;

const END_POINT = process.env["VUE_APP_END_POINT"]
export default class APiHelper {
    constructor() {
        //    EMPTY

    }

    async registerUser(userInfo: UserModelInterface): Promise<UserModelInterface> {
        //
        // const body = new URLSearchParams(userInfo as unknown as Record<string, never>)
        // return await this._request<UserModelInterface>(END_POINT + 'register/user', body)
        return FaunaDbHelper.instance.Create(DB_COLLECTION.USERS, userInfo)
            .catch(reason => {
                return {error: true, message: "Make sure your providing all the information and", reason: `${reason}`}
            }).then(result => {
                return (result as FaunaData).data as unknown as UserModelInterface
            })
    }

    async registerProject(project: ProjectModelInterface): Promise<{ data?: Array<ProjectModelInterface> }> {
        // const body = new URLSearchParams(project as unknown as Record<string, never>)
        // body.set("contributors", JSON.stringify(project.contributors));
        // body.set("localization", JSON.stringify(project.localization));
        // return await this._request<ProjectModelInterface>(END_POINT + 'register/project', body)

        return FaunaDbHelper.instance.CreateWithCustomRef(DB_COLLECTION.PROJECT, project, Utils.generateRef())
            .catch(reason => {
                return {error: true, message: "Make sure your providing all the information and", reason: `${reason}`}
            }).then(result => {
                return (result as FaunaData).data
            })

    }

    async getUserByUId(uid: string): Promise<UserModelInterface | null> {
        // return await this._request<UserModelInterface>(END_POINT + `user/${uid}`)
        return FaunaDbHelper.instance.GetByIndex(DB_INDEX.USER_BY_UID, uid)
            .catch(reason => {

                return null
            }).then(result => {
                return (result as FaunaData).data as unknown as UserModelInterface
            })
    }

    async getProjects(uid: string): Promise<Array<ProjectModelInterface>> {
        // return await this._request<ProjectModelInterface>(END_POINT + `user/${uid}/projects`)
        return FaunaDbHelper.instance.LoadByIndexBy<{ data:Array<ProjectModelInterface> }>(DB_INDEX.PROJECT_OWNER_UID, uid)
            .catch(reason => {
                console.log(reason)
                return {error: true, message: "Make sure your providing all the information and", reason: `${reason}`}
            }).then(result => {
                if("error" in result )
                    return []
                return result.data
            })
    }

    async updateProject(project: ProjectModelInterface): Promise<ProjectLocal | null> {
        // const body = new URLSearchParams({
        //     owner: project.owner as string,
        //     ref: project.ref as string,
        //     updatedFilled: "localization",
        //     newValue: JSON.stringify(project.localization) // TODO remove this so that this function can be used to update anything related to the project
        // })
        // return await this._request<ProjectModelInterface>(END_POINT + "update/project/specific", body)


        return FaunaDbHelper.instance.Update<{data: ProjectLocal }>(DB_COLLECTION.PROJECT,project.ref as string,project,"localization")
            .catch(reason => {
                return {error: true, message: "Make sure your providing all the information and", reason: `${reason}`}
            }).then(result => {
                if("error" in result )
                    return null
                return result.data
            })
    }

    async _request<T>(url: string, body?: URLSearchParams | null, deepFilter = false): Promise<{ data?: Array<T>; error: boolean, message?: string }> {
        try {

            const config = {
                method: 'POST',
                headers: {'content-type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': true,},
                data: body,
                url,
            };
            const result = await axios(config)

            if (result.data.error) {
                return result.data
            }
            return deepFilter ? result.data : result.data


        } catch (e) {
            // console.dir(e)
            return {
                error: true,
                message: e
            }
        }
    }
}
