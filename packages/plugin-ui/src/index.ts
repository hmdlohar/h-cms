import { createDefaultCURD, ICollection } from "@hcms/core";
import { migrations } from "./migrations";

export function register(): { [collectionID: string]: ICollection } {
  return {
    ui: {
      name: "UI Collection",
      collectionID: "ui",
      methods: {
        ...createDefaultCURD("ui"),
      },
      migrations: migrations,
      menuItems: {
        pages: {
          label: "UI Pages",
          type: "CRUDTable",
          CRUDSchema: {
            columns: {
              title: {
                type: "string",
                label: "Title",
                required: true,
              },
              slug: {
                type: "string",
                label: "Slug",
                required: true,
              },
              content: {
                type: "richText",
                label: "Content",
                required: true,
              },
            },
          },
        },
      },
    },
  };
}
