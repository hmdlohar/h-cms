import React, { useState } from "react";
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
      let result = await ClientSDK.list(props.collectionID);
      return result ?? [];
    },
  });

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
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
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
                      await ClientSDK.delete(props.collectionID, row.id);

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
            ([key, value]) => {
              return {
                name: value.label,
                selector: (row: any) => String(row[key] ?? ""),
                cell: (row: any) => {
                  if (value.type === "boolean") {
                    return row[key] ? "Yes" : "No";
                  } else if (value.type === "richText") {
                    return (
                      <div dangerouslySetInnerHTML={{ __html: row[key] }} />
                    );
                  }
                  return String(row[key] ?? "");
                }, // Convert to string
                sortable: true,
              };
            }
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
