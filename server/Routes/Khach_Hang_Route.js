import { Router } from "express";
import {
  getAllKhach_HangController,
  getKhach_HangController,
  createKhach_HangController,
  updateKhach_HangController,
  deleteKhach_HangController,
  getKhach_Hang_By_TheBaoHanhController,
  getSDTKhachHangController,
} from "../Controllers/Khach_Hang_Controller.js";
import { protect, admin } from "../middlewares/Auth.js";
const router = Router();
//********** PUBLIC ROUTES ********//
//********** PRIVATE ROUTES ********//
router.get("/phone/:phone", protect, getSDTKhachHangController);
router.get("/:id", protect, getKhach_HangController);
router.get(
  "/result/:maTheBaoHanh",
  protect,

  getKhach_Hang_By_TheBaoHanhController
);
router.get("/", protect, getAllKhach_HangController);
router.post("/", protect, createKhach_HangController);
router.put("/:id", protect, updateKhach_HangController);
//********** ADMIN ROUTES ********//
router.delete("/:id", protect, admin, deleteKhach_HangController);

export default router;
