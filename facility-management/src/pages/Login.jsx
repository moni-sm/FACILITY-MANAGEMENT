import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '../styles/SignupForm.css'; // Reuse the SignupForm CSS

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("tocken",token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          navigate('/Profile');
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

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
      reqPayload.email=formData.email;
      reqPayload.password=formData.password;
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

      // Navigate based on user role
      const userRole = response.data.role;
      if (userRole === 'provider') {
        navigate('/providerprofile');
      } else if (userRole === 'client') {
        navigate('/clientprofile');
      } else {
        navigate('/Profile');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignup = () => navigate('/signup');
  const navigateToForgotPassword = () => navigate('/forgotpassword');

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
          required
        />
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <div className="form-links">
          <button type="button" onClick={navigateToSignup} className="link-button">Create an Account</button>
          <button type="button" onClick={navigateToForgotPassword} className="link-button">Forgot Password?</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
