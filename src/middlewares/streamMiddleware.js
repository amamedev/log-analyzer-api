import { createReadStream, readFile } from "fs";
import path from "path";
import { pipeline, Transform } from "stream";
import { eventEmitter } from "../services/logger.js";

const streamMiddleware = (req, res, next) => {
  const data = path.join(process.cwd(), "data.json");
  const file = path.join(process.cwd(), "data.json");
  const readStream = createReadStream(data, "utf8");
  const writeStream = createReadStream(file, "utf8");

  pipeline(readStream, writeStream, (err) => {
    if (err) next(err);
  });
};

export default streamMiddleware;
