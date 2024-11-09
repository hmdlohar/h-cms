import { ICollection } from "../collections";
import { db } from "../db";

interface IPost {
    title: string;
    slug: string;
    bodyhtml: string;
}

export const post: ICollection = {
    collectionID: "posts",
    methods: {
        list: {
            fn: async () => {
                return await db.select("*").from("posts");
            }
        },
        create: {
            fn: async (args: IPost) => {
                return await db.insert(args).into("posts");
            }
        }
    }
}