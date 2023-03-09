import {Client, Collection, Documents, Expr, Index, Lambda, Match, query, Select} from "faunadb";

export interface FaunaData {
    ref: Record<string, never>
    ts: string
    data: Record<string, never>
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
    private static _instance: FaunaDbHelper
    private FQL = query
    private FAUNA_SECRET = "fnAE-kLvr6AAzcqZvA5HGghrlcSzrNYg-73a3bAS"//process.env["VUE_APP_FAUNA_SECRET"]

    private constructor() {
        //      CANT BE CALLED OUTSIDE
        this.connect()
    }

    static get instance(): FaunaDbHelper {
        if (!this._instance)
            this._instance = new FaunaDbHelper()
        return this._instance
    }

    private connect(): Client {
        return new Client({secret: this.FAUNA_SECRET as string, domain: 'db.eu.fauna.com'});
    }

    async CreateWithCustomRef<T>(Collection: DB_COLLECTION, data: T, ref: string, client?: Client): Promise<Expr | FaunaData> {
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

    async Create<T>(Collection: DB_COLLECTION, data: T, client?: Client): Promise<Expr | FaunaData> {
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

    async GetByIndex<T>(index: DB_INDEX, ref: string | number, client?: Client): Promise<Expr | FaunaData> {
        try {
            client = client ?? this.connect();
            const FQL = this.FQL;
            return await client.query(FQL.Get(Match(Index(index), ref)));
        } catch (e) {
            console.log(e)
            throw Error(e.description);
        }
    }

    async GetByRef<T>(collection: DB_COLLECTION, ref: string | number | boolean, limit = 25, client?: Client): Promise<T> {
        try {
            client = client ?? this.connect();
            const FQL = this.FQL;
            const result = await client.query(FQL.Get(FQL.Ref(FQL.Collection(collection), ref)));
            return (result as FaunaData).data as T;
        } catch (error) {
            throw Error(error.description);
        }
    }

    async LoadByIndexBy<T>(index: DB_INDEX, reference: string, limit = 25): Promise<T> {
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

    async Get<T>(collection: DB_COLLECTION, limit = 25, after?: string, before?: string): Promise<T> {
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

    async Update<T>(collection: DB_COLLECTION, reference: string, newData: string | number | boolean | Array<never> | Record<never, never>, updateFilled: string): Promise<T> {
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

