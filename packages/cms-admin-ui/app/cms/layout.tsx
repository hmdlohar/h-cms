import React from "react";
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
