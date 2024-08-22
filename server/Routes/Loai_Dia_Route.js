import { Router } from "express";
import {
  getAllLoai_DiaController,
  getLoai_DiaController,
  createLoai_DiaController,
  updateLoai_DiaController,
  deleteLoai_DiaController,
} from "../Controllers/Loai_Dia_Controller.js";

const router = Router();

router.get("/", getAllLoai_DiaController);
router.get("/:id", getLoai_DiaController);
router.post("/", createLoai_DiaController);
router.put("/:id", updateLoai_DiaController);
router.delete("/:id", deleteLoai_DiaController);

export default router;
