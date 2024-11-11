import RichTextField from "@/common/form-fields/RichTextField";
import { ClientSDK, ICollectionMenuItem } from "@hcms/core";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  CircularProgress,
  DialogActions,
  FormHelperText,
  Grid,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Case, Switch } from "react-if";
import * as yup from "yup";

interface IAddUpdateRowProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: ICollectionMenuItem;
  currentRow?: any;
  collectionID: string;
  onComplete: () => void;
}
export default function AddUpdateRow(props: IAddUpdateRowProps) {
  const action = useMutation({
    mutationFn: async (values: any) => {
      if (props.currentRow) {
        await ClientSDK.call({
          collection: props.collectionID,
          method: "update",
          args: {
            id: props.currentRow.id,
            values,
          },
        });
      } else {
        await ClientSDK.call({
          collection: props.collectionID,
          method: "create",
          args: values,
        });
      }
      props.onComplete();
    },
  });

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
          <form
            id="addUpdateForm"
            onSubmit={objForm.handleSubmit((values) => {
              console.log("values", values);
              action.mutate(values);
            })}
          >
            <Grid container spacing={2}>
              {Object.entries(props.menuItem.CRUDSchema?.columns ?? {}).map(
                ([key, value]) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={value?.type === "richText" ? 12 : 6}
                      key={key}
                    >
                      <Controller
                        control={objForm.control}
                        name={key}
                        render={({ field, fieldState }) => (
                          <>
                            <Switch>
                              <Case condition={value?.type === "string"}>
                                <TextField
                                  fullWidth
                                  label={value.label}
                                  {...field}
                                />
                              </Case>
                              <Case condition={value?.type === "richText"}>
                                <RichTextField
                                  label={value.label}
                                  value={field.value}
                                  onChange={(value) => field.onChange(value)}
                                />
                              </Case>
                            </Switch>
                            {fieldState.error && (
                              <FormHelperText error>
                                {fieldState.error.message}
                              </FormHelperText>
                            )}
                          </>
                        )}
                      />
                    </Grid>
                  );
                }
              )}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          {action.isPending && <CircularProgress />}
          {action.isError && (
            <Alert severity="error">{action.error.message}</Alert>
          )}
          <Button onClick={props.onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            form="addUpdateForm"
            disabled={action.isPending}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
