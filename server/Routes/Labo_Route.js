import { Router } from "express";
import {
  getAllLaboController,
  getLaboController,
  createLaboController,
  updateLaboController,
  deleteLaboController,
} from "../Controllers/Labo_Controller.js";
import { admin, protect } from "../middlewares/Auth.js";
const router = Router();
//********** PUBLIC ROUTES ********//
//********** PRIVATE ROUTES ********//
router.get("/", protect, getAllLaboController);
router.get("/:id", protect, getLaboController);
router.post("/", protect, createLaboController);
router.put("/:id", protect, updateLaboController);
router.delete("/:id", protect, deleteLaboController);
//********** ADMIN ROUTES ********//

export default router;
