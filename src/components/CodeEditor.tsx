import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import { EditorWrapper } from "./CodeEditorStyles";
import { EDITOR_HEIGHT } from "../constants";

export const CodeEditor = ({ onChange, code }
        : {onChange: (s: string, v: string) => void, code: any }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value: string, _: any) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <EditorWrapper>
        <Editor
            height={EDITOR_HEIGHT}
            width={`100%`}
            language={"shell"}
            value={value}
            defaultValue=""
            onChange={handleEditorChange}
        />
    </EditorWrapper>
  );
};