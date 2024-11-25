import Service from '../models/Service.js'; // Import the Service model

// Add a new service
export const addServices = async (req, res) => {
  try {
    const { title, description, price, category, providerId } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !price || !category || !providerId) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Create a new service document
    const newService = new Service({
      title,
      description,
      price,
      category,
      providerId,
    });

    // Save the service to the database
    await newService.save();

    res.status(200).json({ message: "Service added successfully", service: newService });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ message: "Failed to add service", error: error.message });
  }
};

// Fetch services of a specific provider
export const getProviderServices = async (req, res) => {
  try {
    const { providerId } = req.params;

    // Find services for the specific provider
    const services = await Service.find({ providerId });

    if (!services.length) {
      return res.status(404).json({ message: "No services found for this provider" });
    }

    res.status(200).json({ message: "Provider services fetched", services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: "Failed to fetch services", error: error.message });
  }
};