const pgp = require("pg-promise")({});
const db = pgp("postgresql://postgres:pineapple@localhost:5432/products");

try {
  db.connect();
} catch (err) {
  console.log("Could Not Connect To Database");
}

module.exports = db;