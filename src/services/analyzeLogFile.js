/**
 * Servicio para analizar archivos de logs
 */

import fs from "fs";
import path from "path";
import getFileName from "../utils/getFile.js";
import readFileStream from "../utils/fileReader.js";
import processLogs from "../utils/processLogs.js";

// Función para analizar un archivo de logs (posible refactorización futura)
const analyzeFile = async (file, type) => {
  const logInfo = {
    file: path.basename(file),
    data: {
      type: type,
      rows: 0,
      logs: [],
    },
  };

  return new Promise((resolve, reject) => {
    const readStream = readFileStream(file);
    const transformStream = processLogs(logInfo, type);
    readStream
      .pipe(transformStream)
      .on("end", () => {
        console.log("Archivo procesado");
        resolve(logInfo);
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .resume();
  });
};

/**
 * Servicio para analizar archivos de logs
 */
const analyzeLog = {
  // Obtener todos los archivos de logs
  getLogs: () => {
    const logInfo = {};
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
  getTypes: async (id, type) => {
    // Buscamos el archivo
    let file = getFileName(id);
    if (!fs.existsSync(file)) {
      return { message: "Archivo no encontrado" };
    }

    // Validamos el tipo de log
    const logTypes = ["error", "warning", "info", "summary"];
    if (!logTypes.includes(type)) {
      return { message: "Tipo de log no válido" };
    }

    // Implementar lógica para obtener los errores del archivo
    return await analyzeFile(file, type);
  },
};

export default analyzeLog;
