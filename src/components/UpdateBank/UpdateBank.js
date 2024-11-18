import React, { useState } from 'react';
import updateBankService from '../../services/updateBankService'; // Assume this service is created
import './UpdateBank.css';

const UpdateBank = () => {
  const [bankId, setBankId] = useState('');
  const [updates, setUpdates] = useState([{ parameter: '', value: '' }]); // Initial single update option
  const allParameters = ['name', 'abbreviation'];

  // Handle adding a new update option
  const addUpdateOption = () => {
    if (updates.length < 3) {
      setUpdates([...updates, { parameter: '', value: '' }]);
    }
  };

  // Handle removing an update option
  const removeUpdateOption = (index) => {
    setUpdates(updates.filter((_, i) => i !== index));
  };

  // Handle change in update fields
  const handleUpdateChange = (index, field, value) => {
    const newUpdates = [...updates];
    newUpdates[index][field] = value;
    setUpdates(newUpdates);
  };

  // Fetch available parameters for the dropdown
  const getAvailableParameters = (index) => {
    const selectedParameters = updates.map((update) => update.parameter);
    return allParameters.filter(
      (param) =>
        !selectedParameters.includes(param) || updates[index].parameter === param
    );
  };

  // Submit handler for updating the bank
  const handleUpdateBank = async (event) => {
    event.preventDefault();

    try {
        console.log(updates)
      for (const update of updates) {
        if (update.parameter && update.value) {
          const response = await updateBankService(bankId, update.parameter, update.value);
          console.log(`Updated ${update.parameter}:`, response);
        }
      }
      alert('Bank updated successfully!');
    } catch (error) {
      console.error('Error updating bank:', error);
      alert('Failed to update bank. Please try again.');
    }
  };

  return (
    <div className="update-bank-container">
      <h2 className="update-bank-heading">Update Bank</h2>
      <form className="update-bank-form">
        <div className="input-group">
          <label className="input-label" htmlFor="bankId">
            Bank ID:
          </label>
          <input
            type="text"
            id="bankId"
            value={bankId}
            onChange={(e) => setBankId(e.target.value)}
            className="form-input"
            placeholder="Enter bank ID"
            required
          />
        </div>
        <div className="update-options">
          {updates.map((update, index) => (
            <div key={index} className="update-option">
              <select
                className="form-select"
                value={update.parameter}
                onChange={(e) => handleUpdateChange(index, 'parameter', e.target.value)}
                required
              >
                <option value="">Select Parameter</option>
                {getAvailableParameters(index).map((param) => (
                  <option key={param} value={param}>
                    {param}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="form-input"
                value={update.value}
                onChange={(e) => handleUpdateChange(index, 'value', e.target.value)}
                placeholder="Enter value"
                required
              />
              {updates.length > 1 && (
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeUpdateOption(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}
          {updates.length < 2 && (
            <button type="button" className="add-button" onClick={addUpdateOption}>
              +
            </button>
          )}
        </div>
        <button type="submit" className="update-bank-button" onClick={handleUpdateBank}>
          Update Bank
        </button>
      </form>
    </div>
  );
};

export default UpdateBank;