import { ICollectionMethod } from "./collection";
/**
 * Create CURD methods for a table
 * @param tableName Table name
 * @returns get, list, create, update, delete methods
 */
export declare function createDefaultCURD(tableName: string): {
    [key: string]: ICollectionMethod;
};
//# sourceMappingURL=defaultCURD.d.ts.map