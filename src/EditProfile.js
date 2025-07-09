// Programming Lab 2 - EditProfile.js
// Covers: basic JS + React component + event handling + state + SPA routing
// src/EditProfile.js
import React, { useState, useEffect } from 'react';
import './style.css'; // Import global styles

const EditProfile = () => {
  // State to hold username value
  const [username, setUsername] = useState('');

  // Load the stored username from localStorage when component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Handle saving the updated username to localStorage
  const handleSave = () => {
    localStorage.setItem('username', username);
    alert('Profile updated successfully!');
  };

  return (
    <div className="container">
      {/* Profile edit header */}
      <h2>Edit Profile</h2>

      {/* Input field for updating username */}
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Save button */}
      <button className="primary-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
