const db = require("../db.js");

module.exports = {
  getProducts: async (params, callback) => {
    const { page=1, count=5 } = params;
    const start_idx = (page*5)-5;
    const queryStr = `SELECT * FROM product_inventory WHERE id > ${start_idx} LIMIT ${count}`;
    try {
      const products = await db.query(queryStr);
      callback(null, products);
    } catch (err) {
      console.log(err);
    }
  },
  getProductInfo: async (params, callback) => {
    const { product_id } = params;
    const productQuery = `SELECT * FROM product_inventory WHERE id=${product_id} LIMIT 1`
    const featureQuery = `SELECT feature, "value" FROM product_features WHERE product_id=${product_id}`;
    try {
      const product = await db.query(productQuery);
      const product_features = await db.query(featureQuery);
      const result = {product, product_features};
      callback(null, result);
    } catch (err) {
      console.log(err);
    }
  },
  getStyles: async (params, callback) => {
    const { product_id } = params;
    const styleQuery = `SELECT * FROM product_inventory WHERE id=${product_id} LIMIT 1`
    const photoQuery = `SELECT feature, value FROM product_features WHERE product_id=${product_id}`;
    const skuQuery = `SELECT id, size, quantity FROM skus WHERE product_id=${product_id}`;
    try {
      const styles = await db.query(styleQuery);
      const photos = await db.query(photoQuery);
      const skus = await db.query(skuQuery);

      const result = {styles, photos, skus};
      callback(null, result);
    } catch (err) {
      console.log(err);
    }
  },
  getRelated: async (params, callback) => {
    const { product_id } = params;
    const queryStr = `SELECT related_product_id FROM related_products WHERE current_product_id=${product_id}`;
    try {
      const related_products = await db.query(queryStr);
      callback(null, related_products);
    } catch (err) {
      console.log(err);
    }
  }
}
