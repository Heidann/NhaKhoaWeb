import { Router } from "express";
import {
  getAllTai_KhoanController,
  postTaiKhoanByUserController,
  createTai_KhoanController,
  updateTai_KhoanController,
  deleteTai_KhoanController,
  GetAllNha_SiController,
  getTai_KhoanByIdController,
  updateMatKhauController,
} from "../Controllers/Tai_Khoan_Controller.js";
import { admin, protect } from "../middlewares/Auth.js";

const router = Router();

//********** PUBLIC ROUTES ********//
router.post("/login/", postTaiKhoanByUserController);

//********** PRIVATE ROUTES ********//
router.get("/nha_si", GetAllNha_SiController);
router.get("/:id", getTai_KhoanByIdController);
router.put("/:id", updateTai_KhoanController);
router.put("/change_password/:id", protect, updateMatKhauController);

//********** ADMIN ROUTES ********//
router.get("/", getAllTai_KhoanController);
router.post("/", createTai_KhoanController);
router.delete("/:id", deleteTai_KhoanController);

export default router;
