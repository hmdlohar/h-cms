import React from "react";

interface IlayoutProps {
  children: React.ReactNode;
}
export default function layout(props: IlayoutProps) {
  return (
    <html>
      <head>
        <title>Blog</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
}
