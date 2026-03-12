import express from "express";
import slowMiddleware from "./middlewares/slowMiddleware.js";
import fastMiddleware from "./middlewares/fastMiddlware.js";
import readMiddleware from "./middlewares/readMiddleware.js";
import { loopMiddleware } from "./middlewares/loopMiddleware.js";
import streamMiddleware from "./middlewares/streamMiddleware.js";
import uploadMiddleware from "./middlewares/uploadMiddleware.js";
import processMiddleware from "./middlewares/processMiddleware.js";

const app = express();

app.get("/test1", slowMiddleware, (req, res) => {
  res.send("Este se resuelve después");
});

app.get("/test2", fastMiddleware, (req, res) => {
  res.send(
    "Esta petición se resuelve antes, mientras acaba de resolverse la otra",
  );
});

app.get("/transform", streamMiddleware, (req, res) => {});

app.post(
  "/upload-log-file",
  uploadMiddleware,
  processMiddleware,
  (req, res) => {},
);

app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

export default app;
