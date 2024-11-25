import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);

  // Get BASE_URL from environment variables
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    // Fetch admin dashboard data (for counts)
    const fetchDashboardData = async () => {
      try {
        // Use BASE_URL here
        const response = await axios.get(`${BASE_URL}/api/admin/dashboard`);
        setUsersCount(response.data.usersCount);
        setServicesCount(response.data.servicesCount);
        setBookingsCount(response.data.bookingsCount);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [BASE_URL]);

  const logout = () => {
    // Handle logout logic, e.g., clearing auth tokens
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="admin-dashboard">
      <div className="header">
        <h1>Admin Dashboard</h1>
        <button className="logout" onClick={logout}>Logout</button>
      </div>

      <div className="cards-container">
        <div className="card">
          <h3>Users</h3>
          <p>{usersCount}</p>
        </div>
        <div className="card">
          <h3>Services</h3>
          <p>{servicesCount}</p>
        </div>
        <div className="card">
          <h3>Bookings</h3>
          <p>{bookingsCount}</p>
        </div>
      </div>

      {/* Users Table */}
      <h2>Users List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example static data for users. You'd map through fetched data here */}
          <tr>
            <td>John Doe</td>
            <td>johndoe@example.com</td>
            <td>Client</td>
            <td className="action-buttons">
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>Jane Doe</td>
            <td>janedoe@example.com</td>
            <td>Provider</td>
            <td className="action-buttons">
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>Next</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
