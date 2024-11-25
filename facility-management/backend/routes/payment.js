import express from 'express';
import { processPayment, addServices, getProviderServices } from '../controllers/paymentController.js'; // Correct import with .js extension and destructuring

const router = express.Router();

// Route for processing payment
router.post('/process-payment', processPayment); // Fixed typo here

// Add service route
router.post('/add', addServices);

// Get provider's services route
router.get('/:providerId/services', getProviderServices);

export default router;
