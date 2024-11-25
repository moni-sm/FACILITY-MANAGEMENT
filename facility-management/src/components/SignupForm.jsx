import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";  // Import the BASE_URL
import '../styles/SignupForm.css'

const SignupForm = () => {
  const [username, setUsername] = useState("");  // Change 'name' to 'username'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // Default to client
  const [error, setError] = useState("");  // To store error messages
  const [loading, setLoading] = useState(false);  // To track loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, email, password, role };  // Ensure data matches the backend schema
    setError("");  // Reset error state before submitting

    setLoading(true);  // Set loading to true when submitting form

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", result);
        // Handle success (e.g., redirect to login page)
        navigate("/login");
      } else {
        // Handle known errors (like username or email already exists)
        if (result.message.includes("Username or Email already exists")) {
          setError("This username or email is already taken. Please try another.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
      
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);  // Set loading to false after the request is complete
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
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
      <button type="submit" disabled={loading} onClick={<Signup />}>
        {loading ? "Registering..." : "Register"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error messages */}
    </form>
  );
};

export default SignupForm;
