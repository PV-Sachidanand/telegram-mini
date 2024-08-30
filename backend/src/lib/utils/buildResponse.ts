import { Response } from "express";
/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} response - response object
 */
const buildResponse = (res: Response, response: object = {}) => {
  return res.send({
    success: true,
    response,
  });
};

export default buildResponse;
