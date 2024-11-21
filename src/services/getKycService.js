import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

const getKycService = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token.split(" ")[1]).userId;
    
    const response = await axios.get(`http://localhost:4000/api/v1/user/${userId}/kyc`, {
      headers: { auth: token },  
    });

    return response;
  } catch (error) {
    console.error('Error fetching KYC:', error);
    throw new AxiosError(error);  
  }
};

export default getKycService;
