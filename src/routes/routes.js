import logController from "../controllers/logController.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import { Router } from "express";
const router = Router();

router.get("/logs", logController.getLogs);
router.get("/logs/:id/:type", logController.getTypes);
router.post("/logs", uploadMiddleware);

export default router;
