import Booking from '../models/Booking.js';  // Ensure .js extension
import Service from '../models/Service.js';  // Ensure .js extension

// Create a new booking
export const createBooking = async (req, res) => {
  const { clientId, serviceId, date, time } = req.body;

  try {
    // Find the service by ID
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Create and save the new booking
    const booking = new Booking({ clientId, serviceId, date, time });
    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    // Fetch all bookings and populate the related fields
    const bookings = await Booking.find().populate('clientId serviceId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};
