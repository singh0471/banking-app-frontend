import React from 'react';
import {  Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ component: Component, role}) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(token.split(" ")[1]); 

 
  if (decodedToken.isAdmin) {
     
    if (role === "user") {
      return <Navigate to="/admin-dashboard" />;
    }
  } else {
    
    if (role === "admin") {
      return <Navigate to="/user-dashboard" />;
    }
  }

  return <Component/>;
};

export default ProtectedRoute;
