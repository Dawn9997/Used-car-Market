// === Lab 2 & Lab 3 ===
// src/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('User');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // === Hardcoded admin check ===
    if (username === 'admin') {
      if (password !== 'admin123') {
        alert('Incorrect password for admin!');
        return;
      }
    }

    // Create current user object
    const currentUser = { name: username, role };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // === Lab 2: Save user into registeredUsers if not exists ===
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const exists = users.some(user => user.name === username);

    if (!exists) {
      // Add ID when saving new user (required for ManageUsers.js)
      const newUser = {
        ...currentUser,
        id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 6),
      };
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }

    // === Redirect based on role ===
    if (role === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/submit');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>

        {/* Username input */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            className="form-input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password for admin only */}
        {username === 'admin' && (
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="form-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}

        {/* Select user role */}
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            className="form-input"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button className="primary-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;













