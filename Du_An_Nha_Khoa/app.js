import express, { json } from 'express';
import dotenv from 'dotenv';
dotenv.config()
import Chuc_Vu_Route from "./Routes/Chuc_Vu_Route.js";
import Khach_Hang_Route from './Routes/Khach_Hang_Route.js';
import Tai_Khoan_Route from './Routes/Tai_Khoan_Route.js';
import The_Bao_Hanh_Route from './Routes/The_Bao_Hanh_Route.js';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors({
  origin: 'http://localhost:5173'
}));
// Sử dụng routes
app.use('/api/Chuc_Vu', Chuc_Vu_Route);
app.use('/api/Khach_Hang', Khach_Hang_Route);
app.use('/api/Tai_Khoan', Tai_Khoan_Route);
app.use('/api/The_Bao_Hanh', The_Bao_Hanh_Route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});