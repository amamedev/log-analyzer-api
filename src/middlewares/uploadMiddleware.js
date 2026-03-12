import multer from "multer";
import path from "path";
import fs from "fs";
const date = new Date();

const uploadMiddleware = async (req, res, next) => {
  // TODO: Implementar lógica para subir archivos
  console.log("Subiendo archivo...");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const folder = path.join(process.cwd(), "public", "logs");
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      if (file.mimetype !== "text/plain") {
        return cb(res.status(400).send("El archivo debe ser de tipo texto"));
      }
      cb(
        null,
        `[${date
          .toLocaleDateString()
          .replace(
            /\//g,
            "-",
          )}][${date.toLocaleTimeString()}]${file.originalname.slice(0, -4)}-log-.txt`,
      );
    },
  });
  const upload = multer({ storage });
  upload.single("log")(req, res, (err) => {
    if (err) {
      return res.status(500).send("Error al subir el archivo");
    }
    console.log("Archivo subido");
    next();
  });
};

export default uploadMiddleware;
