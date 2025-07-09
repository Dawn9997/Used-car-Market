// src/SubmitCar.js
// Programming Lab 2: React form handling, state management, and localStorage integration

import React, { useState } from 'react';

const SubmitCar = () => {
  // Lab 2: Form state for car submission
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    transmission: '',
    fuelType: '',
    vin: '',
    imageUrl: '',
    location: '',
    description: '',
    contactInfo: '', // Seller contact field
  });

  // Lab 2: Handle form input changes
  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  // Lab 2: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = localStorage.getItem('currentUser'); // ❗ FIXED: read as string
    if (!currentUser) {
      alert('Please log in first.');
      return;
    }

    // Append submittedBy and approved flag
    const newSubmission = {
      ...carData,
      submittedBy: currentUser, // ✅ Now shows correctly in AdminPanel
      approved: false,
    };

    const storedCars = JSON.parse(localStorage.getItem('submittedCars')) || [];
    storedCars.push(newSubmission);
    localStorage.setItem('submittedCars', JSON.stringify(storedCars));

    alert('Car submitted for review!');
  };

  return (
    <div className="container">
      <h2>Submit a Used Car</h2>
      <form onSubmit={handleSubmit}>
        {/* Car Make */}
        <div className="form-group">
          <label htmlFor="make">Car Make</label>
          <input
            className="form-input"
            type="text"
            id="make"
            name="make"
            value={carData.make}
            onChange={handleChange}
            required
          />
        </div>

        {/* Model */}
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            className="form-input"
            type="text"
            id="model"
            name="model"
            value={carData.model}
            onChange={handleChange}
            required
          />
        </div>

        {/* Year */}
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            className="form-input"
            type="number"
            id="year"
            name="year"
            value={carData.year}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            className="form-input"
            type="number"
            id="price"
            name="price"
            value={carData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mileage */}
        <div className="form-group">
          <label htmlFor="mileage">Mileage (km)</label>
          <input
            className="form-input"
            type="number"
            id="mileage"
            name="mileage"
            value={carData.mileage}
            onChange={handleChange}
            required
          />
        </div>

        {/* Transmission */}
        <div className="form-group">
          <label htmlFor="transmission">Transmission</label>
          <select
            className="form-select"
            id="transmission"
            name="transmission"
            value={carData.transmission}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type</label>
          <select
            className="form-select"
            id="fuelType"
            name="fuelType"
            value={carData.fuelType}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* VIN */}
        <div className="form-group">
          <label htmlFor="vin">VIN Number</label>
          <input
            className="form-input"
            type="text"
            id="vin"
            name="vin"
            value={carData.vin}
            onChange={handleChange}
          />
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            className="form-input"
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={carData.imageUrl}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            className="form-input"
            type="text"
            id="location"
            name="location"
            value={carData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Info */}
        <div className="form-group">
          <label htmlFor="contactInfo">Seller Contact Info</label>
          <input
            className="form-input"
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={carData.contactInfo}
            onChange={handleChange}
            placeholder="Phone, email, etc."
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-input"
            id="description"
            name="description"
            rows="4"
            value={carData.description}
            onChange={handleChange}
            placeholder="Describe condition, accidents, features..."
          />
        </div>

        <button className="primary-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitCar;







