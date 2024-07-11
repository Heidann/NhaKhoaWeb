import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors()); // to allow cross origin requests
app.use(express.json()); // to parse incoming requests with JSON payloads
const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

// Main route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// to handle errors in async routes
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
