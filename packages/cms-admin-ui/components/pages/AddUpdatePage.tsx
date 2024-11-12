import RichTextField from "@/common/form-fields/RichTextField";
import { ClientSDK, ICollectionMenuItem } from "hcms-core";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  CircularProgress,
  DialogActions,
  FormHelperText,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Case, Switch } from "react-if";
import slugify from "slugify";
import * as yup from "yup";

interface IAddUpdatePageProps {
  isOpen: boolean;
  onClose: () => void;
  currentRow?: any;
  onComplete: () => void;
}
export default function AddUpdatePage(props: IAddUpdatePageProps) {
  const action = useMutation({
    mutationFn: async (values: any) => {
      if (props.currentRow) {
        await ClientSDK.update("page", props.currentRow.id, values);
      } else {
        await ClientSDK.create("page", values);
      }
      props.onComplete();
    },
  });

  const schema = yup.object({
    title: yup.string().required("Required"),
    slug: yup.string().required("Required"),
    bodyhtml: yup.string().required("Required"),
  });
  const objForm = useForm({
    defaultValues: {
      title: "",
      slug: "",
      bodyhtml: "",
      ...props.currentRow,
    },
    resolver: yupResolver(schema),
  });
  console.log(objForm.formState.defaultValues);
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <div>{props.currentRow ? "Update" : "Add"} Page</div>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={objForm.watch("title")}
                  onChange={(e) => {
                    objForm.setValue("title", e.target.value);
                    objForm.setValue(
                      "slug",
                      slugify(e.target.value, { lower: true })
                    );
                  }}
                />
                {objForm.formState.errors.title && (
                  <FormHelperText error>
                    {objForm.formState.errors.title?.message?.toString()}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Tooltip title="Preview">
                  <Typography
                    color="primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(`/pages/${objForm.watch("slug")}`, "_blank");
                    }}
                  >
                    {window.location.origin}/pages/{objForm.watch("slug")}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Slug"
                  value={objForm.watch("slug")}
                  onChange={(e) =>
                    objForm.setValue(
                      "slug",
                      slugify(e.target.value, { lower: true })
                    )
                  }
                />
                {objForm.formState.errors.slug && (
                  <FormHelperText error>
                    {objForm.formState.errors.slug?.message?.toString()}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <RichTextField
                  label="Content"
                  value={objForm.watch("bodyhtml")}
                  onChange={(value) => objForm.setValue("bodyhtml", value)}
                />
                {objForm.formState.errors.bodyhtml && (
                  <FormHelperText error>
                    {objForm.formState.errors.bodyhtml?.message?.toString()}
                  </FormHelperText>
                )}
              </Grid>
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
