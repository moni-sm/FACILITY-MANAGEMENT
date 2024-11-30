import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  
import cors from 'cors';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import mongoose from 'mongoose';
import auth from './routes/auth.js';
import bodyParser from 'body-parser';

// Initialize environment variables
dotenv.config();

const dbURI = 'mongodb://localhost:27017/facility-management';
mongoose.connect(dbURI)
.then(()=> console.log('Database connected'))
.catch(err => console.log('Database connection error:',err));

// Import routes
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';
import adminRoutes from './routes/admin.js';
import servicesRoutes from './routes/services.js';

const app = express();

// Middleware
app.use(express.json());  // For parsing JSON bodies
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/api/auth',auth);
app.get('/api/proxy/languages', async (req, res) => {
  try {
    // Make the request to the third-party API
    const response = await axios.get('https://extensions.chatgptextension.ai/languages/lang/get/lang/en');
    res.json(response.data);  // Return the third-party data to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch languages from the third-party API' });
    console.error('Error fetching from third-party API:', error);  // Log any errors on the server
  }
});

const authenticationUser = (req,res,next) =>{
  const token = req.headers['aithorisation'];

  if(!token){
    return res.status(401).json({error:'Unauthoriszed,no token provide.'});
  }

  jwt.verify(token,'token-secret-key',(err,decoded)=>{
    if(err){
      return res.status(401).json({error:'Unauthorized,invalid token.'});
    }
    req.user=decoded;
    next();
  });
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/services', servicesRoutes);  // Service routes
app.use('/api/bookings', bookingRoutes);  // Booking routes
app.use('/api/admin', adminRoutes);  // Admin routes

// GET endpoint to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await users.find(); 
    res.json(users);  
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users', details: err });
  }
});
app.get('/api/users/profile',authenticationUser,async (req, res) => {
  try{
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({error:'User profile not found'});
    }
    res.json({
      userId:user._id,
      name: user.name,
      email:user.email,
      age:user.age
    });
  }catch(err){
    console.error(err);
    res.status(500).json({error:'An error occured while fetching user data'});
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
