import { Knex } from "knex";

export interface ICollectionMethod {
  fn: (db: Knex, args: any) => Promise<any>;
}

export type ICRUDColumnType =
  | "string"
  | "richText"
  | "number"
  | "boolean"
  | "custom";

export interface ICRUDColumn {
  [key: string]: {
    type: ICRUDColumnType;
    label: string;
    required: boolean;
    dbFieldName?: string;
  };
}

export interface ICollectionMenuItem {
  label: string;
  icon?: any;
  component?: any;
  type: "page" | "CRUDTable";
  CRUDSchema?: {
    columns: ICRUDColumn;
  };
}

export interface ICollection {
  collectionID: string;
  name: string;
  methods: {
    [methodName: string]: ICollectionMethod;
  };
  migrations?: {
    [migrationName: string]: {
      up: (db: Knex) => Promise<void>;
      down: (db: Knex) => Promise<void>;
    };
  };
  menuItems?: {
    [menuItemName: string]: ICollectionMenuItem;
  };
}

export function hello() {
  return "hello";
}
