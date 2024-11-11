import { ICollectionMenuItem } from "@hcms/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IAddUpdateRowProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: ICollectionMenuItem;
  currentRow?: any;
}
export default function AddUpdateRow(props: IAddUpdateRowProps) {
  let objFields: any = {};
  for (let key in props.menuItem.CRUDSchema?.columns ?? {}) {
    let value = props.menuItem.CRUDSchema?.columns[key];
    if (value?.type === "string") {
      objFields[key] = yup.string();
    } else if (value?.type === "number") {
      objFields[key] = yup.number();
    } else if (value?.type === "boolean") {
      objFields[key] = yup.boolean();
    } else if (value?.type === "richText") {
      objFields[key] = yup.string();
    }
    if (value?.required) {
      objFields[key] = objFields[key].required("Required");
    }
  }
  const schema = yup.object(objFields);
  const objForm = useForm({
    defaultValues: { ...props.currentRow },
    resolver: yupResolver(schema),
  });
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <div>
            {props.currentRow ? "Update" : "Add"} {props.menuItem.label}
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {Object.entries(props.menuItem.CRUDSchema?.columns ?? {}).map(
              ([key, value]) => {
                return (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      fullWidth
                      label={value.label}
                      {...objForm.register(key)}
                    />
                  </Grid>
                );
              }
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
