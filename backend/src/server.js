require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`LoanTrack backend listening on port ${PORT}`);
});

// Retry PostgreSQL connection with exponential backoff.
// The HTTP server stays alive while PostgreSQL is unavailable.
async function connectToDatabase() {
  let retryDelay = 1000;
  const maxRetryDelay = 30000;

  while (true) {
    try {
      await pool.query("SELECT 1");

      console.log("Successfully connected to PostgreSQL");
      return;
    } catch (error) {
      console.error(
        `PostgreSQL connection failed: ${error.message}`
      );

      console.log(`Retrying in ${retryDelay / 1000} seconds...`);

      await new Promise((resolve) =>
        setTimeout(resolve, retryDelay)
      );

      retryDelay = Math.min(retryDelay * 2, maxRetryDelay);
    }
  }
}

// Handle unexpected idle-client errors from the pool
pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error.message);
});

// Start retry loop without blocking the HTTP server
connectToDatabase();

// Graceful shutdown
async function shutdown(signal) {
  console.log(`${signal} received. Shutting down...`);

  server.close(async () => {
    try {
      await pool.end();
      console.log("Database pool closed");
      process.exit(0);
    } catch (error) {
      console.error("Error closing database pool:", error);
      process.exit(1);
    }
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
