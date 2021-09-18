import firebase from "firebase/compat";
type userType = "dev"| "fr_dev" | "no_dev"
export interface UserTypeInfo {
    type:userType
    label:string
}
export interface UserModelInterface {
    type:UserTypeInfo
    organizationName?:string,
    displayName: string | null;
    email: string | null;
    phoneNumber?: string | null;
    photoURL?: string | null;
    providerId?: string;
    userTypeCode:userType
    /**
     * The user's unique ID.
     */
    uid: string

}

// export default class UserModel {
//     _user!: UserModelInterface
//
//     constructor(user: UserModelInterface) {
//         this._user = user;
//     }
//
//      details ():UserModelInterface {
//         return this._user
//     }
//
//     details() {
//         return undefined;
//     }
// }