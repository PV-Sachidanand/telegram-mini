import dotenv from "dotenv";
// Load environment variables
dotenv.config();

/**
 * Telegram Bot Token for bot authentication
 * @type {string}
 */
export const TELEGRAM_BOT_TOKEN: string = process.env
  .TELEGRAM_BOT_TOKEN as string;

/**
 * JWT Secret Key for token-based authentication
 * @type {string}
 */
export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY as string;

/**
 * Node Environment Variable to determine the environment (e.g., development, production)
 * @type {string}
 */
export const NODE_ENV: string = process.env.NODE_ENV as string;

/**
 * Domain of the application
 * @type {string}
 */
export const DOMAIN: string = process.env.DOMAIN as string;

/**
 * MongoDB URI for establishing a connection to the MongoDB database
 * @type {string}
 */
export const MONGO_URI: string = process.env.MONGO_URI as string;
