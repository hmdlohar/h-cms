import { Knex } from "knex";
import { ICollectionMethod } from "./collection";

/**
 * Create CURD methods for a table
 * @param tableName Table name
 * @returns get, list, create, update, delete methods
 */
export function createDefaultCURD(tableName: string): {
  [key: string]: ICollectionMethod;
} {
  return {
    get: {
      fn: async (db: Knex, args: { id: number }) => {
        return db.select("*").from(tableName).where("id", args.id).first();
      },
    },
    list: {
      fn: async (db: Knex, args: { page: number; pageSize: number }) => {
        return db
          .select("*")
          .from(tableName)
          .limit(args.pageSize)
          .offset((args.page - 1) * args.pageSize);
      },
    },
    create: {
      fn: async (db: Knex, args: any) => {
        return db.insert(args).into(tableName);
      },
    },
    update: {
      fn: async (
        db: Knex,
        args: {
          id: number;
          data: any;
        }
      ) => {
        return db.update(args.data).from(tableName).where("id", args.id);
      },
    },
    delete: {
      fn: async (db: Knex, args: { id: number }) => {
        return db.delete().from(tableName).where("id", args.id);
      },
    },
  };
}
