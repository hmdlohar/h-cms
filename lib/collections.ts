import { post } from "./collections/post";

export interface ICollectionMethod {
    fn: (args: any) => Promise<any>;
}

export interface ICollection {
    collectionID: string;
    methods: {
        [methodName: string]: ICollectionMethod;
    };
}

export function getCollections(): {
    [collectionID: string]: ICollection;
} {
    return {
        post
    };
}

export function getCollection(collectionID: string) {
    return getCollections()[collectionID];
}

export function getCollectionMethod(collectionID: string, methodName: string) {
    return getCollection(collectionID).methods[methodName];
}

