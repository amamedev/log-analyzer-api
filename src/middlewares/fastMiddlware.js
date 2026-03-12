import { eventEmitter } from "../services/logger.js";

const fastMiddleware = (req, res, next) => {
  eventEmitter.emit("middlewareRapido", "Middleware rápido");
  next();
};

export default fastMiddleware;
