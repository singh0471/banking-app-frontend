import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import depositService from '../../services/depositService';
import withdrawService from '../../services/withdrawService';
import transferService from '../../services/transferService';
import getAllAccountsService from '../../services/getAllAccountsService';
import './TransferMoney.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransferMoney = () => {
  const [transferType, setTransferType] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [amount, setAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAllAccountsService({});
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setError('Error fetching accounts. Please try again later.');
        toast.error('Error fetching accounts. Please try again later.');  
      }
    };

    fetchAccounts();
  }, []);

  const handleTransferTypeChange = (e) => {
    setTransferType(e.target.value);
    setRecipientAccount('');
  };

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRecipientAccountChange = (e) => {
    setRecipientAccount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAccount || !amount) {
      setError('Account and amount are required.');
      toast.error('Account and amount are required.');  
      return;
    }

    try {
      if (transferType === 'deposit') {
        await depositService(selectedAccount, amount);
        toast.success('Deposit successful!');  
      } else if (transferType === 'withdraw') {
        await withdrawService(selectedAccount, amount);
        toast.success('Withdrawal successful!');  
      } else if (transferType === 'transfer' && recipientAccount) {
        await transferService(selectedAccount, recipientAccount, amount);
        toast.success('Transfer successful!');  
      } else {
        setError('Recipient account is required for transfers.');
        toast.error('Recipient account is required for transfers.'); 
        return;
      }
    } catch (error) {
      console.error('Error processing transaction:', error);
      toast.error('Transaction failed. Please try again.');  
    }
  };

  return (
    <div className="transfer-money-container">
      <ToastContainer />
      <button onClick={() => navigate('/user-dashboard')} className="back-button">
        Back to Dashboard
      </button>

      <h2>Transfer Money</h2>

      <form onSubmit={handleSubmit} className="transfer-form">
        <div className="form-group">
          <label htmlFor="transferType">Transfer Type:</label>
          <select id="transferType" value={transferType} onChange={handleTransferTypeChange} required>
            <option value="">Select Transfer Type</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="account">Select Account:</label>
          <select id="account" value={selectedAccount} onChange={handleAccountChange} required>
            <option value="">Select Your Account</option>
            {accounts.map((account) => (
              <option key={account.accountNumber} value={account.accountNumber}>
                {account.accountNumber} - {account.bankName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>

        {transferType === 'transfer' && (
          <div className="form-group">
            <label htmlFor="recipientAccount">Recipient Account Number:</label>
            <input
              type="text"
              id="recipientAccount"
              value={recipientAccount}
              onChange={handleRecipientAccountChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default TransferMoney;
