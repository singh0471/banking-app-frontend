import React from "react";
import './DefaultDashboardContent.css';
import { useNavigate } from "react-router-dom";

const DefaultDashboardContent = () => {
  const navigation = useNavigate();

  return (
    <div>
      <div className="welcome-message">
        <h2>Welcome to the Admin Control Center, manage your operations effortlessly!</h2>
      </div>
      <div className="button-grid">
        <button onClick={() => navigation('/admin-dashboard/add-bank')} className="neon-button pink">Add Bank</button>
        <button className="neon-button blue" onClick={()=> {navigation('/admin-dashboard/get-banks')}}>View Bank List</button>
        <button className="neon-button red" onClick={()=> {navigation('/admin-dashboard/delete-bank')}}>Delete Bank</button>
        <button className="neon-button yellow" onClick={()=> {navigation('/admin-dashboard/update-bank')}}>Update Bank Details</button>
        <button className="neon-button purple" onClick={()=> {navigation('/admin-dashboard/create-user')}}>Register New User</button>
        <button className="neon-button orange" onClick={()=> {navigation('/admin-dashboard/get-users')}}>View User List</button>
        <button className="neon-button pink" onClick={()=> {navigation('/admin-dashboard/delete-user')}}>Remove User</button>
        <button className="neon-button cyan" onClick={()=> {navigation('/admin-dashboard/update-user')}}>Edit User Info</button>
      </div>
    </div>
  );
};

export default DefaultDashboardContent;
