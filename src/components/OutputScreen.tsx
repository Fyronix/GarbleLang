import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import { EditorWrapper } from "./OutputScreenStyles";
import { EDITOR_HEIGHT } from "../constants";
import Title from "./Title";

export const OutputScreen = ({ output }
        : { output: string }) => {

    return (
        <>
            <Title>Generated Output:</Title>
            <EditorWrapper>
                <span dangerouslySetInnerHTML={{ __html: output }}></span>
            </EditorWrapper>
        </>
    );
};