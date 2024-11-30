// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';


// // Define the user schema
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,  // Ensure username is unique
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,  // Ensure email is unique
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ['client', 'provider', 'admin'],
//     default: 'client',  // Default role is 'client'
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,  // Automatically set the creation date
//   }
// });

// // Hash the password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();  // Only hash the password if it's being modified
//   console.log("password",this.password);
//   this.password = await bcrypt.hash(this.password, 10);  
//   next();
// });

// // Method to compare passwords
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password); 
// };





// const User = mongoose.model('User', userSchema);

// // Export User using ES Modules
// export default User;

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
  console.log("password", this.password);
  const salt = await bcrypt.genSalt(10);  // Let bcrypt automatically handle salt prefix
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);  // This will handle the comparison
};

export default mongoose.model('User', userSchema);

