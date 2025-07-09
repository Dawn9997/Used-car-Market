// src/Register.js
// Programming Lab 2: User registration form using React state and event handling


import React, { useState } from 'react';

const Register = () => {
  // Define form data state for username, email, and password
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle input changes and update formData state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const { username } = formData;

    // Load existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Prevent duplicate usernames
    if (existingUsers.some((user) => user.name === username)) {
      alert('Username already exists. Please choose another one.');
      return;
    }

    // Create new user object with default role
    const newUser = {
      name: username,
      role: 'User',
    };

    // Save new user into the array
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    // Optionally set this as current user
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // Show confirmation message
    alert('Registration successful!');

    // Clear the form
    setFormData({
      username: '',
      email: '',
      password: '',
    });
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






