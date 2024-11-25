import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';  // Correct import of functions

const router = express.Router();  // Initialize the router


// Define routes
router.post('/register', registerUser);  // POST route for registration
router.post('/login', loginUser);  // POST route for login



// Export the router
export default router;
