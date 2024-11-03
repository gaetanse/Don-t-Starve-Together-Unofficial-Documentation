// src/components/FunctionDoc.js
import React from 'react';
import HighlightedCodeBlock from './highlight';

const FunctionDoc = ({ name, parameters, code }) => (
  <div style={{ marginBottom: '20px' }}>
    <h3>{name || "null"}</h3>
    <p><strong>Parameters:</strong> {parameters.join(', ') || 'None'}</p>
    <p><strong>Returns:</strong> N/A</p> {/* Add actual return type if available */}
    <HighlightedCodeBlock code={code} /> {/* Highlighted code block */}
  </div>
)

export default FunctionDoc;