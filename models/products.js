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
      callback(err);
    }
  },
  getProductInfo: async (params, callback) => {
    const { product_id } = params;
    const productQuery = `SELECT * FROM product_inventory WHERE id=${product_id} LIMIT 1`
    const featureQuery = `SELECT json_agg(product_features)
                          FROM (
                            SELECT feature, value FROM product_features WHERE product_id=${product_id}
                          ) as product_features`;
    try {
      const product = await db.query(productQuery);
      const product_features = await db.query(featureQuery);
      callback(null, product, product_features);
    } catch (err) {
      callback(err);
    }
  },
  getStyles: async (params, callback) => {
    const { product_id } = params;
    const queryStr = `SELECT json_build_object('style_id', style_id, 'name', name, 'sale_price', sale_price, 'original_price', original_price, 'default?', "default?", 'photos',
                        (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) FROM product_photos WHERE product_photos.style_id=product_styles.style_id),
                        'skus',
                        (SELECT json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) FROM skus WHERE skus.style_id=product_styles.style_id)
                        )
                      FROM product_styles
                      WHERE product_styles.product_id=${product_id}`;
    try {
      const result = await db.query(queryStr);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  getRelated: async (params, callback) => {
    const { product_id } = params;
    const queryStr = `SELECT array_agg (related_product_id) as related_product_ids
                      FROM related_products
                      WHERE current_product_id=${product_id}`;
    try {
      const related_products = await db.query(queryStr);
      callback(null, related_products);
    } catch (err) {
      callback(err);
    }
  }
}
