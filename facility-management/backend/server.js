import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  
import cors from 'cors';
import bodyParser from 'body-parser';

// Initialize environment variables
dotenv.config();

// Import routes
import paymentRoutes from './routes/payment.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';
import adminRoutes from './routes/admin.js';
import servicesRoutes from './routes/services.js';


const app = express();

// Middleware
app.use(express.json());  // For parsing JSON bodies

app.use(cors());  // Enable Cross-Origin Resource Sharing

connectDB();

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/services', servicesRoutes);  // Service routes
app.use('/api/bookings', bookingRoutes);  // Booking routes
app.use('/api/admin', adminRoutes);  // Admin routes
app.use('/api/payment', paymentRoutes);  // Payment routes



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
