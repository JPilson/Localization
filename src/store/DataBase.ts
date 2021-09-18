
import {openDB, deleteDB, wrap, unwrap, IDBPTransaction, StoreNames, IDBPDatabase} from 'idb';

export enum DataInterfaceType {

}

export interface DataInterface<T>  {
    type: DataInterfaceType;
    data: T;
    isUpdateItemIndex?:number;

}
export enum  TABLE_NAME {
    USERS = "users",
    WORDS ="words",
    languages = "languages",
    USER_STATS = "user_stats"
}
export default class DataBase {

    private static DB_NAME = "playWithWords";
    private static VERSION = 2;



    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {

    }

    static async openDb() {

        try {

            await openDB(this.DB_NAME, this.VERSION,{
                upgrade(database: IDBPDatabase<any>, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<any, StoreNames<any>[], "versionchange">) {
                    // …
                    //TODO any new Update all the object store everywhere
                    if (newVersion === 1) {
                        //
                        database.createObjectStore(TABLE_NAME.WORDS, {keyPath: 'word'})
                            .createIndex("word", "word", {unique: true});

                    } else if (newVersion === 2) {
                        // db.createObjectStore(DataBase.TABLE_USER,{keyPath:'id'})
                        //     .createIndex("id","id",{unique:true});
                        //
                        database.createObjectStore(TABLE_NAME.USER_STATS, {keyPath:'id'})
                            .createIndex("id","id",{unique:true});

                    } else if (newVersion === 3) {

                        //

                    }
                },
                blocked() {
                     console.log("Blocked");
                },
                blocking() {
                    // …
                    console.log("Blocking");
                },
                terminated() {
                    // …
                    console.log("Terminated");
                },
                }
            );
        } catch (e) {
             console.log(e);
        }
    }


    static  async insertInto<T>(TABLE:TABLE_NAME,VALUE:T){
        openDB(this.DB_NAME,this.VERSION).then((db)=>{
            db.transaction([TABLE],"readwrite")
                .objectStore(TABLE).put(VALUE).catch((error:Error) =>{
                console.log(`Error: ${error}\nOn  Transaction for  ${TABLE} with ${VALUE}  `);
            })
        }).catch((err:Error)=>{
            console.log(`Error:${err} ` ,);
            return err;
        })
    }


    static READ_FROM_DB<T>(TABLE:TABLE_NAME,GET_BY:string,REFERENCE:string|number){
        return  openDB(this.DB_NAME,this.VERSION).then((db)=>{

            const transaction =  db.transaction(TABLE,"readonly").objectStore(TABLE);
            const queryIndex = transaction.index(GET_BY);

            return  queryIndex.openCursor(IDBKeyRange.only(REFERENCE)).then((result:any)=>{

                return  result as T;
            }).catch((error:Error) =>{
                console.log(`Error on ${TABLE}` ,error);
                return null;
            });

        }).catch((err:Error)=>{
            console.log(`Error on reading ${TABLE} for ${GET_BY} : ${REFERENCE}\n` ,err);
            return null
        });
    }

}