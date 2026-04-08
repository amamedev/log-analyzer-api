/**
 * Procesa los logs de un archivo
 */
import { Transform } from "stream";

const processLogs = (logInfo, type) => {
  console.log("Procesando logs...");
  return new Transform({
    async transform(chunk, encoding, callback) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const lines = chunk.toString().split("\n");
      lines.forEach((line) => {
        const words = line.split(" ");
        if (words.includes(type) || words.includes(type.toUpperCase())) {
          logInfo.data.rows = (logInfo.data.rows || 0) + 1;
          logInfo.data.logs.push(line);
        } else if (type === "summary") {
          logInfo.data.rows = (logInfo.data.rows || 0) + 1;
          logInfo.data.logs.push(line);
        }
      });
      callback();
    },
  });
};

export default processLogs;
