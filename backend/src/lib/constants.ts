import dotenv from "dotenv";
// Load environment variables
dotenv.config();
export const BOT_TOKEN = process.env.BOT_TOKEN as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const DOMAIN = process.env.DOMAIN as string;
export const MONGO_URI = process.env.MONGO_URI as string;
