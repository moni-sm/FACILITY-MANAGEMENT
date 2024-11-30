// src/pages/ClientProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ClientProfile.css';

const ClientProfile = () => {
  const [client, setClient] = useState(null);
  const [servicesBooked, setServicesBooked] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch client data using token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');  // Redirect to login if no token is found
    }

    const fetchClientProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClient(response.data);
        setServicesBooked(response.data.servicesBooked || []);
      } catch (error) {
        console.error('Error fetching client profile:', error);
        setError('Failed to fetch client profile.');
      }
    };

    fetchClientProfile();
  }, [navigate]);

  const handleServiceBooking = async () => {
    if (!selectedService) {
      alert('Please select a service to book!');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/clients/book-service',
        { serviceId: selectedService },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Service booked successfully!');
      setServicesBooked([...servicesBooked, selectedService]);
    } catch (error) {
      console.error('Error booking service:', error);
      setError('Failed to book service.');
    }
  };

  const handleContactChange = (e) => {
    setContactMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/clients/contact-provider',
        { message: contactMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Message sent to provider!');
      setContactMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message.');
    }
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      {error && <p className="error">{error}</p>}
      <h1>{client.name}'s Profile</h1>
      <p>Email: {client.email}</p>
      <p>Role: {client.role}</p>

      <h2>Services Booked</h2>
      <ul>
        {servicesBooked.length > 0 ? (
          servicesBooked.map((serviceId, index) => (
            <li key={index}>Service ID: {serviceId}</li>
          ))
        ) : (
          <p>No services booked yet.</p>
        )}
      </ul>

      <h3>Book a Service</h3>
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">Select a Service</option>
        <option value="1">Service 1</option>
        <option value="2">Service 2</option>
        <option value="3">Service 3</option>
      </select>
      <button onClick={handleServiceBooking}>Book Service</button>

      <h3>Contact Provider</h3>
      <textarea
        value={contactMessage}
        onChange={handleContactChange}
        rows="5"
        placeholder="Message your provider"
      ></textarea>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default ClientProfile;
