// import React, { useState } from 'react';
// import './Login.css';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import loginService from '../../services/loginService';
// import {jwtDecode} from 'jwt-decode';  
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';  

// function Login({ setShowLogin }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     const loginData = {
//       username: username,
//       password: password,
//     };

//     try {
       
//       const response = await loginService(loginData);
//       const token = response.data;

       
//       localStorage.setItem('token', token);
//       console.log('Login response:', response.data);

       
//       toast.success('Login successful!');

       
//       setTimeout(() => {
         
//         if (jwtDecode(token.split(' ')[1]).isAdmin) {
//           navigate('/admin-dashboard');
//         } else {
//           navigate('/user-dashboard');
//         }
//       }, 1500);  
//     } catch (error) {
//       console.log('Login error:', error);
     
//       toast.error('Login failed. Please check your credentials.', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <div className="login-container">
       
//       <ToastContainer />
//       <h2 className="login-title">Login</h2>
//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="login-input"
//           required
//         />
//       </div>
//       <div className="input-container password-container">
//         <input
//           type={passwordVisible ? 'text' : 'password'}
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="login-input"
//           required
//         />
//         <div
//           className="eye-icon"
//           onClick={() => setPasswordVisible(!passwordVisible)}
//         >
//           {passwordVisible ? <FaEye /> : <FaEyeSlash />}
//         </div>
//       </div>
//       <button className="login-btn" onClick={handleLogin}>
//         Login
//       </button>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useEffect } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginService from '../../services/loginService';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setShowLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
     
    const loadRecaptchaToken = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute('6Lc5M4kqAAAAAIaMoQNdjel2EJWzlHeTEfXIjQnJ', { action: 'login' })
            .then((token) => {
              setRecaptchaToken(token);
            })
            .catch((error) => {
              console.error("reCAPTCHA execution error:", error);
            });
        });
      } else {
        console.error("reCAPTCHA script not loaded yet. Retrying in 500ms...");
        setTimeout(loadRecaptchaToken, 500);  
      }
    };

    loadRecaptchaToken();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!recaptchaToken) {
      toast.error("Please wait for reCAPTCHA validation", {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const loginData = {
      username: username,
      password: password,
      recaptchaToken: recaptchaToken,
    };

    try {
      const response = await loginService(loginData);
      const token = response.data;

      localStorage.setItem('token', token);
      console.log('Login response:', response.data);

      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
      });

      setTimeout(() => {
        if (jwtDecode(token.split(' ')[1]).isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }, 1500);
    } catch (error) {
      console.log('Login error:', error);
      toast.error('Login failed. Please check your credentials.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2 className="login-title">Login</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          required
        />
      </div>
      <div className="input-container password-container">
        <input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
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
