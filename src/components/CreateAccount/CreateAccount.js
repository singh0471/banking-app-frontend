import React, { useState, useEffect } from 'react';
import createAccountService from '../../services/createAccountService'; 
import getAllBanksServiceForUsers from '../../services/getAllBanksServiceForUsers';  
import './CreateAccount.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    bankId: '', 
  });
  const [bankList, setBankList] = useState([]);  
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await getAllBanksServiceForUsers();
        setBankList(response.data); // Assuming the response is an array of bank objects
      } catch (error) {
        setError('Error fetching banks. Please try again later.');
        console.error('Error fetching banks:', error);
      }
    };

    fetchBanks();
  }, []);

  const accountDataHandler = async (event) => {
    event.preventDefault();

    if (!formData.bankId) {
      setError('Please select a bank');
      return;
    }

    try {
      const response = await createAccountService(formData.bankId);   
      console.log(response);
      alert('Account created successfully!');
    } catch (error) {
      setError('Failed to create account. Please try again.');
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className="create-account-container">
      <h2 className="create-account-heading">Create New Account</h2>
      <form className="create-account-form">
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label className="input-label" htmlFor="bankName">
            Bank Name:
          </label>
          <select
            id="bankName"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                bankId: e.target.value,  
              }))
            }
            className="form-input"
            required
          >
            <option value="">Select a Bank</option>
            {bankList.map((bank) => (
              <option key={bank.id} value={bank.id}>   
                {bank.name}   
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="create-account-button"
          onClick={accountDataHandler}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
