import { Knex } from "knex";
export interface ICollectionMethod {
    fn: (db: Knex, args: any) => Promise<any>;
}
export interface ICollection {
    collectionID: string;
    methods: {
        [methodName: string]: ICollectionMethod;
    };
    migrations?: {
        [migrationName: string]: {
            up: (db: Knex) => Promise<void>;
            down: (db: Knex) => Promise<void>;
        };
    };
}
export declare function hello(): string;
//# sourceMappingURL=collection.d.ts.map