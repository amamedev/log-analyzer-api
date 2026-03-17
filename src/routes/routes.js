import logController from "../controllers/logController.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import { Router } from "express";
const router = Router();

router.get("/logs", logController.getLogs);
router.get("/:id/errors", logController.getErrors);
router.get("/:id/summary", logController.getSummary);
router.post("/logs", uploadMiddleware);

export default router;
