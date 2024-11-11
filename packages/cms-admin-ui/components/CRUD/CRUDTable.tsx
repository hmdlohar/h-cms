
import React from "react";
import useAPI from "../../hooks/useAPI";
import DataTable from "react-data-table-component";
import { ClientSDK, ICollectionMenuItem } from "@hcms/core";

interface ICRUDTableProps {
  collectionID: string;
  collectionName: string;
  schema: ICollectionMenuItem["CRUDSchema"];
}
export default function CRUDTable(props: ICRUDTableProps) {
  let q = useAPI(() => {
    return ClientSDK.call({
      collection: props.collectionID,
      method: "list",
      args: {
        page: 1,
        pageSize: 10,
      },
    });
  });
  console.log(q.data);
  return (
    <div>
      CRUD Table
      <h1>{props.collectionName}</h1>
      <>
        <DataTable
          data={q.data ?? []}
          columns={[
            ...Object.entries(props.schema?.columns ?? {}).map(([key, value]) => ({
              name: value.label,
              selector: (row: any) => String(row[key] ?? ""), // Convert to string
            })),
          ]}
        />
      </>
    </div>
  );
}
