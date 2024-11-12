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
      fn: async (db: Knex) => {
        return db.select("*").from(tableName);
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
          values: any;
        }
      ) => {
        return db.update(args.values).table(tableName).where("id", args.id);
      },
    },
    delete: {
      fn: async (db: Knex, args: { id: number }) => {
        return db.delete().from(tableName).where("id", args.id);
      },
    },
  };
}
