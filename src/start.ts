#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "./app";
const debug = require("debug")("blogen-admin-blog:server");
const http = require("http");
const db = require("./lib/db");
import { Model } from "objection";

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
let server;
console.log("go querying");
db.select(db.raw("1")).then((result) => {
  console.log(result);
  Model.knex(db);
  server = http.createServer(app);

  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
});

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

  console.log("works! http://localhost:" + port + "/api");
  debug("Listening on " + bind);
}
