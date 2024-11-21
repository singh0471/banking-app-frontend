import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="dashboard-title">User Dashboard</h1>
        <div className="nav-links">
          <button className="nav-button" onClick={() => navigate('/user-dashboard')}>Home</button>
          
          <div className="dropdown">
            <button className="nav-button">Account Management</button>
            <div className="dropdown-content">
              <button onClick={() => navigate('/user-dashboard/create-account')} className="dropdown-item">Create Account</button>
              <button onClick={() => navigate('/user-dashboard/view-accounts')} className="dropdown-item">View All Accounts</button>
              <button onClick={() => navigate('/user-dashboard/delete-account')} className="dropdown-item">Delete Account</button>
            </div>
          </div>
          
          <div className="dropdown">
            <button className="nav-button">Transactions</button>
            <div className="dropdown-content">
              <button onClick={() => navigate('/user-dashboard/withdraw')} className="dropdown-item">Withdraw</button>
              <button onClick={() => navigate('/user-dashboard/deposit')} className="dropdown-item">Deposit</button>
              <button onClick={() => navigate('/user-dashboard/transfer')} className="dropdown-item">Transfer</button>
            </div>
          </div>

          <button className="nav-button" onClick={() => navigate('/user-dashboard/kyc')}>KYC</button>
        </div>
        <button className="logout-button" onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
      </nav>

      {/* Content Area */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
