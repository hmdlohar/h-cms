import React from "react";
import MainLayout from "./MainLayout";
import "./globals.css";
interface ICMSLayoutProps {
  children: React.ReactNode;
}

export default function CMSLayout(props: ICMSLayoutProps) {
  return (
    <html>
      <head>
        <title>CMS Admin</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
