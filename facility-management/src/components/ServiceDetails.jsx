import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ServiceDetails = () => {
  // Get service ID from the route
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState(""); 

  useEffect(() => {
    // Fetch service details from the API using the service ID
    const serviceApiUrl = `${import.meta.env.VITE_BASE_URL}/api/services/${id}`;
    
    fetch(serviceApiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Service not found');
        }
        return res.json();
      })
      .then((data) => setService(data))
      .catch((err) => {
        console.error(err);
        setError("There was an error fetching the service details.");
      });
  }, [id]);

  // Show loading message if service is not available yet
  if (!service && !error) {
    return <div>Loading...</div>;
  }

  // Show error message if there is an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="service-details">
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <p><strong>Price:</strong> ${service.price}</p>
      <Link to="/services">Back to Services</Link>
      <button>Book Service</button>
    </div>
  );
};

export default ServiceDetails;
