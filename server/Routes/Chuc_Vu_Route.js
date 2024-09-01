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
//********** ADMIN ROUTES ********//
router.post("/", protect, admin, createChuc_VuController);
router.put("/:id", protect, admin, updateChuc_VuController);
router.delete("/:id", protect, admin, deleteChuc_VuController);

export default router;
