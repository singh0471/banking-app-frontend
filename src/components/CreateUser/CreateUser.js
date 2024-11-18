import React, { useState } from 'react';
import createUserService from '../../services/createUserService'; // Import the user creation service
import './CreateUser.css';


const CreateUser = () => {
  const [formData, setFormData] = useState({});


  const userDataHandler = async (event) => {
    event.preventDefault();

    const userData = {
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    try {
      console.log(userData);
      const response = await createUserService(userData);  
      console.log(response);

      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="create-user-container">
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
          <label className="input-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            className="form-input"
            placeholder="Enter password"
            required
          />
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
