const express = require("express");

const server = require("./server");

const actionRouter = require("./routers/action");
const projectRouter = require("./routers/project");

server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

const host = "localhost";
const port = 4000;

server.listen(port, host, () => {
  console.log(`\n*** Server Running on http://${host}:${port} ***\n`);
});
