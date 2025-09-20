import { log } from "./logger.js";

export function requestLogger(req, res, next) {
  log("backend", "info", "express", `Request: ${req.method} ${req.url}`);
  next();
}

export function errorLogger(err, req, res, next) {
  log("backend", "error", "express", `${err.message}`);
  res.status(500).json({ error: "Internal Server Error" });
}
