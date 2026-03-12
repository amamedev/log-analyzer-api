import fs from "fs";
import path from "path";

const processMiddleware = async (req, res, next) => {
  // TODO: Implementar lógica para procesar el archivo

  const file = path.join(process.cwd(), "public", "logs", req.file.filename);
  if (!fs.existsSync(file)) {
    return res.status(404).send("Archivo no encontrado");
  }
  console.log("Procesando archivo...");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const readStream = fs.createReadStream(file);
  const logInfo = {};

  readStream.on("data", (chunk) => {
    const lines = chunk.toString().split("\n");
    lines.forEach((line) => {
      const words = line.split(" ");
      switch (req.body.type) {
        case "info":
          if (words[0] === "INFO") {
            logInfo.info = (logInfo.info || 0) + 1;
            logInfo.infos = [...(logInfo.infos || []), line];
          }
          break;
        case "error":
          if (words[0] === "ERROR") {
            logInfo.count = (logInfo.count || 0) + 1;
            logInfo.errors = [...(logInfo.errors || []), line];
          }
          break;
        case "warning":
          if (words[0] === "WARNING") {
            logInfo.warning = (logInfo.warning || 0) + 1;
            logInfo.warnings = [...(logInfo.warnings || []), line];
          }
          break;
        default:
          logInfo.info = (logInfo.info || 0) + 1;
          logInfo.error = (logInfo.error || 0) + 1;
          logInfo.warning = (logInfo.warning || 0) + 1;
          break;
      }
    });
    res.json(logInfo);
  });
  console.log("Archivo procesado, enviando información al cliente...");
  next();
};

export default processMiddleware;
