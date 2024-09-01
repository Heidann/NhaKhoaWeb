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
router.get("/", getAllVat_LieuController);
router.get("/:id", getVat_LieuController);
router.post("/", createVat_LieuController);
router.put("/:id", updateVat_LieuController);

//********** ADMIN ROUTES ********//
router.delete("/:id", deleteVat_LieuController);

export default router;
