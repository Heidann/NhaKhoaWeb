import { Router } from "express";
import {
  getAllHoa_DonController,
  getHoa_DonController,
  createHoa_DonController,
  updateHoa_DonController,
  deleteHoa_DonController,
  getHoa_Don_By_TheBaoHanhController,
} from "../Controllers/Hoa_Don_Controller.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = Router();

router.get("/", protect, getAllHoa_DonController);
router.get("/:id", getHoa_DonController);
router.get("/result/:maHoaDon", getHoa_Don_By_TheBaoHanhController);
router.post("/", protect, admin, createHoa_DonController);
router.put("/:id", updateHoa_DonController);
router.delete("/:id", deleteHoa_DonController);

export default router;
