import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  authenticate,
} from "../controllers/userController";
import { authMiddleware } from "../lib/middleware/authMiddleware";

/**
 * This module sets up the routes for user-related operations.
 * It includes routes for fetching all users, fetching a single user,
 * creating a new user, and authenticating a user.
 */

const router = Router();

/**
 * Route to fetch all users. This route is protected by the authMiddleware.
 * It requires authentication to access.
 */
router.get("/users", authMiddleware, getUsers);

/**
 * Route to fetch a single user. This route is protected by the authMiddleware.
 * It requires authentication to access.
 */
router.get("/user", authMiddleware, getUser);

/**
 * Route to create a new user. This route is protected by the authMiddleware.
 * It requires authentication to access.
 */
router.post("/user", authMiddleware, createUser);

/**
 * Route to authenticate a user. This route is protected by the authMiddleware.
 * It requires authentication to access.
 */
router.post("/authenticate", authMiddleware, authenticate);

export default router;
