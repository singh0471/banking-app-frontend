import React from "react";
import './DefaultUserDashboard.css';
import { useNavigate } from "react-router-dom";

const DefaultUserDashboard = () => {
  const navigation = useNavigate();

  return (
    <div>
      <div className="welcome-message">
        <h2>Welcome to Your User Dashboard, manage your accounts and transactions easily!</h2>
      </div>
      <div className="button-grid">
        <button onClick={() => navigation('/user-dashboard/create-account')} className="neon-button pink">Create Account</button>
        <button className="neon-button blue" onClick={() => {navigation('/user-dashboard/view-accounts')}}>View All Accounts</button>
        <button className="neon-button red" onClick={() => {navigation('/user-dashboard/delete-account')}}>Delete Account</button>
        <button className="neon-button green" onClick={() => {navigation('/user-dashboard/transfer-money')}}>Transfer Money</button>
      </div>
    </div>
  );
};

export default DefaultUserDashboard;
