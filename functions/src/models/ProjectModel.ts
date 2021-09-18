// import {firestore} from "firebase-admin";
// import Timestamp = firestore.Timestamp;
//
// export interface ProjectModel {
//     name:string,
//     description:string
//     owner:string
//     contributors:Array<string>
//     localization:Array<ProjectLocal>
//     ref:string
//     createdOn:Timestamp
// }
// export interface Key {
//     value:string,
//     label?:string
// }
// export interface ProjectLocal {
//     local: LocalDetail
//     isDefault?: boolean
//     isKey?: boolean,
//     isExpanded?: boolean,
//     keys: Array<Key>
// }
//
// export interface LocalDetail {
//     name: string,
//     code: string,
//     flag?: string,
//     color?: string
// }