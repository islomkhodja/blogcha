const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const logger = require("morgan");
import api from "./routes";

const app = express();

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(allowCrossDomain);

app.use("/api", api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: Error | any, req, res, next) {
  console.log("default error handler", err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === "development" ? err : {};

  console.log("locals env", res.locals.error);

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message, stack: err.stack, name: err.name });
});

export default app;
