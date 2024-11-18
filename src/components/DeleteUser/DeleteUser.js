import React, { useState } from 'react';
import deleteUserService from '../../services/deleteUserService';
import './DeleteUser.css';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');

  const deleteUserHandler = async (event) => {
    event.preventDefault();

    try {
      console.log(`Deleting user with ID: ${userId}`);
      const response = await deleteUserService(userId); // Call the user deletion service
      console.log(response);

      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="delete-user-container">
      <h2 className="delete-user-heading">Delete User</h2>
      <form className="delete-user-form">
        <div className="input-group">
          <label className="input-label" htmlFor="userId">
            User ID:
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="form-input"
            placeholder="Enter user ID"
            required
          />
        </div>
        <button
          type="submit"
          className="delete-user-button"
          onClick={deleteUserHandler}
        >
          Delete User
        </button>
      </form>
    </div>
  );
};

export default DeleteUser;
