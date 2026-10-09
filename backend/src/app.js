const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");

const userRoutes = require("./routes/userRoutes");

const app = express();

// ── Middleware ──────────────────────────────────────
app.use(helmet());
const clientOrigin = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.trim().replace(/\/+$/, "")
  : "http://localhost:5173";

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Routes ──────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "🚀 NEXORA API is running..." });
});

app.use("/api/users", userRoutes);

// ── Global Error Handler ────────────────────────────
app.use(errorHandler);

module.exports = app;
