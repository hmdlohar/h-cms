import { ICollection } from "@hcms/core";
import { register as registerUI } from "@hcms/plugin-ui";
import { register as registerPost } from "./collections/postCollection";

export function getCollections(): {
  [collectionID: string]: ICollection;
} {
  return {
    ...registerUI(),
    ...registerPost(),
  };
}

export function getCollection(collectionID: string) {
  return getCollections()[collectionID];
}

export function getCollectionMethod(collectionID: string, methodName: string) {
  return getCollection(collectionID)?.methods[methodName];
}

export function getCollectionMenuItem(
  collectionID: string,
  menuItemName: string
) {
  return getCollection(collectionID)?.menuItems?.[menuItemName];
}
