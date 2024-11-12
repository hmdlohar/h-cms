import { ICollection } from "hcms-core";
import { register as registerPost } from "./collections/postCollection";
import { register as registerPages } from "./collections/pagesCollection";
import { register as registerCounter } from "hcms-plugin-counter";
import { register as registerEmployees } from "hcms-plugin-employees";


export function getCollections(): {
  [collectionID: string]: ICollection;
} {
  return {
    ...registerPost(),
    ...registerPages(),
    ...registerCounter(),
    ...registerEmployees(),
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
