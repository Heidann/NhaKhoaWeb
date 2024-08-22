import { Router } from "express";
import {
  getAllVat_LieuController,
  getVat_LieuController,
  createVat_LieuController,
  updateVat_LieuController,
  deleteVat_LieuController,
} from "../Controllers/Vat_Lieu_Controller.js";

const router = Router();

router.get("/", getAllVat_LieuController);
router.get("/:id", getVat_LieuController);
router.post("/", createVat_LieuController);
router.put("/:id", updateVat_LieuController);
router.delete("/:id", deleteVat_LieuController);

export default router;
