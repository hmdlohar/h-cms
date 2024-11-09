import { ICollection } from "@hcms/core";
import { register as registerPages } from "@hcms/plugin-pages";

export function getCollections(): {
  [collectionID: string]: ICollection;
} {
  return {
    ...registerPages(),
  };
}

export function getCollection(collectionID: string) {
  return getCollections()[collectionID];
}

export function getCollectionMethod(collectionID: string, methodName: string) {
  return getCollection(collectionID)?.methods[methodName];
}
