import fs from "fs";
import path from "path";
import getFileName from "../utils/getFile.js";

// Crear objeto con la estructura de información de logs
const createLogInfo = () => {
  return {};
};
// Verificar si el archivo existe
const notFoundFile = (file) => {
  if (!fs.existsSync(file)) {
    return { message: "Archivo no encontrado" };
  }
};

// Analizar archivo de logs según el tipo
const analyzeFile = async (file, type) => {
  // TODO: Implementar lógica para analizar el archivo según el tipo
  const logInfo = createLogInfo();
  logInfo.file = path.basename(file);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(file, { encoding: "utf8" });

    readStream.on("data", (chunk) => {
      const lines = chunk.toString().split("\n");
      lines.forEach((line) => {
        const words = line.split(" ");
        logInfo.rows = (logInfo.rows || 0) + 1;
        if (words.includes(type) || words.includes(type.toUpperCase())) {
          logInfo[type + "s"] = logInfo[type + "s"] || [];
          logInfo[type + "s"].push(line);
        } else if (type === "summary") {
          logInfo.logs = logInfo.logs || [];
          logInfo.logs.push(line);
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

const analyzeLog = {
  // Obtener todos los archivos de logs
  getLogs: () => {
    const logInfo = createLogInfo();
    const folder = path.join(process.cwd(), "public", "logs");
    const files = fs.readdirSync(folder);
    logInfo.count = files.length;
    logInfo.files = files;
    if (files.length === 0) {
      return { message: "No existen archivos de logs" };
    }
    return logInfo;
  },

  // Obtener los errores de un archivo de logs
  getErrors: async (id) => {
    let file = getFileName(id);
    notFoundFile(file);
    // TODO: Implementar lógica para obtener los errores del archivo
    return await analyzeFile(file, "error");
  },

  // Obtener warnings de un archivo de logs
  getWarnings: async (id) => {
    let file = getFileName(id);
    notFoundFile(file);
    // TODO: Implementar lógica para obtener los errores del archivo
    return await analyzeFile(file, "warning");
  },

  // Obtener infos de un archivo de logs
  getInfos: async (id) => {
    let file = getFileName(id);
    notFoundFile(file);
    // TODO: Implementar lógica para obtener los errores del archivo
    return await analyzeFile(file, "info");
  },

  // Obtener el resumen de un archivo de logs
  getSummary: async (id) => {
    let file = getFileName(id);
    notFoundFile(file);
    // TODO: Implementar lógica para obtener los errores del archivo
    return await analyzeFile(file, "summary");
  },

  // Obtener porcentajes de tipos de logs en un archivo
  getStats: async (id) => {
    let file = getFileName(id);
    notFoundFile(file);
    // TODO: Implementar lógica para obtener los errores del archivo
    return await analyzeFile(file, "stats");
  },
};

export default analyzeLog;
