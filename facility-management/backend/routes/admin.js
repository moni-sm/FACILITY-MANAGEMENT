import { Router } from 'express';
import { authenticateUser, verifyRole } from '../middleware/authMiddleware.js';  
import adminController from '../controllers/adminController.js';    // Default import

const router = Router();

// Define routes with controller methods
router.get("/dashboard", authenticateUser, verifyRole(["admin"]), adminController.getAdminDashboard);
router.post("/manage-users", authenticateUser, verifyRole(["admin"]), adminController.getUsers);

export default router;
