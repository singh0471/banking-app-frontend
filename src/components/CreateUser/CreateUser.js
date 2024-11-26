import React, { useState } from 'react';
import createUserService from '../../services/createUserService';
import './CreateUser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
  const [formData, setFormData] = useState({});
  const [passwordError, setPasswordError] = useState('');

  const validateInput = (userData) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;  
    const nameRegex = /^[a-zA-Z\s]+$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  

    if (!userData.username || !usernameRegex.test(userData.username)) {
      throw new Error('Invalid username: Username must only contain letters, numbers, or underscores');
    }

    if (!userData.email || !emailRegex.test(userData.email)) {
      throw new Error('Invalid email: Please provide a valid email address');
    }

    if (!userData.firstName || !nameRegex.test(userData.firstName)) {
      throw new Error('Invalid first name: First name must only contain letters or spaces');
    }

    if (!userData.lastName || !nameRegex.test(userData.lastName)) {
      throw new Error('Invalid last name: Last name must only contain letters or spaces');
    }
  };

  const userDataHandler = async (event) => {
    event.preventDefault();

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
    };

    try {
       
      validateInput(userData);

      
      const passwordStrengthRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordStrengthRegex.test(userData.password)) {
        throw new Error('Password must be at least 8 characters long and include a number and a special character.');
      }

      
      console.log(userData);
      const response = await createUserService(userData);
      console.log(response);

      toast.success('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);

 
      const errorMessage = error?.message || '';
      if (errorMessage.includes('Invalid username')) {
        toast.error('Invalid username: Username must only contain letters, numbers, or underscores.');
      } else if (errorMessage.includes('Invalid email')) {
        toast.error('Invalid email: Please provide a valid email address.');
      } else if (errorMessage.includes('Invalid first name')) {
        toast.error('Invalid first name: First name must only contain letters or spaces.');
      } else if (errorMessage.includes('Invalid last name')) {
        toast.error('Invalid last name: Last name must only contain letters or spaces.');
      } else if (errorMessage.includes('Password')) {
        toast.error('Password must be at least 8 characters long and include a number and a special character.');
      } else if (errorMessage.includes('already exists')) {
        toast.error('Username or email already exists.');
      } else {
        toast.error('username already exists.');
      }
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    const passwordStrengthRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    setFormData((prev) => ({ ...prev, password }));

    if (!passwordStrengthRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include a number and a special character.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="create-user-container">
      <ToastContainer />
      <h2 className="create-user-heading">Create New User</h2>
      <form className="create-user-form">
        <div className="input-group">
          <label className="input-label" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
            className="form-input"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="form-input"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            className="form-input"
            placeholder="Enter password"
            required
          />
          {passwordError && <p className="password-error">{passwordError}</p>}
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="firstName">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            className="form-input"
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="lastName">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            className="form-input"
            placeholder="Enter last name"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="dateOfBirth">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dateOfBirth: e.target.value,
              }))
            }
            className="form-input"
            placeholder="Enter date of birth"
            required
          />
        </div>
        <button
          type="submit"
          className="create-user-button"
          onClick={userDataHandler}
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
