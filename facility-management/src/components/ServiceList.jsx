import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import BASE_URL from "../config";

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/services`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Service List</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p>Price: {service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;