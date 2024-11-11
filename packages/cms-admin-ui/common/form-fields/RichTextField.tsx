import React, { useRef, useMemo } from "react";

import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => Promise.resolve(import("jodit-react")), {
  ssr: false,
});

interface IRichTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function RichTextField(props: IRichTextFieldProps) {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: props.label ?? "Start typing...",
      label: props.label,
      height: 300,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "link",
        "table",
        "|",
        "undo",
        "redo",
      ],
    }),
    []
  );

  return (
    <JoditEditor
      ref={editor}
      value={props.value}
      config={config}
      onBlur={(newContent) => props.onChange(newContent)}
      onChange={() => {}}
    />
  );
}
