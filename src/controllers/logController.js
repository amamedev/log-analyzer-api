/**
 * Controlador para los logs
 */
import analyzeLog from "../services/analyzeLogFile.js";

const logController = {
  // Obtener todos los archivos de logs
  getLogs: (req, res) => {
    try {
      const logs = analyzeLog.getLogs();
      if (!logs) {
        return res.status(500).send("No se pudo analizar el archivo");
      }

      res.json(logs);
    } catch (error) {
      res.status(500).send("Error al obtener los logs");
    }
  },

  // Obtener tipos de logs de un archivo
  getTypes: async (req, res) => {
    try {
      const { id, type } = req.params;
      if (!type) {
        const logs = analyzeLog.getLogs();
        return res.status(200).json(logs);
      }
      const types = await analyzeLog.getTypes(id, type);
      res.status(200).json(types);
    } catch (error) {
      res.status(500).send("Error al obtener los tipos de logs");
    }
  },
};

export default logController;
