import { ICollection } from "@hcms/core";
import { createDefaultCURD } from "@hcms/core";
import { migrations } from "./migrations";

const collection: ICollection = {
  collectionID: "pages",
  methods: {
    ...createDefaultCURD("pages"),
  },
  migrations,
};

export function register(): { [collectionID: string]: ICollection } {
  return {
    pages: collection,
  };
}
