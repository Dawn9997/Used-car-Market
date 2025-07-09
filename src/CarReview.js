// Programming Lab 2: Admin car submission review interface using React state and event handling
// src/CarReview.js
import React, { useState, useEffect } from 'react';
import './style.css';

const CarReview = () => {
  const [cars, setCars] = useState([]);

  // Load all submitted cars from localStorage on component mount
  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem('submittedCars')) || [];
    setCars(storedCars);
  }, []);

  // Approve a car listing by setting its approved flag to true
  const handleApprove = (index) => {
    const updatedCars = [...cars];
    updatedCars[index].approved = true;
    localStorage.setItem('submittedCars', JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  // Reject a car listing by removing it from the array
  const handleReject = (index) => {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    localStorage.setItem('submittedCars', JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  // Delete an approved car (admin only)
  const handleDeleteApproved = (index) => {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    localStorage.setItem('submittedCars', JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  return (
    <div className="container">
      <h1 className="dashboard-title">Admin Panel: Review Car Submissions</h1>

      {/* Pending Submissions */}
      <h2>🕓 Pending Submissions</h2>
      {cars.filter(car => !car.approved).length === 0 ? (
        <p>No pending submissions.</p>
      ) : (
        <ul className="dashboard-links">
          {cars.map((car, index) =>
            !car.approved ? (
              <li key={index}>
                <strong>{car.make} {car.model} ({car.year})</strong><br />
                Price: ${car.price}<br />
                Submitted by: {car.submittedBy || 'Unknown'}
                <div style={{ marginTop: '8px' }}>
                  <button
                    className="primary-button"
                    style={{ marginRight: '10px' }}
                    onClick={() => handleApprove(index)}
                  >
                    Approve
                  </button>
                  <button
                    className="todo-delete-button"
                    onClick={() => handleReject(index)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ) : null
          )}
        </ul>
      )}

      {/* Approved Listings */}
      <h2 style={{ marginTop: '40px' }}>✅ Approved Listings</h2>
      {cars.filter(car => car.approved).length === 0 ? (
        <p>No approved listings yet.</p>
      ) : (
        <ul className="dashboard-links">
          {cars.map((car, index) =>
            car.approved ? (
              <li key={index}>
                <strong>{car.make} {car.model} ({car.year})</strong><br />
                Price: ${car.price}<br />
                Submitted by: {car.submittedBy || 'Unknown'}
                <div style={{ marginTop: '8px' }}>
                  <button
                    className="todo-delete-button"
                    onClick={() => handleDeleteApproved(index)}
                  >
                    Delete Listing
                  </button>
                </div>
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
};

export default CarReview;







