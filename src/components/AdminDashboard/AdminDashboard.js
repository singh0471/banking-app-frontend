import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigation = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="nav-links">
          <button className="nav-button" onClick={() => navigation('/admin-dashboard')}>Home</button>
          <div className="dropdown">
            <button className="nav-button">Bank Management</button>
            <div className="dropdown-content">
              <button onClick={() => navigation('/admin-dashboard/add-bank')} className="dropdown-item">Add New Bank</button>
              <button className="dropdown-item" onClick={() => navigation('/admin-dashboard/update-bank')}>Edit Bank Details</button>
              <button className="dropdown-item" onClick={() => navigation('/admin-dashboard/delete-bank')}>Remove Bank</button>
            </div>
          </div>
          <div className="dropdown">
            <button className="nav-button">User Management</button>
            <div className="dropdown-content">
              <button className="dropdown-item" onClick={() => navigation('/admin-dashboard/create-user')}>Register New User</button>
              <button className="dropdown-item" onClick={() => navigation('/admin-dashboard/get-users')}>View All Users</button>
              <button className="dropdown-item">Search User</button>
              <button className="dropdown-item" onClick={() => navigation('/admin-dashboard/update-user')}>Edit User Information</button>
              <button className="dropdown-item" onClick={() => navigation('/admin-dashboard/delete-user')}>Remove User</button>
            </div>
          </div>
          <button className="nav-button" onClick={() => navigation('/admin-dashboard/get-ledger')}>Ledger Overview</button>
          <button className="nav-button">Transaction Details</button>
        </div>
        <button className="logout-button" onClick={() => { localStorage.removeItem('token'); navigation('/'); }}>Logout</button>
      </nav>

      {/* Content Area */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

