import React, { useState, useEffect } from 'react';
import getAllUsersService from '../../services/getAllUsersService';
import updateUserService from '../../services/updateUserService';
import camelCaseToTitleCase from '../../utils/helper/camelCaseToTitle'; // Import the helper function
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS
import './UpdateUser.css';

const UpdateUser = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [updates, setUpdates] = useState([{ parameter: '', value: '' }]);

  const allParameters = ['username', 'firstName', 'lastName', 'email', 'password'];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsersService();
        if (response.data) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users. Please try again.');
      }
    };
    fetchUsers();
  }, []);

  const addUpdateOption = () => {
    if (updates.length < 5) {
      setUpdates([...updates, { parameter: '', value: '' }]);
    }
  };

  const removeUpdateOption = (index) => {
    setUpdates(updates.filter((_, i) => i !== index));
  };

  const handleUpdateChange = (index, field, value) => {
    const newUpdates = [...updates];
    newUpdates[index][field] = value;
    setUpdates(newUpdates);
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    try {
      const updateBody = updates.filter((update) => update.parameter && update.value);
      if (updateBody.length === 0) {
        toast.error('Please fill in at least one parameter to update.');
        return;
      }

      console.log('Request Body:', updateBody);

      await updateUserService(userId, updateBody);
      toast.success('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user. Please try again.');
    }
  };

  const getAvailableParameters = (index) => {
    const selectedParameters = updates.map((update) => update.parameter);
    return allParameters.filter(
      (param) => !selectedParameters.includes(param) || updates[index].parameter === param
    );
  };

  return (
    <div className="update-user-container">
      <ToastContainer /> {/* Add ToastContainer to render the toast notifications */}
      <h2 className="update-user-heading">Update User</h2>
      <form className="update-user-form">
        <div className="input-group">
          <label className="input-label" htmlFor="userId">
            Select User:
          </label>
          <select
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {`${user.id} - ${user.username}`}
              </option>
            ))}
          </select>
        </div>
        <div className="update-options">
          {updates.map((update, index) => (
            <div key={index} className="update-option">
              <select
                className="form-select"
                value={update.parameter}
                onChange={(e) => handleUpdateChange(index, 'parameter', e.target.value)}
                required
              >
                <option value="">Select Parameter</option>
                {getAvailableParameters(index).map((param) => (
                  <option key={param} value={param}>
                    {camelCaseToTitleCase(param)} {/* Convert to Title Case */}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="form-input"
                value={update.value}
                onChange={(e) => handleUpdateChange(index, 'value', e.target.value)}
                placeholder={`Enter ${camelCaseToTitleCase(update.parameter) || 'value'}`} // Convert to Title Case
                required
              />
              {updates.length > 1 && (
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeUpdateOption(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}
          {updates.length < 5 && (
            <button type="button" className="add-button" onClick={addUpdateOption}>
              +
            </button>
          )}
        </div>
        <button type="submit" className="update-user-button" onClick={handleUpdateUser}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
