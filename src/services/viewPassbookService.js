import { jwtDecode } from "jwt-decode";
import AxiosError from "../utils/errors/axiosError";
import axios from "axios";

async function viewPassbookService(accountNumber, { page, limit, filters }) {
  try {
   
    const token = localStorage.getItem('token');
    console.log(token)
    const userId =  await jwtDecode(token.split(" ")[1]).userId;
    console.log(userId)
     
    const response = await axios.get(`http://localhost:4000/api/v1/user/${userId}/account/${accountNumber}/passbook`, {
      params: {
        page,
        limit,
        ...filters,   
      },
      headers: {
        auth: token, 
      },
    });
    console.log(response.data)
    return response;  
  } catch (error) {
    console.error("Error fetching passbook:", error);
    throw AxiosError(error);   
  }
}

export default viewPassbookService;
