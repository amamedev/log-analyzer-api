import path from "path";

const getFileName = (id) => {
  const file = path.join(process.cwd(), "public", "logs", `logFile-${id}.txt`);
  return file;
};

export default getFileName;
