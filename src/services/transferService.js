import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

const transferService = async (accountNumber,anotherAccountNumber,amount) => {
  try {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token.split(" ")[1]).userId;
    console.log("transfer")
    const response = await axios.put(`http://localhost:4000/api/v1/user/${userId}/account/${accountNumber}/transfer`, {accountNo:anotherAccountNumber,amount:amount},{
      headers: { auth: token },  
    });

    return response;
  } catch (error) {
    console.error('Error fetching KYC:', error);
    throw new AxiosError(error);  
  }
};

export default transferService;