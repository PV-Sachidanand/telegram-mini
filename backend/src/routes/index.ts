import { Router } from "express";
import userRoutes from "./userRoutes";
// Import other route modules here

const router = Router();

// Use route modules
router.use("/", userRoutes);
// Add other route modules here

export default router;
