import * as Faunadb from "faunaDb";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Collection, Documents, Index, Lambda, Match, Select} from "faunaDb";


// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export interface FaunaData {
    ref:Record<string, any>
    ts:string
    data:Record<string, any>
}

export enum DB_INDEX {
    USER_BY_UID = "localization_user_by_uid",
    PROJECT_OWNER_UID = "project_by_uid",
    PROJECT_BY_CONTRIBUTOR_ID = "project_by_contributor_id"
}

export enum DB_COLLECTION {
    USERS = "localization_users",
    PROJECT = "localization_projects",
}


export default class FaunaDbHelper {
     FQL = Faunadb.query

     connect(): Faunadb.Client {
       return new Faunadb.Client({secret: process.env.FAUNA_SECRET!});
     }
    async CreateWithCustomRef<T>(Collection:DB_COLLECTION, data:T, ref:string, client?:Faunadb.Client):Promise<Faunadb.Expr | FaunaData>{
        try {
            client = client ?? this.connect();
            const FQL = this.FQL;
            return await client.query(
                FQL.Create(FQL.Ref(FQL.Collection(Collection), ref), {
                    data: data,
                })
            );
        } catch (err) {

           throw Error(err.description);
        }
    }
    async Create<T>(Collection:DB_COLLECTION, data:T, client?:Faunadb.Client):Promise<Faunadb.Expr | FaunaData>{
        try {
            client = client ?? this.connect();
            const FQL = this.FQL;
            return await client.query(
                FQL.Create(FQL.Collection(Collection), {
                    data: data,
                })
            );
        } catch (err) {
            console.log(err);
           throw Error(err.description);
        }
    }

    async GetByIndex<T>(index:DB_INDEX, ref:string| number, client?:Faunadb.Client):Promise<Faunadb.Expr | FaunaData>{
        try {
            client = client ?? this.connect();
            const FQL = this.FQL;
            return await client.query(FQL.Get(Match(Index(index), ref)));
        } catch (e) {
            throw Error(e.description);
        }
    }

    async GetByRef<T>(collection: DB_COLLECTION, ref:string | number | boolean, limit = 25, client?:Faunadb.Client):Promise<T> {
        try {
            client = client ?? this.connect();
            const FQL = this.FQL;
            const result = await client.query( FQL.Get(FQL.Ref(FQL.Collection(collection), ref)) );
            return (result as FaunaData).data as T;
        } catch (error ){
            throw Error(error.description);
        }
    }

    async LoadByIndexBy<T>(index:DB_INDEX, reference:string, limit = 25):Promise<T>{
        // Pagination options .. Size, after, before
        try {
            const option: Record<string, string | number> = {};
            option['size'] = limit;


            const client = this.connect();
            const FQL = this.FQL;
            return await client.query(FQL.Map(
                FQL.Paginate(Match(Index(index), reference), option),
                Lambda((ref: string | number | boolean) => Select(['data'], FQL.Get(ref)))));
        } catch (e) {
            throw Error(e.description);
        }
    }

    async Get<T>(collection:DB_COLLECTION, limit = 25, after?:string, before?:string):Promise<T>{
        // Pagination options .. Size, after, before
        try {
            const option: Record<string, string | number> = {};
            option['size'] = limit;
            if (after)
                option['after'] = after;

            if (before)
                option['before'] = before;

            const client = this.connect();
            const FQL = this.FQL;
            return await client.query(FQL.Map(
                FQL.Paginate(Documents(Collection(collection)), option),
                Lambda((ref: string | number | boolean) => Select(['data'], FQL.Get(ref)))));
        } catch (e) {
            throw Error(e.description);
        }
    }

    async Update<T>(collection: DB_COLLECTION, reference:string, newData:string |number|boolean | Array<never> | Record<never, never>, updateFilled: string):Promise<T> {
        try {
            const client = this.connect();
            const FQL = this.FQL;
            return await client.query(FQL.Update(FQL.Ref(FQL.Collection(collection), reference),
                {data: {[updateFilled]: newData}})
            );
        } catch (e) {
            throw Error(e.description);
        }

    }


}

