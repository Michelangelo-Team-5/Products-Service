const pgp = require("pg-promise")({});
const db = pgp("postgresql://postgres:pineapple@localhost:5432/products");

db.connect();

module.exports = db;
// const Pool = require("pg").Pool;

// const pool = new Pool ({
//   user: "postgres",
//   password: "pineapple",
//   host: "localhost",
//   port: 5432,
//   database: "products"
// });

// module.exports = pool;
