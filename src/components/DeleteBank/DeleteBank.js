import React, { useState } from 'react';
import deleteBankService from '../../services/deleteBankService'; // Import the delete service
import './DeleteBank.css';


const DeleteBank = () => {
  const [bankId, setBankId] = useState('');
   

  const deleteBankHandler = async (event) => {
    event.preventDefault();

    try {
      console.log(`Deleting bank with ID: ${bankId}`);
      const response = await deleteBankService(bankId);  
      console.log(response);
      
      alert('Bank deleted successfully!');
       
    } catch (error) {
      console.error('Error deleting bank:', error);
      alert('Failed to delete bank. Please try again.');
    }
  };

  return (
    <div className="delete-bank-container">
      <h2 className="delete-bank-heading">Delete Bank</h2>
      <form className="delete-bank-form">
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
        <button
          type="submit"
          className="delete-bank-button"
          onClick={deleteBankHandler}
        >
          Delete Bank
        </button>
      </form>
    </div>
  );
};

export default DeleteBank;
