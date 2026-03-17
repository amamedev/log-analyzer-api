import path from "path";
import fs from "fs";

const createLogFolder = () => {
  const folder = path.join(process.cwd(), "public", "logs");
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  return folder;
};

export default createLogFolder;
