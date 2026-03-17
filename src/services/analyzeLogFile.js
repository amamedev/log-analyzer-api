import fs from "fs";
import path from "path";

const createLogInfo = () => {
  return {
    count: 0,
  };
};

const notFoundFile = (file) => {
  if (!fs.existsSync(file)) {
    return { message: "Archivo no encontrado" };
  }
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
    const logInfo = createLogInfo();
    const file = path.join(
      process.cwd(),
      "public",
      "logs",
      `logFile-${id}.txt`,
    );
    notFoundFile(file);
    // TODO: Implementar lógica para obtener los errores del archivo
    logInfo.file = path.basename(file);
    return await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(file, { encoding: "utf8" });

      readStream.on("data", (chunk) => {
        const lines = chunk.toString().split("\n");
        lines.forEach((line) => {
          const words = line.split(" ");
          if (words.includes("error") || words.includes("ERROR")) {
            logInfo.count = (logInfo.count || 0) + 1;
            logInfo.errors = logInfo.errors || [];
            logInfo.errors.push(line);
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
  },
  // Obtener warnings de un archivo de logs
  getWarnings: async (id) => {
    const logInfo = createLogInfo();
    const file = path.join(
      process.cwd(),
      "public",
      "logs",
      `logFile-${id}.txt`,
    );
    notFoundFile(file);
    // TODO: Implementar lógica para obtener los warnings del archivo
    logInfo.file = path.basename(file);
    return await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(file, { encoding: "utf8" });

      readStream.on("data", (chunk) => {
        const lines = chunk.toString().split("\n");
        lines.forEach((line) => {
          const words = line.split(" ");
          if (words.includes("warning") || words.includes("WARNING")) {
            logInfo.count = (logInfo.count || 0) + 1;
            logInfo.warnings = logInfo.warnings || [];
            logInfo.warnings.push(line);
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
  },
  // Obtener infos de un archivo de logs
  getInfos: async (id) => {
    const logInfo = createLogInfo();
    const file = path.join(
      process.cwd(),
      "public",
      "logs",
      `logFile-${id}.txt`,
    );
    notFoundFile(file);
    // TODO: Implementar lógica para obtener los infos del archivo
    logInfo.file = path.basename(file);
    return await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(file, { encoding: "utf8" });

      readStream.on("data", (chunk) => {
        const lines = chunk.toString().split("\n");
        lines.forEach((line) => {
          const words = line.split(" ");
          if (words.includes("info") || words.includes("INFO")) {
            logInfo.count = (logInfo.count || 0) + 1;
            logInfo.infos = logInfo.infos || [];
            logInfo.infos.push(line);
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
  },
  // Obtener el resumen de un archivo de logs
  getSummary: async (id) => {
    const logInfo = createLogInfo();
    const file = path.join(
      process.cwd(),
      "public",
      "logs",
      `logFile-${id}.txt`,
    );
    notFoundFile(file);
    // TODO: Implementar lógica para obtener el resumen del archivo
    logInfo.file = path.basename(file);
    return await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(file, { encoding: "utf8" });
      readStream.on("data", (chunk) => {
        const lines = chunk.toString().split("\n");
        lines.forEach((line) => {
          logInfo.count = (logInfo.count || 0) + 1;
          logInfo.logs = logInfo.logs || [];
          logInfo.logs.push(line);
        });
      });

      readStream.on("end", () => {
        resolve(logInfo);
      });

      readStream.on("error", (error) => {
        reject(error);
      });
    });
  },
};

export default analyzeLog;
