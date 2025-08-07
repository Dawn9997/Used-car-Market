// Programming Lab 2: Admin car submission review interface using backend API
// src/CarReview.js

import React, { useState, useEffect } from 'react';
import './style.css';

const API_BASE = 'http://127.0.0.1:5000'; // Flask backend root URL

const CarReview = () => {
  const [cars, setCars] = useState([]);

  // Fetch all submitted cars from backend when component mounts
  useEffect(() => {
    fetch(`${API_BASE}/cars`)
      .then((res) => res.json())
      .then((data) => setCars(data.data))  // ✅ Extract car list from backend response
      .catch((err) => console.error('Error loading cars:', err));
  }, []);

  // Approve a car by sending PUT request to backend
  const handleApprove = async (carId) => {
    try {
      const response = await fetch(`${API_BASE}/cars/${carId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true }),
      });

      if (response.ok) {
        // Update local state to reflect approval
        setCars((prev) =>
          prev.map((car) =>
            car.id === carId ? { ...car, approved: true } : car
          )
        );
      }
    } catch (error) {
      console.error('Error approving car:', error);
    }
  };

  // Reject a car by sending DELETE request to backend
  const handleReject = async (carId) => {
    try {
      const response = await fetch(`${API_BASE}/cars/${carId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the rejected car from local state
        setCars((prev) => prev.filter((car) => car.id !== carId));
      }
    } catch (error) {
      console.error('Error rejecting car:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="dashboard-title">Admin Panel: Review Car Submissions</h1>

      {/* Pending submissions section */}
      <h2>🕓 Pending Submissions</h2>
      {cars.filter((car) => !car.approved).length === 0 ? (
        <p>No pending submissions.</p>
      ) : (
        <ul className="dashboard-links">
          {cars
            .filter((car) => !car.approved)
            .map((car) => (
              <li key={car.id}>
                <strong>
                  {car.make} {car.model} ({car.year})
                </strong>
                <br />
                Price: ${car.price}
                <br />
                Submitted by: {car.submittedBy || 'Unknown'}
                <div style={{ marginTop: '8px' }}>
                  <button
                    className="primary-button"
                    style={{ marginRight: '10px' }}
                    onClick={() => handleApprove(car.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="todo-delete-button"
                    onClick={() => handleReject(car.id)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}

      {/* Approved listings section */}
      <h2 style={{ marginTop: '40px' }}>✅ Approved Listings</h2>
      {cars.filter((car) => car.approved).length === 0 ? (
        <p>No approved listings yet.</p>
      ) : (
        <ul className="dashboard-links">
          {cars
            .filter((car) => car.approved)
            .map((car) => (
              <li key={car.id}>
                <strong>
                  {car.make} {car.model} ({car.year})
                </strong>
                <br />
                Price: ${car.price}
                <br />
                Submitted by: {car.submittedBy || 'Unknown'}
                <div style={{ marginTop: '8px' }}>
                  <button
                    className="todo-delete-button"
                    onClick={() => handleReject(car.id)}
                  >
                    Delete Listing
                  </button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CarReview;









