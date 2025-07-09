// Programming Lab 3: System statistics panel using localStorage data
// - Reads and validates user/car data from localStorage
// - Calculates system-wide statistics (total users, admins, cars)
// - Demonstrates use of React state, effects, and conditional data logic

import React, { useEffect, useState } from 'react';
import './style.css';

const SystemStats = () => {
  // Initial state for system statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    totalCars: 0,
    approvedCars: 0,
    pendingCars: 0,
  });

  // Load data from localStorage when component mounts
  useEffect(() => {
    // Fetch users from localStorage (use correct key)
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Fetch car submissions
    const cars = JSON.parse(localStorage.getItem('submittedCars')) || [];

    // Filter only valid user objects (exclude malformed data)
    const validUsers = users.filter(user => typeof user === 'object' && user.name);

    // Count total valid users
    const totalUsers = validUsers.length;

    // Count how many users are admins
    const adminUsers = validUsers.filter(user => user.role === 'Admin').length;

    // Count total car submissions
    const totalCars = cars.length;

    // Count approved listings
    const approvedCars = cars.filter(car => car.approved === true).length;

    // Calculate pending approvals
    const pendingCars = totalCars - approvedCars;

    // Update the state with all computed statistics
    setStats({
      totalUsers,
      adminUsers,
      totalCars,
      approvedCars,
      pendingCars,
    });
  }, []);

  return (
    <div className="container">
      <h1 className="dashboard-title">System Statistics</h1>
      <ul className="dashboard-links">
        <li><strong>Total Users:</strong> {stats.totalUsers}</li>
        <li><strong>Admins:</strong> {stats.adminUsers}</li>
        <li><strong>Total Car Submissions:</strong> {stats.totalCars}</li>
        <li><strong>Approved Listings:</strong> {stats.approvedCars}</li>
        <li><strong>Pending Approvals:</strong> {stats.pendingCars}</li>
      </ul>
    </div>
  );
};

export default SystemStats;


