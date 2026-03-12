import logController from "../controllers/logController.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import { Router } from "express";
const router = Router();

router.post("/upload", uploadMiddleware, logController.analizeLog);

export default router;
