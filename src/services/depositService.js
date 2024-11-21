import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

const depositService = async (accountNumber,amount) => {
  try {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token.split(" ")[1]).userId;
    console.log("deposit service called",accountNumber," ",amount);
    
    const response = await axios.put(`http://localhost:4000/api/v1/user/${userId}/account/${accountNumber}/deposit`, {amount:amount},{
      headers: { auth: token },  
    });

    return response;
  } catch (error) {
    console.error('Error fetching KYC:', error);
    throw new AxiosError(error);  
  }
};

export default depositService;
