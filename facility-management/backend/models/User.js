import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // Ensure username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['client', 'provider', 'admin'],
    default: 'client',  // Default role is 'client'
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set the creation date
  }
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Only hash the password if it's being modified
  this.password = await bcrypt.hash(this.password, 10);  
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password); 
};



// Create the User model

const User = mongoose.model('User', userSchema);

// Export User using ES Modules
export default User;
