import React, { useEffect, useState } from "react";
import { fetchServices } from "../api"; // Import API call
import '../styles/main.css'

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
    <div className="home-container">
      {/* Introductory Section */}
      <header className="hero">
        <h1>Welcome to FACILITY MANAGEMENT <br />          Home-Services</h1>
        <p>
          We provide top-notch home services to make your life easier. Whether you need a sparkling clean home, reliable plumbing, or expert electrical work, our team of professionals is ready to assist. 
          We specialize in six essential services:
        </p>
        <ul>
          <li><strong>Cleaning:</strong> Comprehensive home and office cleaning solutions.</li>
          <li><strong>Plumbing:</strong> Fast and efficient plumbing repairs and installations.</li>
          <li><strong>Electrical Services:</strong> Safe and certified electrical work.</li>
          <li><strong>Carpentry:</strong> Custom woodwork and repairs.</li>
          <li><strong>Painting:</strong> Professional interior and exterior painting services.</li>
          <li><strong>Appliance Repair:</strong> Quick and reliable fixes for your home appliances.</li>
        </ul>
      </header>

      {/* Services Section */}
      <section className="services-list">
        <h2>Our Services</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {services.map((service) => (
              <li key={service._id}>{service.name}</li> // Assuming each service has an _id and name
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Home;
