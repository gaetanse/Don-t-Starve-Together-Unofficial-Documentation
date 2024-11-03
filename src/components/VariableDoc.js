// src/components/VariableDoc.js
import React from 'react';

const VariableDoc = ({ name, value }) => (
  <div style={{ marginBottom: '20px' }}>
    <h3>{name}</h3>
    <p><strong>Value:</strong> {value !== null ? value : 'undefined'}</p>
  </div>
);

export default VariableDoc;