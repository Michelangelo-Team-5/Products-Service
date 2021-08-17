const express = require("express");
const router = express.Router();
const controller = require("./controllers/products");
const db = require("./db.js");

router.get("/:product_id", controller.getProductInfo);

router.get("/:product_id/styles", controller.getStyles);

router.get("/:product_id/related", controller.getRelated);

router.get("/:page?/:count?", controller.getProducts)

module.exports = router;