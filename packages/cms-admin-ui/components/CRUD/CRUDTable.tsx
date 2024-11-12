import React, { useState } from "react";
import useAPI from "../../hooks/useAPI";
import DataTable from "react-data-table-component";
import { ClientSDK, ICollectionMenuItem } from "hcms-core";
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
      return result ?? [];
    },
  });
  console.log(q.data, q.error);
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>{props.menuItem.label}</h1>
        <Button
          onClick={() => {
            setOpen(true);
            setCurrentRow(null);
          }}
        >
          Add new
        </Button>
      </div>
      {q.isError && <Alert severity="error">{q.error.message}</Alert>}
      <DataTable
        data={q.data ?? []}
        progressPending={q.isLoading}
        columns={[
          {
            name: "Actions",
            cell: (row: any) => (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    setCurrentRow(row);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this item?"
                      )
                    ) {
                      await ClientSDK.call({
                        collection: props.collectionID,
                        method: "delete",
                        args: { id: row.id },
                      });
                      q.refetch();
                    }
                  }}
                >
                  Delete
                </Button>
              </>
            ),
          },
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
          collectionID={props.collectionID}
          onComplete={() => {
            setOpen(false);
            setCurrentRow(null);
            q.refetch();
          }}
        />
      )}
    </div>
  );
}
