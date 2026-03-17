import multer from "multer";
import path from "path";
import fs from "fs";

const uploadMiddleware = async (req, res, next) => {
  // TODO: Implementar lógica para subir archivos
  const folder = path.join(process.cwd(), "public", "logs");
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  const files = fs.readdirSync(folder);
  let ID = `00${files.length + 1}`;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      if (file.mimetype !== "text/plain") {
        return cb(res.status(400).send("El archivo debe ser de tipo texto"));
      }
      cb(null, `logFile-${ID}.txt`);
    },
  });
  const upload = multer({ storage });
  upload.single("log")(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error al subir el archivo",
      });
    }
    return res.status(200).json({
      message: "Archivo subido correctamente",
      fileID: ID,
    });
  });
};

export default uploadMiddleware;
