const express = require("express");

const db = require("../data/dbConfig.js");
const accountsRoutes = require("./routes/accountsRoute");

const server = express();
const baseUrl = "/api";

server.use(express.json());
server.use(`${baseUrl}`, accountsRoutes);

module.exports = server;
