import { jwtDecode } from "jwt-decode";
import AxiosError from "../utils/errors/axiosError";
import axios from "axios";

export async function createAccountService(bankId){

    try{
    const token = localStorage.getItem('token');
    console.log(token);
    const userId =  await jwtDecode(token.split(" ")[1]).userId;
   console.log(userId)
    
    const response = await axios.post(`http://localhost:4000/api/v1/user/${userId}/account`,{bankId},{headers : {auth:token}});
    return response;
    }
    catch(error){
        throw new AxiosError(error);
    }

}
export default createAccountService;