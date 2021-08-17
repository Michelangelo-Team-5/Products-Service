const products = require("../models/products.js");

module.exports = {
  getProducts: (req, res) => {
    products.getProducts(req.query, (err, records) => {
      if (err) {
        res.send(err);
      } else {
        res.send(records);
      }
    })
  },
  getProductInfo: (req, res) => {
    products.getProductInfo(req.params, (err, records) => {
      if (err) {
        res.send(err);
      } else {
        res.send(records);
      }
    })
  },
  getStyles: (req, res) => {
    products.getStyles(req.params, (err, records) => {
      if (err) {
        res.send(err);
      } else {
        res.send(records);
      }
    })
  },
  getRelated: (req, res) => {
    products.getRelated(req.params, (err, records) => {
      if (err) {
        res.send(err);
      } else {
        const related_products = [];
        for (let related of records) {
          related_products.push(related.related_product_id);
        }
        res.send(related_products);
      }
    })
  }
}