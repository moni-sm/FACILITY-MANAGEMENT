import React, { useState } from "react";
import BASE_URL from "../config";  // Import the BASE_URL
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");  // Change 'name' to 'username'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // Default to client

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, email, password, role };  // Make sure the data object matches the backend schema

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", result);
        localStorage.setItem('token', result.token);
        navigate('/login');
      } else {
        console.log("Error:", result.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <input
        type="text"
        value={username}  // Changed to 'username'
        onChange={(e) => setUsername(e.target.value)}  // Changed to 'username'
        placeholder="Username"  // Changed placeholder to 'Username'
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="client">Client</option>
        <option value="provider">Provider</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default SignupForm;
