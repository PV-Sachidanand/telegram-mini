import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants";
import { JwtPayload } from "../../@types";
import buildError from "../utils/buildError";
import { StatusCodes } from "../utils/statusCodes";

class JWTServices {
  static generateToken(payload: JwtPayload): string {
    if (!payload)
      return buildError(StatusCodes.BAD_GATEWAY, "Payload cannot empty");
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "600s" });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
      return decoded;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  }
}

export default JWTServices;
