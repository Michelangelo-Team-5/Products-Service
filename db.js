const pgp = require("pg-promise")();
const config = require("./config.js");

const options = {
  host: `${config.host}`,
  port: 5432,
  database: 'products',
  user: 'postgres',
  password: `${config.password}`
};

const db = pgp(options);

try {
  db.connect();
} catch (err) {
  console.log("Could Not Connect To Database")
}

module.exports = db;