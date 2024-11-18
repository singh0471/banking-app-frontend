import React from 'react';
import './Filter.css';
const Filter = ({ label, attribute, value, onFilterChange }) => {
  return (
    <div className="filter">
      <label htmlFor={attribute}>{label}:</label>
      <input
        id={attribute}
        type="text"
        value={value}
        onChange={(e) => onFilterChange(attribute, e.target.value)}
        placeholder={`Filter by ${label}`}
      />
    </div>
  );
};

export default Filter;
