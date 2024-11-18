import React,{useState,} from 'react'
import addBankService from '../../services/addBankService';
import './AddBank.css';
import { useNavigate } from 'react-router-dom';


const AddBank = () => {
    const [formData,setFormData] = useState({});
    const navigation = useNavigate();
    const bankDataHandler = async (event) => {
        event.preventDefault();

        const bankData = {
            name : formData.name,
            abbreviation : formData.abbreviation
        }

        try{
            console.log(bankData);
            const response = await addBankService(bankData);
            console.log(response);
            
        }
        catch(error){
            throw error;
        }

    }
  return (
    <div className="create-bank-container">
        
    <h2 className="create-bank-heading">Create New Bank</h2>
    <form  className="create-bank-form">
      <div className="input-group">
        <label className="input-label" htmlFor="bankName">
          Bank Name:
        </label>
        <input
          type="text"
          id="bankName"
        onChange={(e)=>{setFormData(
            (prev) =>{return{
              ...prev,name:e.target.value
            }}
          )}}
          
          className="form-input"
          placeholder="Enter bank name"
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
          onChange={(e)=>{setFormData(
            (prev) =>{return{
              ...prev,abbreviation:e.target.value
            }}
          )}}
          
          className="form-input"
          placeholder="Enter abbreviation"
          required
        />
      </div>
      <button type="submit" className="add-bank-button" onClick={bankDataHandler}>
        Add Bank
      </button>
    </form>
    
  </div>
  )
}

export default AddBank