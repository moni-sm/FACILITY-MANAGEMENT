import jwt from 'jsonwebtoken';
import User from '../models/User.js';  
import bcrypt from 'bcrypt';
//import { constrainedMemory } from 'process';
// import crypto from "crypto";
// import nodemailer from "nodemailer";



const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate role
  if (!['client', 'provider', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided. Allowed values are client, provider, admin.' });
  }

  try {
    // Check if the user already exists (by both username and email)
    let user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

   // user = new User({ username, email, password, role });
   user = new User(req.body, ['name', 'email', 'password','role']);

    // const salt = await bcrypt.genSalt(10);
    //     user.password = await bcrypt.hash(user.password, salt);
    //     user = await user.save();
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt.replace('$2b$', '$2a$'));
  console.log('Original password:', password);  // Log plain text password
  console.log('Generated hash:', user.password);  // Log hashed password
  await user.save();


    // Optionally, generate a JWT token here if needed
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user and generate JWT token
// export const loginUser = async (req, res) => {

//   let { email, password } = req.body.reqPayload;
  
//   console.log('email received from req', email);
//   console.log('password received from req', password);
//   try {
//     // Validate input before querying the database
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Please provide both email and password' });
//     }

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     console.log("user",user);

//     // Compare password with hashed password
//     console.log("password",password);
//     console.log("pass",user.password);
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.error("invalid credential",isMatch);
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     console.log("isMatch",isMatch);

//     // Generate a JWT token
//     const token = jwt.sign(
//       { userId: user._id, username: user.username, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     console.log('username',user.username);
//     console.log('email',user.email);
//     console.log('role',user.role);

//     return res.status(200).json({
//       token,
//       user: { username: user.username, email: user.email, role: user.role }
//     });
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).json({ message: 'Error logging in user', error: error.message });
//   }
// };

// export const loginUser = async (req, res) => {
//   let { email, password } = req.body.reqPayload;
  
//   console.log('email received from req', email);
//   console.log('password received from req', password);
  
//   try {
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Please provide both email and password' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     console.log("user", user);

//     const testPasswordMatch = bcrypt.compareSync(password, user.password);
//       console.log('Manual password match:', testPasswordMatch);

//     // Corrected comparison
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.error("invalid credential", isMatch);
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     console.log("isMatch", isMatch);

//     const token = jwt.sign(
//       { userId: user._id, username: user.username, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     console.log('username', user.username);
//     console.log('email', user.email);
//     console.log('role', user.role);

//     return res.status(200).json({
//       token,
//       user: { username: user.username, email: user.email, role: user.role }
//     });
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).json({ message: 'Error logging in user', error: error.message });
//   }
// };

export const loginUser = async (req, res) => {
  let { email, password } = req.body.reqPayload;
  
  console.log('Received email:', email);
  console.log('Received password:', password);

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials - user not found' });
    }

    console.log('Stored user data:', user);

    // Corrected comparison using custom method
    const isMatch = await user.comparePassword(password);
    console.log('Password comparison result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials - incorrect password' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token,
      user: { username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};


//Forgot  password controller

// export const forgotPassword = async (req,res)=>{
//   const{email}=req.body;
//   try{
//     const user = await User.findOne({email});
//     if(!user){
//       return res.status(400).json({message:"User not found"});
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const resetTokenExpiry = Date.now() + 3600000;

//      // Send reset link via email
//      const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: user.email,  // Use your email
//         pass: user.password    // Use your email password (or app password)
//       }
//     });
//     const resetLink = `http://localhost:5000/reset-password/${resetToken}`;

//     const mailOptions = {
//       to: email,
//       subject: "Password Reset Request",
//       text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ message: "Password reset link sent. Please check your email." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error sending reset email. Try again later." });
//   }
// };

// // Reset password controller
// export const resetPassword = async (req, res) => {
//   const { token, password } = req.body;

//   try {
//     // Find user by reset token
//     const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     // Hash the new password and save it
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     user.resetToken = undefined;
//     user.resetTokenExpiry = undefined;

//     await user.save();

//     res.json({ message: "Password reset successfully. You can now log in." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error. Try again later." });
//   }
// };
