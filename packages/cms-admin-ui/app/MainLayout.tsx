"use client";

import React from "react";
import QueryProvider from "./QueryProvider";
import MenuList from "./MenuList";

interface IMainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout(props: IMainLayoutProps) {
  return (
    <QueryProvider>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Left sidebar */}
        <div
          style={{
            width: "16rem",
            borderRight: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ height: "100%", overflowY: "auto" }}>
            <MenuList />
          </div>
        </div>
        {/* Main content */}
        <div style={{ flex: 1, padding: "2rem" }}>{props.children}</div>
      </div>
    </QueryProvider>
  );
}
