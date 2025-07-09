// src/ManageUsers.js
// Programming Lab 2: User registration, role-based access, and state handling with localStorage

import React, { useState, useEffect } from 'react';
import './style.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // Store object { name, role }

  // Lab 2: Load users and login state from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const savedCurrentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    // Ensure admin exists
    const adminExists = storedUsers.some(user => user.name === 'admin');
    let updatedUsers = [...storedUsers];
    if (!adminExists) {
      const adminUser = {
        id: 'admin',
        name: 'admin',
        role: 'Admin',
      };
      updatedUsers.unshift(adminUser);
    }

    setUsers(updatedUsers);
    setCurrentUser(savedCurrentUser);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  }, []);

  // Lab 2: Add user and auto-login
  const handleAddUser = () => {
    const name = newName.trim();
    if (name === '') return;

    const duplicate = users.some(user => user.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
      alert('User already exists.');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      role: 'User',
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    // Auto-login new user
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    setNewName('');
  };

  // Lab 2: Delete user (not admin)
  const handleDeleteUser = (id) => {
    const target = users.find(user => user.id === id);
    if (!target || target.role === 'Admin') {
      alert('Cannot delete admin.');
      return;
    }

    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    if (currentUser && currentUser.name === target.name) {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    }
  };

  return (
    <div className="container">
      <h1 className="dashboard-title">Manage Users</h1>

      {/* Display current user */}
      <p style={{ fontWeight: 'bold', color: '#333' }}>
        Currently logged in as:{' '}
        <span style={{ color: '#007bff' }}>
          {currentUser ? `${currentUser.name} (${currentUser.role})` : 'None'}
        </span>
      </p>

      {/* New user input form */}
      <div className="user-form">
        <input
          type="text"
          placeholder="Enter name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="form-input"
        />
        <button onClick={handleAddUser} className="primary-button add-button">
          Add
        </button>
      </div>

      {/* User list */}
      {users.length === 0 ? (
        <p style={{ color: '#888' }}>No users found.</p>
      ) : (
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-row">
              <span className="user-name">{user.name}</span>
              <span className="user-role-label">{user.role}</span>

              {/* Only allow deleting non-admins */}
              {user.role !== 'Admin' && (
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageUsers;

















