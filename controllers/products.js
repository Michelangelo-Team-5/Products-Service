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
    products.getProductInfo(req.params, (err, product_info, product_features) => {
      if (err) {
        res.send(err);
      } else {
        product_info[0].features = product_features[0].json_agg;
        res.send(product_info[0]);
      }
    })
  },
  getStyles: (req, res) => {
    products.getStyles(req.params, (err, records) => {
      if (err) {
        res.send(err);
      } else {
        let styles = {};
        let results = [];

        for (let record of records) {
          results.push(record.json_build_object);
        }

        styles.product_id = req.params.product_id;
        styles.results = results;
        res.send(styles);
      }
    })
  },
  getRelated: (req, res) => {
    products.getRelated(req.params, (err, records) => {
      if (err) {
        res.send(err);
      } else {
        res.send(records[0].related_product_ids);
      }
    })
  }
}