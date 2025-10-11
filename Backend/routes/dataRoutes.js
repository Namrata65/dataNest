import express from "express";
import { getAll, addRow, updateRow, deleteRow } from "../controllers/dataController.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", addRow);
router.put("/", updateRow);
router.delete("/", deleteRow);

export default router;
