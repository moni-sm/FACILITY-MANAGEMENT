import React, { useState, useEffect, Children } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '../styles/main.css';

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // State for error message
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const navigate = useNavigate();  // To redirect after login

  useEffect(() => {
    // Check if there's a valid token already stored
    const token = localStorage.getItem('token');
    console.log("tocken",token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if the token is expired
        if (decoded.exp * 1000 > Date.now()) {
          // navigate('/Profile'); // Redirect to profile page if token is valid
        } else {
          // Optionally, clear the token if expired
          localStorage.removeItem('token');
        }
      } catch (error) {
        // Handle any errors during token decoding (invalid token format)
        console.error('Invalid token', error);
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset previous errors

    // Basic client-side validation
    if (!formData.email || !formData.password) {
      setError("Please fill in both fields.");
      setIsLoading(false);
      return;
    }

    // Validate email format
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!isValidEmail.test(formData.email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    //console.log(formData); 

    try {
      console.log('formData',formData);
      // Send login request to backend
      const reqPayload= {};
      reqPayload.email=formData.email[0];
      reqPayload.password=formData.password[0];
      console.log("payload",reqPayload);
    
      const response = await axios.post('http://localhost:5000/api/auth/login',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token'),
        },
        reqPayload});
      
      // Successful response handling
      console.log('Login success:', response.data);
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      navigate('/Profile');  
    } catch (error) {
      console.error('Login failed with error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    }
     finally {
      setIsLoading(false);  // Hide loader after request completion
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        
        <button type="submit" disabled={isLoading}> {/* Disable button during loading */}
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
