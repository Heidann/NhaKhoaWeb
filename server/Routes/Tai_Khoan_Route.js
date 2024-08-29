import { Router } from "express";
import {
  getAllTai_KhoanController,
  getTai_KhoanController,
  createTai_KhoanController,
  updateTai_KhoanController,
  deleteTai_KhoanController,
  postTai_Khoan_User_PassController,
  GetAllNha_SiController,
  getTai_KhoanByIdController,
} from "../Controllers/Tai_Khoan_Controller.js";
import { admin, protect } from "../middlewares/Auth.js";

const router = Router();

router.get("/", protect, admin, getAllTai_KhoanController);
router.get("/nha_si", protect, GetAllNha_SiController);
router.get("/:id", getTai_KhoanByIdController);
// router.get("/:Ten_Tai_Khoan", getTai_Khoan_UserController);
router.post("/login/", postTai_Khoan_User_PassController);
router.post("/", protect, createTai_KhoanController);
router.put("/:id", updateTai_KhoanController);
router.delete("/:id", deleteTai_KhoanController);

export default router;
