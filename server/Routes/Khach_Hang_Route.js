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
router.get("/phone/:phone", getSDTKhachHangController);
router.get("/:id", getKhach_HangController);
router.get(
  "/result/:maTheBaoHanh",

  getKhach_Hang_By_TheBaoHanhController
);
router.post("/", createKhach_HangController);
router.put("/:id", updateKhach_HangController);
//********** ADMIN ROUTES ********//
router.delete("/:id", deleteKhach_HangController);
router.get("/", getAllKhach_HangController);

export default router;
