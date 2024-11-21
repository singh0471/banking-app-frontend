import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  

 
const deleteAccountService = async (accountNumber) => {
  try {
   
    const token = localStorage.getItem('token');

    const userId = jwtDecode(token.split(" ")[1]).userId;
    console.log("user id ",userId);
    console.log(accountNumber);
    const response = await axios.delete(
      `http://localhost:4000/api/v1/user/${userId}/account/${accountNumber}`,
      {
        headers: {
          auth: token,  
        },
      }
    );

     
    return response;
  } catch (error) {
     
    console.error('Error deleting account:', error);
    throw error;
  }
};

export default deleteAccountService;
