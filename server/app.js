const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { createRequireUser } = require("./auth");
const qrCodeRoutes = require("./routes/QRCode");

const allowedOrigins = [
  "https://codereader.app",
  "https://www.codereader.app",
  "http://localhost:3010",
  "http://127.0.0.1:3010",
  "capacitor://localhost",
  "ionic://localhost",
  "http://localhost",
  "https://localhost",
];

function createApp({ verifyToken } = {}) {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );
  app.use(express.json({ limit: "32kb" }));
  app.use(express.urlencoded({ extended: false, limit: "32kb" }));

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(null, false);
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      maxAge: 600,
    })
  );

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/", (_req, res) => {
    res.json({ app: "running" });
  });

  app.use(
    "/api",
    rateLimit({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: "Too many requests" },
    })
  );
  app.use("/api/QRCode", createRequireUser(verifyToken), qrCodeRoutes);

  app.use((err, _req, res, _next) => {
    if (err.type === "entity.parse.failed") {
      res.status(400).json({ error: "Invalid JSON" });
      return;
    }
    if (err.type === "entity.too.large") {
      res.status(413).json({ error: "Payload too large" });
      return;
    }
    console.error("request failed");
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

module.exports = { createApp, allowedOrigins };
