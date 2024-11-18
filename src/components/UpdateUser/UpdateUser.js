import React, { useState } from 'react';
import updateUserService from '../../services/updateUserService';
import './UpdateUser.css';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [updates, setUpdates] = useState([{ parameter: '', value: '' }]); // Initial single update option
  const allParameters = ['username', 'firstName', 'lastName'];

  // Handle adding a new update option
  const addUpdateOption = () => {
    if (updates.length < 3) {
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
      for (const update of updates) {
        if (update.parameter && update.value) {
          const response = await updateUserService(userId, update.parameter, update.value);
          console.log(`Updated ${update.parameter}:`, response);
        }
      }
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

   
  const getAvailableParameters = (index) => {
    const selectedParameters = updates.map((update) => update.parameter);
    return allParameters.filter((param) => !selectedParameters.includes(param) || updates[index].parameter === param);
  };

  return (
    <div className="update-user-container">
      <h2 className="update-user-heading">Update User</h2>
      <form className="update-user-form">
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
                    {param}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="form-input"
                value={update.value}
                onChange={(e) => handleUpdateChange(index, 'value', e.target.value)}
                placeholder="Enter value"
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
          {updates.length < 3 && (
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
