import express from "express";
import uploadMiddleware from "./middlewares/uploadMiddleware.js";
import processMiddleware from "./services/analyzeLogFile.js";
import router from "./routes/routes.js";

const app = express();

app.use("/logAnalizer", router);

app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

export default app;
