import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  authenticate,
} from "../controllers/userController";

const router = Router();

// Route to get all users
router.get("/users", getUsers);

// Route to get a users
router.get("/user", getUser);

// Route to create a new user
router.post("/user", createUser);

// Route to create a new user
router.post("/authenticate", authenticate);

export default router;
