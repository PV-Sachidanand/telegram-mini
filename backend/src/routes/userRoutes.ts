import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  authenticate,
} from "../controllers/userController";
import { authMiddleware } from "../lib/middleware/authMiddleware";

const router = Router();

// Route to get all users
router.get("/users", authMiddleware, getUsers);

// Route to get a users
router.get("/user", authMiddleware, getUser);

// Route to create a new user
router.post("/user", authMiddleware, createUser);

// Route to create a new user
router.post("/authenticate", authMiddleware, authenticate);

export default router;
