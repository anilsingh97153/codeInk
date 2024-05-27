import './App.css'
import Editor from './components/Editor'
import { useState, useEffect } from 'react';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import SplitPane, { Pane } from 'react-split-pane';
import useLocalStorage from './hooks/useLocalStorage';


function App() {
  const [htmlCode, setHtmlCode] =     useLocalStorage('html', '<!-- Write HTML here -->');
  const [cssCode, setCssCode] = useLocalStorage('css','/* Write CSS here */');
  const [jsCode, setJsCode] = useLocalStorage('js','// Write Javascript here');
  const [srcDoc, setSrcDoc] = useState('')


  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(`
      <html> 
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
      <script>${jsCode}</script>
      </body>
    </html>
    `)
    }, 500);

    return () => clearTimeout(timeOut);
  }, [htmlCode, cssCode, jsCode]);
  return (
    <div className="app">
      debugger;
      <SplitPane split="horizontal" defaultSize="50%" minSize={170} maxSize={1600}>
        {/* code pane */}

        <div className="code-pane">
          <SplitPane split="vertical" defaultSize="33.33%" minSize={120} maxSize={1600}>
            <div style={{ height: "100%" }}>
              <Editor
                value={htmlCode}
                editorName="HTML"
                languageExtension={html()}
                onChange={setHtmlCode}
              />
            </div>
            <SplitPane defaultSize="50%" minSize={120} maxSize={1600}>
              <div style={{ height: "100%", overflow: "hidden" }}>
                <Editor
                  value={cssCode}
                  editorName="CSS"
                  languageExtension={css()}
                  onChange={setCssCode}
                />
              </div>
              <div style={{ height: "100%" }}>
                <Editor
                  value={jsCode}
                  editorName="JS"
                  languageExtension={javascript({ jsx: true })}
                  onChange={setJsCode}
                />
              </div>
            </SplitPane>
          </SplitPane>
        </div>

        {/* output pane */}

        <div className="output-pane">
          <iframe
            title='output'
            srcDoc={srcDoc}
            sandbox='allow-scripts allow-modals'
            height="100%"
            width="100%"
            style={{ width: '100%', height: '100%', border: 'none', overflow: 'hidden', boxSizing: 'border-box' }}
          />
        </div>

      </SplitPane>
    </div>

  )
}

export default App





