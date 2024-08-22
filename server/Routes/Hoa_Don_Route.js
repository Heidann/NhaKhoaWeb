import { Router } from "express";
import {
  getAllHoa_DonController,
  getHoa_DonController,
  createHoa_DonController,
  updateHoa_DonController,
  deleteHoa_DonController,
  getHoa_Don_By_TheBaoHanhController,
} from "../Controllers/Hoa_Don_Controller.js";

const router = Router();

router.get("/", getAllHoa_DonController);
router.get("/:id", getHoa_DonController);
router.get("/result/:maHoaDon", getHoa_Don_By_TheBaoHanhController);
router.post("/", createHoa_DonController);
router.put("/:id", updateHoa_DonController);
router.delete("/:id", deleteHoa_DonController);

export default router;
