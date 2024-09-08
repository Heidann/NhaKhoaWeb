import { Router } from "express";
import {
  getAllTai_KhoanController,
  postTaiKhoanByUserController,
  createTai_KhoanController,
  updateTai_KhoanController,
  deleteTai_KhoanController,
  GetAllNha_SiController,
  getTai_KhoanByIdController,
  getTai_KhoanController,
  updateMatKhauController,
} from "../Controllers/Tai_Khoan_Controller.js";
import { refreshToken, admin, protect } from "../middlewares/Auth.js";

const router = Router();

//********** PUBLIC ROUTES ********//
router.post("/login/", postTaiKhoanByUserController);

//********** PRIVATE ROUTES ********//

router.get("/nha_si", protect, GetAllNha_SiController);
router.get("/:id", protect, getTai_KhoanController);
router.put("/change_password", protect, updateMatKhauController);
router.put("/:id", protect, updateTai_KhoanController);
router.get("/", protect, getAllTai_KhoanController);
router.post("/", protect, createTai_KhoanController);
router.post("/refresh_token", refreshToken);
//********** ADMIN ROUTES ********//
router.delete("/:id", protect, admin, deleteTai_KhoanController);

export default router;
