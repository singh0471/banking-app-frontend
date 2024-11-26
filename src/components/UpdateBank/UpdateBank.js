import React, { useState, useEffect } from 'react';
import getAllBanksService from '../../services/getAllBanksService';  
import updateBankService from '../../services/updateBankService';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS
import './UpdateBank.css';

const UpdateBank = () => {
  const [banks, setBanks] = useState([]);  
  const [bankId, setBankId] = useState('');
  const [updates, setUpdates] = useState([{ parameter: '', value: '' }]);
  const allParameters = ['name', 'abbreviation'];

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await getAllBanksService({
          page: 1,
          limit: 100 
        });  
        if (response.data) {
          setBanks(response.data);  
        }
      } catch (error) {
        console.error('Error fetching banks:', error);
        toast.error('Failed to fetch banks. Please try again.');
      }
    };
    fetchBanks();
  }, []);

  const addUpdateOption = () => {
    if (updates.length < 3) {
      setUpdates([...updates, { parameter: '', value: '' }]);
    }
  };

  const removeUpdateOption = (index) => {
    setUpdates(updates.filter((_, i) => i !== index));
  };

  const handleUpdateChange = (index, field, value) => {
    const newUpdates = [...updates];
    newUpdates[index][field] = value;
    setUpdates(newUpdates);
  };

  const getAvailableParameters = (index) => {
    const selectedParameters = updates.map((update) => update.parameter);
    return allParameters.filter(
      (param) =>
        !selectedParameters.includes(param) || updates[index].parameter === param
    );
  };

  const handleUpdateBank = async (event) => {
    event.preventDefault();
    try {
      if (updates) {
        await updateBankService(bankId, updates);
      }
      toast.success('Bank updated successfully!');
    } catch (error) {
      console.error('Error updating bank:', error);
      toast.error('Failed to update bank. Please try again.');
    }
  };

  return (
    <div className="update-bank-container">
      <ToastContainer /> {/* Add ToastContainer to render the toast notifications */}
      <h2 className="update-bank-heading">Update Bank</h2>
      <form className="update-bank-form">
        <div className="input-group">
          <label className="input-label" htmlFor="bankId">
            Select Bank:
          </label>
          <select
            id="bankId"
            value={bankId}
            onChange={(e) => setBankId(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select Bank</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {`${bank.id} - ${bank.name}`}  
              </option>
            ))}
          </select>
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
