import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';


const Editor = (props) => {
    const {
        // eslint-disable-next-line react/prop-types
        value,
        // eslint-disable-next-line react/prop-types
        editorName,
        // eslint-disable-next-line react/prop-types
        languageExtension,
        // eslint-disable-next-line react/prop-types
        onChange
    } = props;

    return (
        <div className="z-0 flex flex-col overflow-hidden h-full rounded-t-lg">
            <h6 className='text-white font-semibold bg-black px-3 py-0.5 rounded-t-lg'>{editorName}</h6>
            <CodeMirror
                onChange={(value, viewUpdate) => {
                    onChange(value);
                }
                }
                value={value}
                className="z-0 h-full overflow-hidden bg-blue-950 font-medium"
                theme={vscodeDark}
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
