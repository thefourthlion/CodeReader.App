const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3011;
const { connectDB } = require("./config/database");
require("dotenv").config({ path: "./.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration - allow web, mobile (Capacitor), and production
const allowedOrigins = [
  "http://localhost:3010",
  "http://localhost:3011",
  "https://codereader.app",
  "https://api.codereader.app",
  "capacitor://localhost",  // Capacitor iOS
  "http://localhost",       // Capacitor Android
  "ionic://localhost",      // Ionic apps
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Connect to database
connectDB();

app.get("/", (req, res) => {
  res.json({ app: "running" });
});

// Routes
app.use("/api/QRCode", require("./routes/QRCode"));

// Bind to 0.0.0.0 to allow connections from Android emulator (10.0.2.2)
app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Listening on port " + PORT + " (0.0.0.0)");
});