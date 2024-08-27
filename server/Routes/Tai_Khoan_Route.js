import { Router } from "express";
import {
  getAllTai_KhoanController,
  getTai_KhoanController,
  createTai_KhoanController,
  updateTai_KhoanController,
  deleteTai_KhoanController,
  postTai_Khoan_User_PassController,
  GetAllNha_SiController,
} from "../Controllers/Tai_Khoan_Controller.js";

const router = Router();

router.get("/", getAllTai_KhoanController);
router.get("/nha_si", GetAllNha_SiController);
router.get("/:id", getTai_KhoanController);
// router.get("/:Ten_Tai_Khoan", getTai_Khoan_UserController);
router.post("/login/", postTai_Khoan_User_PassController);
router.post("/", createTai_KhoanController);
router.put("/:id", updateTai_KhoanController);
router.delete("/:id", deleteTai_KhoanController);

export default router;
