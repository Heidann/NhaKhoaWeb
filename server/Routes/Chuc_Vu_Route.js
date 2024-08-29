import { Router } from "express";
import {
  getAllChuc_VuController,
  getChuc_VuController,
  createChuc_VuController,
  updateChuc_VuController,
  deleteChuc_VuController,
} from "../Controllers/Chuc_Vu_Controller.js";
import { protect } from "../middlewares/Auth.js";

const router = Router();

router.get("/", getAllChuc_VuController);
router.get("/:id", getChuc_VuController);
router.post("/", createChuc_VuController);
router.put("/:id", updateChuc_VuController);
router.delete("/:id", deleteChuc_VuController);

export default router;
