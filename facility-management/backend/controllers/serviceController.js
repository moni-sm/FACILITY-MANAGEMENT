import Service from "../models/Service.js";

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();  // Service.find() to get all services
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services", error: error.message });
  }
};

// Get a service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);  // Use Service.findById
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch service", error: error.message });
  }
};

// Create a new service
export const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newService = new Service({ name, description, price });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Failed to create service", error: error.message });
  }
};

// Update a service by ID
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });  // Service.findByIdAndUpdate
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: "Failed to update service", error: error.message });
  }
};

// Delete a service by ID
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);  // Service.findByIdAndDelete
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete service", error: error.message });
  }
};

export default { getAllServices, getServiceById, createService, updateService, deleteService };