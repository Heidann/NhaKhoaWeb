import { Router } from "express";
import {
  getAllLaboController,
  getLaboController,
  createLaboController,
  updateLaboController,
  deleteLaboController,
} from "../Controllers/Labo_Controller.js";

const router = Router();

router.get("/", getAllLaboController);
router.get("/:id", getLaboController);
router.post("/", createLaboController);
router.put("/:id", updateLaboController);
router.delete("/:id", deleteLaboController);

export default router;
