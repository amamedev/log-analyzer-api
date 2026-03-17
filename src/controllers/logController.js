import analyzeLog from "../services/analyzeLogFile.js";

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
      const { id } = req.params;
      const errors = await analyzeLog.getErrors(id);
      res.json(errors);
    } catch (error) {
      next(error);
    }
  },
  // Obtener el resumen de un archivo de logs
  getSummary: async (req, res, next) => {
    try {
      const { id } = req.params;
      const summary = await analyzeLog.getSummary(id);
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
