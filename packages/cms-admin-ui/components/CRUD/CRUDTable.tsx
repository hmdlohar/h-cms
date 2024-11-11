import React, { useState } from "react";
import useAPI from "../../hooks/useAPI";
import DataTable from "react-data-table-component";
import { ClientSDK, ICollectionMenuItem } from "@hcms/core";
import { useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import AddUpdateRow from "./AddUpdateRow";
import Button from "@mui/material/Button";

interface ICRUDTableProps {
  collectionID: string;
  menuItem: ICollectionMenuItem;
}
export default function CRUDTable(props: ICRUDTableProps) {
  const [currentRow, setCurrentRow] = useState<any>(null);
  const [open, setOpen] = useState(false);

  let q = useQuery({
    queryKey: ["crud", props.collectionID, "list", props.menuItem.label],
    queryFn: async () => {
      let result = await ClientSDK.call({
        collection: props.collectionID,
        method: "list",
        args: {
          page: 1,
          pageSize: 10,
        },
      });
      return result.result;
    },
  });
  console.log(q.data);
  return (
    <div>
      <h1>{props.menuItem.label}</h1>
      {q.isError && <Alert severity="error">{q.error.message}</Alert>}
      <Button onClick={() => setOpen(true)}>Add</Button>
      <DataTable
        data={q.data ?? []}
        progressPending={q.isLoading}
        columns={[
          ...Object.entries(props.menuItem.CRUDSchema?.columns ?? {}).map(
            ([key, value]) => ({
              name: value.label,
              selector: (row: any) => String(row[key] ?? ""), // Convert to string
            })
          ),
        ]}
      />
      {open && (
        <AddUpdateRow
          isOpen={open}
          onClose={() => setOpen(false)}
          menuItem={props.menuItem}
          currentRow={currentRow}
        />
      )}
    </div>
  );
}
