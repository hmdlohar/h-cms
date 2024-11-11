import React from "react";
import MenuList from "./MenuList";
import QueryProvider from "../QueryProvider";
import { NoSsr } from "@mui/material";
import NoSSR from "@/common/NoSSR";
import MainLayout from "./MainLayout";

interface ICMSLayoutProps {
  children: React.ReactNode;
}

export default function CMSLayout(props: ICMSLayoutProps) {
  return (
    <MainLayout>
      {props.children}
    </MainLayout>
  );
}
