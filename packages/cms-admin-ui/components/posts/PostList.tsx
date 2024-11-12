"use client";
import React, { useState } from "react";
import useAPI from "../../hooks/useAPI";
import DataTable from "react-data-table-component";
import { ClientSDK, ICollectionMenuItem } from "hcms-core";
import { useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AddUpdatePost from "./AddUpdatePost";

interface IPageListProps {}
export default function PostList(props: IPageListProps) {
  const [currentRow, setCurrentRow] = useState<any>(null);
  const [open, setOpen] = useState(false);

  let q = useQuery({
    queryKey: ["crud", "post", "list", "post"],
    queryFn: async () => {
      let result = await ClientSDK.list("post");
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
        <h1>Posts</h1>
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
        progressPending={q.isFetching}
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
                      await ClientSDK.delete("post", row.id);
                      q.refetch();
                    }
                  }}
                >
                  Delete
                </Button>
              </>
            ),
          },
          {
            name: "Title",
            selector: (row: any) => row.title,
            sortable: true,
          },
          {
            name: "Slug",
            selector: (row: any) => row.slug,
            sortable: true,
          },
          {
            name: "Created At",
            selector: (row: any) => row.created_at,
            cell: (row: any) => new Date(row.created_at).toLocaleString(),
            sortable: true,
          },
        ]}
      />
      {open && (
        <AddUpdatePost
          isOpen={open}
          onClose={() => setOpen(false)}
          currentRow={currentRow}
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
