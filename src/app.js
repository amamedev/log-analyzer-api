import express from "express";
import router from "./routes/routes.js";
import createLogFolder from "./utils/createLogFolder.js";

// Crear carpeta logs si no existe al iniciar la aplicación
createLogFolder();

// Configuración básica
const app = express();

app.use("/logAnalizer", router);

app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

export default app;
