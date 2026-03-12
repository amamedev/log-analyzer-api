import analyzeLogFile from "../services/analyzeLogFile.js";

const logController = {
  analizeLog: async (req, res, next) => {
    try {
      const analyzeLog = await analyzeLogFile(req.file.filename, req.body.type);
      if (!analyzeLog) {
        return res.status(500).send("No se pudo analizar el archivo");
      }

      res.json(analyzeLog);
    } catch (error) {
      next(error);
    }
  },
};

export default logController;
