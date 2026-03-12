import { eventEmitter } from "../services/logger.js";

const slowMiddleware = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 8000));
  eventEmitter.emit("middlewareLento", "Middleware lento");
  next();
};

export default slowMiddleware;
