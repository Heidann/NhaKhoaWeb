import { Router } from "express";
import {
  getAllChuc_VuController,
  getChuc_VuController,
  createChuc_VuController,
  updateChuc_VuController,
  deleteChuc_VuController,
} from "../Controllers/Chuc_Vu_Controller.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = Router();
//********** PUBLIC ROUTES ********//
//********** PRIVATE ROUTES ********//
router.get("/", protect, getAllChuc_VuController);
router.get("/:id", protect, getChuc_VuController);
router.post("/", protect, createChuc_VuController);
router.put("/:id", protect, updateChuc_VuController);
//********** ADMIN ROUTES ********//
router.delete("/:id", protect, deleteChuc_VuController);

export default router;
