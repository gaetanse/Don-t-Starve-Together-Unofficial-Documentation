// src/components/TableDoc.js
import React from 'react';

const TableDoc = ({ fields }) => (
  <div style={{ marginBottom: '20px' }}>
    <h3>Table</h3>
    <ul>
      {fields.map((field, index) => (
        <li key={index}>
          <strong>{field.key}:</strong> {field.value}
        </li>
      ))}
    </ul>
  </div>
);

export default TableDoc;