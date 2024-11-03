import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // or any other theme

const HighlightedCodeBlock = ({ code }) => {
  const codeRef = useRef();
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    // Apply syntax highlighting on component mount
    hljs.highlightBlock(codeRef.current);
    setIsCopied(false)
    console.log(isCopied)
  }, [code]);

  const handleCopy = (codeToCopy) => {
    navigator.clipboard.writeText(codeToCopy)
      .then(() => {
        setIsCopied(true)
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        setIsCopied(false)
      });
  };

  return (
    <pre style={{ backgroundColor: '#f8f8f8', padding: '10px', borderRadius: '5px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      <button onClick={()=>{handleCopy(code)}}>
        Copy
      </button>
      {
        isCopied === true ? <p>text copied !</p> : <></>
      }
      <hr></hr>
      <code ref={codeRef} className="lua">
        {code}
      </code>
    </pre>
  );
}

export default HighlightedCodeBlock;