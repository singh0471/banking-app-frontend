import axios from 'axios';
import AxiosError from '../utils/errors/axiosError';

async function loginService(loginData) {
    try {
        return await axios.post('http://localhost:4000/api/v1/user/login', loginData);
    } catch (error) {
        console.log(new AxiosError(error));
        throw new AxiosError(error);
        
    }
}


export default loginService