import React, { useState } from 'react'
import CodeMirror, { lineNumbers } from '@uiw/react-codemirror'
import { githubDark } from '@uiw/codemirror-theme-github';
import { EditorView } from "@codemirror/view";



const Editor = (props) => {
    const {
        value,
        editorName,
        languageExtension,
        onChange
    } = props;

    return (
        <div className="code-editor">
            <div className="header">
                <h4>{editorName}</h4>

            </div>
            <CodeMirror
                onChange={(value, viewUpdate) => {
                    onChange(value);
                }
                }
                value={value}
                className="code-mirror"
                theme={githubDark}
                height='100%'
                extensions={[
                    languageExtension,
                    [EditorView.lineWrapping],
                ]}
            />
        </div>
    )
}

export default Editor
