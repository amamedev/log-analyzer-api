/**
 * Lee un archivo de logs y retorna un stream de lectura
 */
import fs from "fs";

const readFileStream = (file) => {
  const readStream = fs.createReadStream(file, { encoding: "utf8" });
  return readStream;
};

export default readFileStream;
