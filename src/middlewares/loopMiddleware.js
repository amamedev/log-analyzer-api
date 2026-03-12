export const loopMiddleware = async (req, res, next) => {
  console.log("start");

  setTimeout(() => console.log("timeout"), 2000);

  await new Promise((resolve) => {
    console.log("promise");
    resolve();
  });

  process.nextTick(() => setTimeout(() => console.log("nextTick"), 3000));

  setImmediate(() => console.log("immediate"));

  console.log("end");

  next();
};
