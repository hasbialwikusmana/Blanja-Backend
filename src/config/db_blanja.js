const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});
pool.connect((err) => {
  if (err) {
    console.log("Database not connected");
  } else {
    console.log(`Database connected on ${process.env.PGDATABASE}`);
  }
});

module.exports = pool;
