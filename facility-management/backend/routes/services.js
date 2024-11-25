import express from "express";
import {authenticateUser} from "../middleware/authMiddleware.js";  // Default import, no curly braces
import { 
  getAllServices, 
  getServiceById, 
  createService, 
  updateService, 
  deleteService 
} from "../controllers/serviceController.js";  // ES module imports
import { addServices, getProviderServices } from '../controllers/providerController.js';
import { verifyRole } from "../middleware/roleMiddleware.js";  // Only import once

const router = express.Router();

// Create a new service (admin or provider)
router.post("/add-service", authenticateUser, verifyRole(["admin", "provider"]), createService);

// Create a new service (admin only)
router.post("/", authenticateUser, verifyRole(["admin"]), createService);

// Add multiple services (provider or admin)
router.post("/add-services", verifyRole(["provider", "admin"]), addServices);

// Get a provider's services
router.get("/my-service", verifyRole(["provider"]), getProviderServices);

// Get all services
router.get("/", getAllServices);

// Get a specific service by ID
router.get("/:id", getServiceById);

// Update a service by ID (admin only)
router.put("/:id", verifyRole(["admin"]), updateService);

// Delete a service by ID (admin only)
router.delete("/:id", verifyRole(["admin"]), deleteService);

// Export the router
export default router;
