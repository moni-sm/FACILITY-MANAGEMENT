const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'; // Local proxy server

// Helper function to handle API responses and errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
  }

  try {
  
    return await response.json();
  } catch (e) {
    // If response is not JSON, return null
    console.warn('Non-JSON response:', response);
    return null;
  }
};

// Register API function
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response); 
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("An error occurred while registering. Please try again.");
  }
};

// Login API function
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await handleResponse(response); // Process the response
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("An error occurred while logging in. Please check your credentials.");
  }
};

// Fetch Services API function
export const fetchServices = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/services`);
    return await handleResponse(response); // Process the response
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("An error occurred while fetching services. Please try again later.");
  }
};
