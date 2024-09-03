import { Request, Response, NextFunction } from "express";
import { handleError } from "../handlers/handleError";
import { MongoServerError } from "mongodb";
import { ErrorResponse } from "../../@types";

const errorHandlerMiddleware = (
  err: ErrorResponse | MongoServerError, // Adjust type if necessary
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Pass the error to the handleError function
  handleError(res, err);
};

export default errorHandlerMiddleware;
