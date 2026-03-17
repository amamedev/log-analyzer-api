import analyzeLog from "../services/analyzeLogFile.js";

const getID = (req) => {
  const { id } = req.params;
  return id;
};

const logController = {
  // Obtener todos los archivos de logs
  getLogs: (req, res, next) => {
    try {
      const logs = analyzeLog.getLogs();
      if (!logs) {
        return res.status(500).send("No se pudo analizar el archivo");
      }

      res.json(logs);
    } catch (error) {
      next(error);
    }
  },
  // Obtener los errores de un archivo de logs
  getErrors: async (req, res, next) => {
    try {
      const errors = await analyzeLog.getErrors(getID(req));
      res.json(errors);
    } catch (error) {
      next(error);
    }
  },
  // Obtener los warnings de un archivo de logs
  getWarnings: async (req, res, next) => {
    try {
      const warnings = await analyzeLog.getWarnings(getID(req));
      res.json(warnings);
    } catch (error) {
      next(error);
    }
  },
  // Obtener los infos de un archivo de logs
  getInfos: async (req, res, next) => {
    try {
      const infos = await analyzeLog.getInfos(getID(req));
      res.json(infos);
    } catch (error) {
      next(error);
    }
  },
  // Obtener el resumen de un archivo de logs
  getSummary: async (req, res, next) => {
    try {
      const summary = await analyzeLog.getSummary(getID(req));
      res.json(summary);
    } catch (error) {
      if (error["code"] === "ENOENT") {
        return res.status(404).json({ message: "El archivo de log no existe" });
      }
      next(error);
    }
  },
};

export default logController;
