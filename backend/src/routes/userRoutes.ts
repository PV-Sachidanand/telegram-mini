import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  authenticate,
} from "../controllers/userController";
import {
  validate,
  parse,
  type InitDataParsed,
} from "@telegram-apps/init-data-node";
import express, {
  type ErrorRequestHandler,
  type RequestHandler,
  type Response,
} from "express";
import { BOT_TOKEN } from "../lib/constants";

/**
 * Sets init data in the specified Response object.
 * @param res - Response object.
 * @param initData - init data.
 */
function setInitData(res: Response, initData: InitDataParsed): void {
  res.locals.initData = initData;
}

/**
 * Extracts init data from the Response object.
 * @param res - Response object.
 * @returns Init data stored in the Response object. Can return undefined in case,
 * the client is not authorized.
 */
export function getInitData(res: Response): InitDataParsed | undefined {
  return res.locals.initData;
}

/**
 * Middleware which authorizes the external client.
 * @param req - Request object.
 * @param res - Response object.
 * @param next - function to call the next middleware.
 */
const authMiddleware: RequestHandler = (req, res, next) => {
  // We expect passing init data in the Authorization header in the following format:
  // <auth-type> <auth-data>
  // <auth-type> must be "tma", and <auth-data> is Telegram Mini Apps init data.
  const [authType, authData = ""] = (req.header("authorization") || "").split(
    " "
  );

  switch (authType) {
    case "tma":
      try {
        // Validate init data.
        validate(authData, BOT_TOKEN, {
          // We consider init data sign valid for 1 hour from their creation moment.
          expiresIn: 3600,
        });

        // Parse init data. We will surely need it in the future.
        setInitData(res, parse(authData));
        return next();
      } catch (e) {
        return next(e);
      }
    // ... other authorization methods.
    default:
      return next(new Error("Unauthorized"));
  }
};

const router = Router();

// Route to get all users
router.get("/users", authMiddleware, getUsers);

// Route to get a users
router.get("/user", getUser);

// Route to create a new user
router.post("/user", createUser);

// Route to create a new user
router.post("/authenticate", authenticate);

export default router;
