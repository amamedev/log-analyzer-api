import fs from "fs";
import path from "path";
import { pipeline, Transform } from "stream";
const filePath = path.join(process.cwd(), "src", "public", "texto.txt");

export default function readMiddleware(req, res, next) {
  const readTransform = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase());
    },
  });
  pipeline(fs.createReadStream(filePath), readTransform, res, (err) => {
    if (err) {
      next(err);
    }
  });
}
