// src/pages/ProviderProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ProviderProfile.css';

const ProviderProfile = () => {
  const [provider, setProvider] = useState(null);
  const [serviceDescription, setServiceDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch provider data using token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');  // Redirect to login if no token is found
    }

    const fetchProviderProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProvider(response.data);
        setServiceDescription(response.data.serviceDescription || ''); // Set existing description if available
      } catch (error) {
        console.error('Error fetching provider profile:', error);
        setError('Failed to fetch provider profile.');
      }
    };

    fetchProviderProfile();
  }, [navigate]);

  const handleDescriptionChange = (e) => {
    setServiceDescription(e.target.value);
  };

  const handleSaveDescription = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        'http://localhost:5000/api/users/profile',
        { serviceDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false); // Stop editing after saving
      alert('Description updated successfully!');
    } catch (error) {
      console.error('Error updating description:', error);
      setError('Failed to save description.');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (!provider) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      {error && <p className="error">{error}</p>}
      <h1>{provider.name}'s Profile</h1>
      <p>Email: {provider.email}</p>
      <p>Role: {provider.role}</p>

      <h2>Service Description</h2>
      {isEditing ? (
        <div>
          <textarea
            value={serviceDescription}
            onChange={handleDescriptionChange}
            rows="5"
            placeholder="Describe your services"
          ></textarea>
          <button onClick={handleSaveDescription}>Save</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{serviceDescription || 'No description provided yet.'}</p>
          <button onClick={handleEditToggle}>Edit Description</button>
        </div>
      )}
    </div>
  );
};

export default ProviderProfile;
