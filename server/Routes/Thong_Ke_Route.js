import { Router } from "express";
import { admin, protect } from "../middlewares/Auth.js";
import pool from "../Config/database.js"; // Nhớ import pool từ database.js

const router = Router();

//********** ADMIN ROUTES ********//

// Thống kê số lượng bảo hành hôm nay
router.get("/today-warranty-count", protect, admin, async (req, res) => {
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

export default router;
