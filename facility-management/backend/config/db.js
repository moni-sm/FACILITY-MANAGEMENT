import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // No need for the deprecated options anymore
    await mongoose.connect('mongodb://localhost:27017/facility-management');

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
