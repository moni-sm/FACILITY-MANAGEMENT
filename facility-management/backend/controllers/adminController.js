// controllers/adminController.js
import User from '../models/User.js';  
import Service from '../models/Service.js';  
import Booking from '../models/Booking.js';  

// Fetch all users with pagination
const getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;  // Optional pagination

  try {
    // Fetch paginated users
    const users = await User.find()
      .skip((page - 1) * limit)  // Skip users based on the page
      .limit(Number(limit));  // Limit the number of users returned

    // Get total user count
    const usersCount = await User.countDocuments();

    // Send paginated results
    res.status(200).json({
      users,
      totalUsers: usersCount,
      currentPage: page,
      totalPages: Math.ceil(usersCount / limit),  // Calculate total pages
    });
  } catch (error) {
    console.error('Error fetching users:', error);  // Log error for debugging
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Fetch admin dashboard data (service, booking, user counts)
export const getAdminDashboard = async (req, res) => {
  try {
    // Get counts for services, bookings, and users
    const servicesCount = await Service.countDocuments();
    const bookingsCount = await Booking.countDocuments();
    const usersCount = await User.countDocuments();
    
    // Send the counts in the response
    res.status(200).json({ servicesCount, bookingsCount, usersCount });
  } catch (error) {
    console.error('Error fetching admin data:', error);  // Log error for debugging
    res.status(500).json({ message: 'Error fetching admin data' });
  }
};

// Export the functions
export default { getUsers, getAdminDashboard };

