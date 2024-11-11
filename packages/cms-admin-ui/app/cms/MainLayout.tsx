"use client";

import React from "react";
import QueryProvider from "../QueryProvider";
import MenuList from "./MenuList";

interface IMainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout(props: IMainLayoutProps) {
  return (
    <QueryProvider>
      <div className="flex min-h-screen">
        {/* Left sidebar */}
        <div className="w-64 border-r border-gray-200 bg-white">
          <div className="h-full overflow-y-auto">
            <MenuList />
          </div>
        </div>
        {/* Main content */}
        <div className="flex-1 p-8">{props.children}</div>
      </div>
    </QueryProvider>
  );
}
