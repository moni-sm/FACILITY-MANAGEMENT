import express from 'express';
import { createBooking, getBookings } from '../controllers/bookingController.js'; // Ensure .js extension

const router = express.Router();

// Define routes for creating and getting bookings
router.post('/', createBooking);
router.get('/', getBookings);

// Export the router using ES Module syntax
export default router;
