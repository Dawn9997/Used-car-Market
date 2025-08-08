// src/Register.js
// Programming Lab 2: User registration form using backend API

import React, { useState } from 'react';

const API_BASE = 'http://127.0.0.1:5000/api'; // Flask backend base URL

const Register = () => {
  // Manage form state for username, email, and password
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle input changes and update state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Send POST request to backend /api/register
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        // Store current user in localStorage
        const currentUser = {
          name: formData.username,
          role: 'User',
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Save to registeredUsers (optional, for local display)
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const updatedUsers = [...existingUsers, currentUser];
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

        // Show confirmation
        alert('Registration successful!');

        // Reset form
        setFormData({
          username: '',
          email: '',
          password: '',
        });

      } else {
        alert(`Registration failed: ${result.message}`);
      }

    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to connect to the server.');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-input"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button className="primary-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;







