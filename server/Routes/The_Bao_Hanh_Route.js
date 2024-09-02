import { Router } from "express";
import {
  getAllThe_Bao_HanhController,
  getThe_Bao_HanhController,
  createThe_Bao_HanhController,
  updateThe_Bao_HanhController,
  deleteThe_Bao_HanhController,
  getSo_LuongController,
  getStatusTheBaoHanhID_By_MaController,
  getTheBaoHanhID_By_MaController,
} from "../Controllers/The_Bao_Hanh_Controller.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = Router();
//********** PUBLIC ROUTES ********//
//********** PRIVATE ROUTES ********//
router.get("/", protect, getAllThe_Bao_HanhController);

router.get(
  "/statusCode/:maTheBaoHanh",
  protect,
  getStatusTheBaoHanhID_By_MaController
);
router.get("/code/:maTheBaoHanh", protect, getTheBaoHanhID_By_MaController);
router.get("/:id", protect, getThe_Bao_HanhController);
//********** ADMIN ROUTES ********//
router.post("/", protect, admin, createThe_Bao_HanhController);
router.put("/:id", protect, admin, updateThe_Bao_HanhController);
router.delete("/:id", protect, admin, deleteThe_Bao_HanhController);
export default router;
