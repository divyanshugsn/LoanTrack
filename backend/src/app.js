const express = require("express");
const cors = require("cors");
const pool = require("./config/database");
const loanRoutes = require("./routes/loan.route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Loan routes
app.use("/loans", loanRoutes);

// Liveness check: does not depend on PostgreSQL
app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "alive",
    message: "LoanTrack backend is running",
  });
});

// Readiness check: verifies PostgreSQL connectivity
app.get("/readyz", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "ready",
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "not ready",
      database: "disconnected",
    });
  }
});

module.exports = app;
