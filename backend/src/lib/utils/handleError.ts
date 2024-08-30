import { Response } from "express";
import { StatusCodes } from "./statusCodes";

/**
 * Generates an error response
 * @param res - Express response object
 * @param err - Error object
 */
const generateErrorResponse = (
  res: Response,
  err: { code?: number; message?: string; moreInfo?: string }
): void => {
  res.status(err?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err?.message || "An unhandled error occurred.",
    moreInfo: err?.moreInfo || "No additional info found.",
  });
};

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param res - Express response object
 * @param err - Error object
 */
const handleError = (
  res: Response,
  err: { code?: number; message?: string; moreInfo?: string }
): void => {
  // Logs error to the console in development or other non-test environments
  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  // Sends error to user
  try {
    generateErrorResponse(res, err);
  } catch (error) {
    console.error(error);
    generateErrorResponse(
      res,
      error as { code?: number; message?: string; moreInfo?: string }
    );
  }
};

export { handleError, generateErrorResponse };
