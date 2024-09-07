import { Router } from "express";
import {
  getAllVat_LieuController,
  getVat_LieuController,
  createVat_LieuController,
  updateVat_LieuController,
  deleteVat_LieuController,
} from "../Controllers/Vat_Lieu_Controller.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = Router();
//********** PUBLIC ROUTES ********//
//********** PRIVATE ROUTES ********//
router.get("/", protect, getAllVat_LieuController);
router.get("/:id", protect, getVat_LieuController);
router.post("/", protect, createVat_LieuController);
router.put("/:id", protect, updateVat_LieuController);

router.delete("/:id", protect, deleteVat_LieuController);
//********** ADMIN ROUTES ********//

export default router;
