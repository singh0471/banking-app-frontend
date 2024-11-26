import React, { useState } from 'react';
import addBankService from '../../services/addBankService';
import './AddBank.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBank = () => {
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: ''
  });

  const validateInput = (name, abbreviation) => {
     
    const nameRegex = /^[a-zA-Z\s\-]+$/;  
    const abbreviationRegex = /^[a-zA-Z]+$/;  

    if (!name || typeof name !== 'string' || !nameRegex.test(name)) {
      throw new Error('Invalid bank name: Name must contain only letters, spaces, or hyphens');
    }

    if (!abbreviation || typeof abbreviation !== 'string' || !abbreviationRegex.test(abbreviation)) {
      throw new Error('Invalid abbreviation: Abbreviation must contain only letters without spaces');
    }
  };

  const bankDataHandler = async (event) => {
    event.preventDefault();

    const bankData = {
      name: formData.name,
      abbreviation: formData.abbreviation
    };

    try {
       
      validateInput(bankData.name, bankData.abbreviation);

       
      const response = await addBankService(bankData);
      console.log('Response:', response);

     
      toast.success('Bank added successfully!');
    } catch (error) {
      console.error('Error adding bank:', error);

      if (error.message && error.message.includes('Invalid bank name')) {
        toast.error('Invalid bank name: Name must contain only letters, spaces, or hyphens');
      } else if (error.message && error.message.includes('Invalid abbreviation')) {
        toast.error('Invalid abbreviation: Abbreviation must contain only letters without spaces');
      }else {
         
        toast.error('username or abbreviation already exists.');
      }
    }
  };

  return (
    <div className="create-bank-container">
      <ToastContainer />
      <h2 className="create-bank-heading">Create New Bank</h2>
      <form className="create-bank-form">
        <div className="input-group">
          <label className="input-label" htmlFor="bankName">
            Bank Name:
          </label>
          <input
            type="text"
            id="bankName"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="form-input"
            placeholder="Enter bank name"
            value={formData.name}
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="bankAbbreviation">
            Bank Abbreviation:
          </label>
          <input
            type="text"
            id="bankAbbreviation"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                abbreviation: e.target.value,
              }))
            }
            className="form-input"
            placeholder="Enter abbreviation"
            value={formData.abbreviation}
            required
          />
        </div>
        <button type="submit" className="add-bank-button" onClick={bankDataHandler}>
          Add Bank
        </button>
      </form>
    </div>
  );
};

export default AddBank;
