const Product = require('../models/Product');

module.exports = {
  async index(req, res) {
    const products = await Product.findAll({
      include: ['gender', 'ageGroup'],
    });

    return res.json(products);
  },

  async store(req, res) {
    const data = {
      ref, color, image_path, factory_id, cost, comments, age_id, gender_id
    } = req.body;

    const [productExists] = await Product.findOne({ where: { ref } });
    if (productExists) {
      return res.status(400).json({ error: `Product refence ${ref} already exists` });
    }

    const product = await Product.create(data);

    return res.json(product);
  },
};
