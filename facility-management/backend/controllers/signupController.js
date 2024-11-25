import React, { useState } from "react";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return ;
      }
      alert(`${role} registration successful!`);
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert("Error during registration.");
    }
  };

  return (
    <form onSubmit={handleRegister} >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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