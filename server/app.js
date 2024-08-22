import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import Chuc_Vu_Route from "./Routes/Chuc_Vu_Route.js";
import Khach_Hang_Route from "./Routes/Khach_Hang_Route.js";
import Tai_Khoan_Route from "./Routes/Tai_Khoan_Route.js";
import The_Bao_Hanh_Route from "./Routes/The_Bao_Hanh_Route.js";
import Hoa_Don_Route from "./Routes/Hoa_Don_Route.js";
import Vat_Lieu_Route from "./Routes/Vat_Lieu_Route.js";
import Loai_Dia_Route from "./Routes/Loai_Dia_Route.js";
import Labo_Route from "./Routes/Labo_Route.js";

import cors from "cors";
import pool from "./Config/database.js"; // Import your database connection

const app = express();
app.use(json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

// Sử dụng routes
app.use("/api/admin/Chuc_Vu", Chuc_Vu_Route);
app.use("/api/admin/Khach_Hang", Khach_Hang_Route);
app.use("/api/admin/Tai_Khoan", Tai_Khoan_Route);
app.use("/api/admin/The_Bao_Hanh", The_Bao_Hanh_Route);
app.use("/api/admin/Hoa_Don", Hoa_Don_Route);
app.use("/api/admin/Vat_Lieu", Vat_Lieu_Route);
app.use("/api/admin/Loai_Dia", Loai_Dia_Route);
app.use("/api/admin/Labo", Labo_Route);

// Test route for database connection
app.get("/api/test-connection", async (req, res) => {
  try {
    // Attempt to connect to the database
    const [rows] = await pool.execute("SELECT 1");
    res.json({ message: "Database connection successful!" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ message: "Database connection failed!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
