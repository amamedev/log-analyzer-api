import fs from "fs";
import path from "path";

const analyzeLogFile = async (filename, type) => {
  // Implementar lógica para procesar el archivo
  const file = path.join(process.cwd(), "public", "logs", filename);
  if (!fs.existsSync(file)) {
    return { message: "Archivo no encontrado" };
  }

  return await new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(file);
    const logInfo = {};
    const types = ["INFO", "ERROR", "WARNING"];

    readStream.on("data", (chunk) => {
      const lines = chunk.toString().split("\n");
      lines.forEach((line) => {
        const words = line.split(" ");
        if (!types.includes(words[0])) {
          return { message: "Tipo de log no válido" };
        }
        const key = words[0].toLowerCase();
        if (type && type === key) {
          logInfo[key] = (logInfo[key] || 0) + 1;
          logInfo[`${key}s`] = logInfo[`${key}s`] || [];
          logInfo[`${key}s`].push(line);
        } else if (!type) {
          logInfo[key] = (logInfo[key] || 0) + 1;
          logInfo[`${key}s`] = logInfo[`${key}s`] || [];
          logInfo[`${key}s`].push(line);
        }
      });
    });

    readStream.on("end", () => {
      resolve(logInfo);
    });

    readStream.on("error", (error) => {
      reject(error);
    });
  });
};

export default analyzeLogFile;
