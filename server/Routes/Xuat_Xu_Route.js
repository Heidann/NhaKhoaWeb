import { Router } from "express";
import {
  getAllXuat_XuController,
  getXuat_XuController,
  createXuat_XuController,
  updateXuat_XuController,
  deleteXuat_XuController,
} from "../Controllers/Xuat_Xu_Controller.js";
import { admin, protect } from "../middlewares/Auth.js";
const router = Router();
//********** PUBLIC ROUTES ********//
//********** PRIVATE ROUTES ********//
router.get("/", protect, getAllXuat_XuController);
router.get("/:id", protect, getXuat_XuController);
router.post("/", protect, createXuat_XuController);
router.put("/:id", protect, updateXuat_XuController);
router.delete("/:id", protect, deleteXuat_XuController);
//********** ADMIN ROUTES ********//

export default router;
