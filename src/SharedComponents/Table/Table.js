import React from 'react';
import './Table.css';
import camelCaseToTitleCase from '../../utils/helper/camelCaseToTitle';

const Table = ({ headers, tableData }) => {
  if (!tableData || tableData.length === 0) {
    return <div className="table-no-data">No data available</div>;
  }

  const updatedHeaders = headers.map(header => camelCaseToTitleCase(header));

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {updatedHeaders.map((header, index) => (
              <th key={index} className="custom-table-header">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} className="custom-table-row">
              {Object.keys(row).map((key, cellIndex) => (
                <td key={cellIndex} className="custom-table-cell">{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
