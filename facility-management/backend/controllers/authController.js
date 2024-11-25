import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';  // Import User model

// Secret key for signing JWT (store this in an environment variable)
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
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    console.log("existinguser",existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashpassword",hashedPassword);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    // Optionally, generate a JWT token here if needed
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Token will expire in 1 hour
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { username: newUser.username, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};


// Login user and generate JWT token
export const loginUser = async (req, res) => {
  console.log('Login attempt with data:', req.body);
  const { email, password } = req.body;

  try {
    // Validate input before querying the database
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log("user",user)

    // Compare password with hashed password
    console.log("password",password);
    console.log("pass",user.password);
    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());
    if (!isMatch) {
      console.error("invalid credential",isMatch);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log("isMatch",isMatch);

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,  // Use the value from process.env for better security
      { expiresIn: '1h' } // Token will expire in 1 hour
    );

    console.log('username',user.username);
    console.log('email',user.email);
    console.log('role',user.role);

    return res.status(200).json({
      token,
      user: { username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};
