import { Router } from "express";
import { registerUser } from "../controllers/authController";
const router = Router();

router.post("/register", registerUser);

module.exports = router;