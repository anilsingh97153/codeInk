import './App.css'
import Editor from './components/Editor'
import { useState, useRef, useEffect } from 'react';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import useLocalStorage from './hooks/useLocalStorage';
import Typed from 'typed.js';


function App() {

  const [htmlCode, setHtmlCode] = useLocalStorage('html', '<!-- Write HTML here -->');
  const [cssCode, setCssCode] = useLocalStorage('css', '/* Write CSS here */');
  const [jsCode, setJsCode] = useLocalStorage('js', '// Write Javascript here');
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

  // Create reference to store the DOM element containing the animation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<strong>CODEINK &lt; / &gt;</strong>', 'Code editor to practice HTML, CSS &amp; Javascript.', 'Save all your code in local storage.', '<strong>CODEINK &lt; / &gt;</strong>'],
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className="overflow-hidden bg-white">
      <nav className='0 text-white p-2 w-screen bg-blue-950	fixed z-40'><span ref={el} /></nav>
     {/* Element to contain animated typing  */}
  <span id="element"></span>
      <div className="mt-10 grid h-screen w-screen sm:grid-cols-3 sm:grid-rows-2 grid-rows-4 gap-1.5 p-1 ">
        <div className="sm:col-span-1">
          <Editor
            value={htmlCode}
            editorName="HTML"
            languageExtension={html()}
            onChange={setHtmlCode}
          /></div>

        <div className="sm:col-span-1">
          <Editor
            value={cssCode}
            editorName="CSS"
            languageExtension={css()}
            onChange={setCssCode}
          />
        </div>

        <div className="sm:col-span-1">
          <Editor
            value={jsCode}
            editorName="JS"
            languageExtension={javascript({ jsx: true })}
            onChange={setJsCode}
          /></div>

        <div className="rounded-t-lg sm:col-span-3"><h6 className='text-white font-semibold bg-black px-3 py-0.5 rounded-t-lg'>OUTPUT</h6>
          <iframe
            title='output'
            srcDoc={srcDoc}
            sandbox='allow-scripts allow-modals'
            height="100%"
            width="100%"
            style={{width: '100%', height: '100%', border: 'none', overflow: 'hidden', boxSizing: 'border-box'}}
            onLoad={(event) => {
              const iframeDocument = event.target.contentDocument;
              if (iframeDocument) {
                const iframeBody = iframeDocument.querySelector('body');
                if (iframeBody) {
                  iframeBody.style.color = 'white'; // Set text color to white
                }
              }
            }}
          />
        </div>
      </div>
    </div>

  )
}

export default App





