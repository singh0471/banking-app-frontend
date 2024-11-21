import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
const submitKycService = async (document) => {
  try {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token.split(" ")[1]).userId;
    const response = await axios.put(`http://localhost:4000/api/v1/user/${userId}/kyc`, document, {
      headers: {
        auth: token,   
        
      },
    });

    return response;
  } catch (error) {
    console.error('Error updating KYC:', error);
    throw new AxiosError(error);   
  }
};

export default submitKycService;
