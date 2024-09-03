import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import routes from "./routes"; // Import the consolidated routes
import cors from "cors"; // Import cors
import errorHandlerMiddleware from "./lib/middleware/errorHandlerMiddleware";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Init middleware
app.use(express.json());
app.use(cors()); // Use cors

const PORT = process.env.PORT || 5000;
// Define routes
app.use("/", routes);
app.get("/", (req, res) => {
  res.send(`<h1>Server is running on Port : ${PORT}</h1>`);
});

// Error handler middleware
app.use(errorHandlerMiddleware);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
