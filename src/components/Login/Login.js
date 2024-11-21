import React, { useState } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginService from '../../services/loginService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


function Login({ setShowLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginData = {
      username: username,
      password: password,
    };

    try{
    const response = await loginService(loginData);
    const token = response.data;
    localStorage.setItem('token',token)
    console.log(response.data)
    
    alert('login successful');
    if(jwtDecode(token.split(" ")[1]).isAdmin){
        navigation('/admin-dashboard')
    }
    else{
        navigation('/user-dashboard')
    }
   

}
catch(error){
    console.log(error)
    alert(error)
}
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
      </div>
      <div className="input-container password-container">
        <input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <div
          className="eye-icon"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
