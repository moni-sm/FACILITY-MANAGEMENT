import express from 'express';
import { addServices, getProviderServices } from '../controllers/paymentController.js'; // Correct import with .js extension and destructuring

const router = express.Router();

// Add service route
router.post('/add', addServices);

// Get provider's services route
router.get('/:providerId/services', getProviderServices);

export default router;
