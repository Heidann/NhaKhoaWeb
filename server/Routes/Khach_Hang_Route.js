import { Router } from "express";
import {
  getAllKhach_HangController,
  getKhach_HangController,
  createKhach_HangController,
  updateKhach_HangController,
  deleteKhach_HangController,
  getKhach_Hang_By_TheBaoHanhController,
} from "../Controllers/Khach_Hang_Controller.js";

const router = Router();

router.get("/", getAllKhach_HangController);
router.get("/:id", getKhach_HangController);
router.get("/result/:maTheBaoHanh", getKhach_Hang_By_TheBaoHanhController);
router.post("/", createKhach_HangController);
router.put("/:id", updateKhach_HangController);
router.delete("/:id", deleteKhach_HangController);

export default router;
