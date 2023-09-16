const express = require("express");
const promMiddleware = require("express-prometheus-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

// Middleware for Prometheus metrics
app.use(
  promMiddleware({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
  })
);

// Middleware for Authorization
app.use((req, res, next) => {
  if (req.headers.authorization === "mysecrettoken") {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
});

// GET /time endpoint
app.get("/time", (req, res) => {
  const epochTime = Math.floor(Date.now() / 1000);
  res.json({ epoch: epochTime });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(5000, () => {
    console.log("API is running on http://localhost:5000");
  });
}

module.exports = app;
