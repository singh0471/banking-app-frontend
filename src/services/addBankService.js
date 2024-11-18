import axios from 'axios';
import AxiosError from '../utils/errors/axiosError';

async function addBankService(bankData) {
    try {
        const token = localStorage.getItem("token");
        const response=  await axios.post('http://localhost:4000/api/v1/bank/create', bankData,{headers : {auth:token}});
        return response;
    }
    catch(error){
         throw new AxiosError(error);
    }
    
}


export default addBankService