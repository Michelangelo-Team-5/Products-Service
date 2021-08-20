require("newrelic");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db.js");
const controller = require("./controllers/products");

const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

// router
const router = require("./routes.js");

// routes
app.use("/products", router);

app.get("*", (req, res) => {
  res.status(400);
})

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
})