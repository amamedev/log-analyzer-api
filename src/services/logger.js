import EventEmitter from "events";

export const eventEmitter = new EventEmitter();

eventEmitter.on("middlewareRapido", (message) => {
  console.log(message);
});

eventEmitter.on("middlewareLento", (message) => {
  console.log(message);
});

eventEmitter.on("streamMiddleware", (chunk) => {
  console.log(process.memoryUsage().heapUsed.toString());
});
