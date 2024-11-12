import PostList from "@/components/posts/PostList";
import { createDefaultCURD, ICollection } from "hcms-core";

export function register(): { [collectionID: string]: ICollection } {
  return {
    post: {
      name: "Post",
      collectionID: "post",
      methods: {
        ...createDefaultCURD("posts"),
      },
      migrations: {
        create_post: {
          up: (db) =>
            db.schema.createTable("posts", (table) => {
              table.increments("id").primary();
              table.string("title").notNullable();
              table.string("slug").notNullable().unique();
              table.text("bodyhtml").notNullable();
              table.timestamps(true, true);
            }),
          down: (db) => db.schema.dropTable("posts"),
        },
      },
      menuItems: {
        list: {
          label: "All Posts",
          icon: "article",
          component: PostList,
        },
      },
    },
  };
}
