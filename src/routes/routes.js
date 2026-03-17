import logController from "../controllers/logController.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import { Router } from "express";
const router = Router();

router.get("/logs", logController.getLogs);
router.get("/logs/:id/errors", logController.getErrors);
router.get("/logs/:id/warnings", logController.getWarnings);
router.get("/logs/:id/infos", logController.getInfos);
router.get("/logs/:id/summary", logController.getSummary);
router.post("/logs", uploadMiddleware);

export default router;
