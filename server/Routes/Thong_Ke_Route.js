import { Router } from "express";
import { admin, protect } from "../middlewares/Auth.js";
import pool from "../Config/database.js"; // Nhớ import pool từ database.js

const router = Router();

//********** ADMIN ROUTES ********//

// Thống kê số lượng bảo hành hôm nay
router.get("/today", protect, admin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT GetWarrantyCountToday() AS count_today"
    );
    const countToday = rows[0].count_today;
    res.json({ count_today: countToday });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thống kê số lượng bảo hành tháng hiện tại
router.get("/month", protect, admin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT GetWarrantyCountMonth() AS count_month"
    );
    const count_Month = rows[0].count_month;
    res.json({ count_month: count_Month });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thống kê số lượng bảo hành quý hiện tại
router.get("/quarter", protect, admin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT GetWarrantyCountQuarter() AS count_quarter"
    );
    const count_Quarter = rows[0].count_quarter;
    res.json({ count_quarter: count_Quarter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thống kê số lượng bảo hành năm hiện tại
router.get("/year", protect, admin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT GetWarrantyCountQuarter() AS count_year"
    );
    const count_Year = rows[0].count_year;
    res.json({ count_year: count_Year });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
