const express = require("express");
const logger = require("./middleware/logger");

const server = express();

server.use(logger());

server.get("/", (req, res) => {
  res.send(`
  <h1>Welcome to our API</h1>
  `);
});

module.exports = server;
