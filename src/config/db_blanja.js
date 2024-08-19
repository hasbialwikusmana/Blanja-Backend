const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

// Hosting PostgreSQL
// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   connectionString: "postgres://default:uczaPF5NWZf0@ep-restless-scene-28667671-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
// });

pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgreSQL Successfully!");
});

module.exports = pool;
