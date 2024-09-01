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
//********** PUBLIC ROUTES ********//
router.get("/result/:maHoaDon", getHoa_Don_By_TheBaoHanhController);
//********** PRIVATE ROUTES ********//
router.post("/", protect, createHoa_DonController);
router.get("/", protect, getAllHoa_DonController);
//********** ADMIN ROUTES ********//
router.get("/:id", protect, admin, getHoa_DonController);
router.delete("/:id", protect, admin, deleteHoa_DonController);

export default router;
