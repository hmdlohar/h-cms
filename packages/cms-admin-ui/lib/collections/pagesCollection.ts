import PageList from "@/components/pages/PageList";
import { createDefaultCURD, ICollection } from "hcms-core";

export function register(): { [collectionID: string]: ICollection } {
  return {
    page: {
      name: "Page",
      collectionID: "page",
      methods: {
        ...createDefaultCURD("pages"),
      },
      migrations: {
        create_page: {
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
      },
      menuItems: {
        list: {
          label: "All Pages",
          icon: "description",
          component: PageList,
        },
      },
    },
  };
}
