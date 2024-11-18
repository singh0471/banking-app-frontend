import React, { useState } from 'react';
import Login from '../Login/Login';   
import './Homepage.css';

function Homepage() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="homepage">
      <div className={`homepage-content ${showLogin ? 'blur' : ''}`}>
        <header className="hero-section">
        
          <img
            src={process.env.PUBLIC_URL + '/images/central_bank.jpg'}
            alt="Central Bank Logo"
            className="bank-logo"
          />
          <h1 className="bank-title">Welcome to Central Bank</h1>
          <p className="tagline">Empowering Your Financial Journey</p>
          <button className="login-btn" onClick={handleLoginClick}>
            Login
          </button>
        </header>
      </div>

      {showLogin && (
        <div className="login-overlay">
          <Login setShowLogin={setShowLogin} />
        </div>
      )}
    </div>
  );
}

export default Homepage;
