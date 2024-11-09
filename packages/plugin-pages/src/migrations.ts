import { ICollection } from "@hcms/core";

export const migrations: ICollection["migrations"] = {
  create_pages: {
    up: (db) =>
      db.schema.createTable("pages", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("slug").notNullable().unique();
        table.text("bodyhtml").notNullable();
        table.timestamps(true, true);
      }),
    down: (db) => db.schema.dropTable("pages"),
  },
};
