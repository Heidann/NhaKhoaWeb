import express, { json } from "express";
import dotenv from "dotenv";
import session from "express-session";
import Chuc_Vu_Route from "./Routes/Chuc_Vu_Route.js";
import Khach_Hang_Route from "./Routes/Khach_Hang_Route.js";
import Tai_Khoan_Route from "./Routes/Tai_Khoan_Route.js";
import The_Bao_Hanh_Route from "./Routes/The_Bao_Hanh_Route.js";
import Hoa_Don_Route from "./Routes/Hoa_Don_Route.js";
import Vat_Lieu_Route from "./Routes/Vat_Lieu_Route.js";
import Xuat_Xu_Route from "./Routes//Xuat_Xu_Route.js";
import Labo_Route from "./Routes/Labo_Route.js";
import Thong_Ke_Route from "./Routes/Thong_Ke_Route.js";
import { protect } from "./middlewares/Auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import errorHandler from "./middlewares/errorMiddleWare.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true, // Add this line to allow credentials
  })
);

//
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 3000;

// Sử dụng routes
app.use("/api/admin/Chuc_Vu", Chuc_Vu_Route);
app.use("/api/admin/Khach_Hang", Khach_Hang_Route);
app.use("/api/admin/Tai_Khoan", Tai_Khoan_Route);
app.use("/api/admin/The_Bao_Hanh", The_Bao_Hanh_Route);
app.use("/api/admin/Hoa_Don", Hoa_Don_Route);
app.use("/api/admin/Vat_Lieu", Vat_Lieu_Route);
app.use("/api/admin/Xuat_Xu", Xuat_Xu_Route);
app.use("/api/admin/Labo", Labo_Route);
app.use("/api/admin/Thong_Ke", Thong_Ke_Route);

// to handle errors in async routes
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
