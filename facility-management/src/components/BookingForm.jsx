import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ serviceId }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    serviceId: serviceId,
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bookings', formData);
      alert('Booking successful!');
    } catch (error) {
      console.error('Error making booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="clientName"
        placeholder="Your Name"
        value={formData.clientName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="clientEmail"
        placeholder="Your Email"
        value={formData.clientEmail}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
      />
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;