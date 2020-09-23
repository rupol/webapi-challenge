const express = require("express");

const server = require("./server");

const actionRouter = require("./routers/action");
const projectRouter = require("./routers/project");

server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

const host = "localhost";
const port = 4000;

server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found"
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occurred, please try again later"
  });
});

server.listen(port, host, () => {
  console.log(`\n*** Server Running on http://${host}:${port} ***\n`);
});
