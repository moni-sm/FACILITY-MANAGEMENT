// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import ServiceDetails from "../components/ServiceDetails";
import { fetchServices } from "../api"; // Import API call

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <div>
      <h1>Available Services</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={service._id}>{service.name}</li> // Assuming each service has an _id and name
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;