import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const getAllBanksServiceForUsers = async () => {
  const token = localStorage.getItem('token');
  const userId = jwtDecode(token.split(" ")[1]).userId;

  const response = await axios.get(`http://localhost:4000/api/v1/user/${userId}/getAllBanks`, {
    headers: { auth: token },
    
  });
  
  return response;
};

export default getAllBanksServiceForUsers;
