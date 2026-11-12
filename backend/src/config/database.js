const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Maximum number of connections in the pool
  max: 10,

  // Close idle connections after 30 seconds
  idleTimeoutMillis: 30000,

  // Wait up to 5 seconds for a connection
  connectionTimeoutMillis: 5000,
});

module.exports = pool;
