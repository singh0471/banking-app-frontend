import axios from 'axios';


const updateBankService = async (bankId, updates) => {
  
    try {
      
      const updateData = [...updates];
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:4000/api/v1/bank/${bankId}`, updateData, {headers : {auth:token}});
      return response;
    } catch (error) {
      
      throw new Error(`Ucould not update`);
    }
  
};

export default updateBankService;