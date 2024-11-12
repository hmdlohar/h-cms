import { ICollection } from "hcms-core";
import { Knex } from "knex";
import React from "react";

export function register(): { [collectionID: string]: ICollection } {
  return {
    counter: {
      collectionID: "counter",
      name: "Counter",
      methods: {
        increaseCount: {
          fn: async (db: Knex) => {
            let count = await db
              .select("count")
              .from("counter")
              .where("id", 1)
              .first();
            if (!count) {
              await db.insert({ id: 1, count: 0 }).into("counter");
              count = { count: 0 };
            }
            await db
              .update({ count: count.count + 1 })
              .from("counter")
              .where("id", 1);
            return { count: count.count + 1 };
          },
        },
        decreaseCount: {
          fn: async (db: Knex) => {
            let count = await db
              .select("count")
              .from("counter")
              .where("id", 1)
              .first();
            if (!count) {
              await db.insert({ id: 1, count: 0 }).into("counter");
              count = { count: 0 };
            }
            await db
              .update({ count: count.count - 1 })
              .from("counter")
              .where("id", 1);
            return { count: count.count - 1 };
          },
        },
        getCount: {
          fn: async (db: Knex) => {
            let count = await db
              .select("count")
              .from("counter")
              .where("id", 1)
              .first();
            return count || { count: 0 };
          },
        },
      },
      menuItems: {
        counter: {
          label: "Counter",
          type: "page",
          component: React.lazy(() => import("./components/CounterPage")),
        },
      },
      migrations: {
        createCounterTable: {
          up: async (db: Knex) => {
            await db.schema.createTable("counter", (table) => {
              table.integer("id").primary();
              table.integer("count").defaultTo(0);
            });
          },
          down: async (db: Knex) => {
            await db.schema.dropTable("counter");
          },
        },
      },
    },
  };
}
