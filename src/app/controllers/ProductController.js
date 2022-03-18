const Product = require('../models/Product');

module.exports = {
  async index(req, res) {
    const products = await Product.findAll({
      include: ['product', 'ageGroup'],
    });

    return res.json(products);
  },

  async store(req, res) {
    const data = {
      ref, color, image_path, factory_id, cost, comments, age_id, gender_id
    } = req.body;

    if (!data.ref) {
      return res.status(400).json({ error: 'Ref is required!' });
    }

    const [productExists] = await Product.findOne({ where: { ref } });
    if (productExists) {
      return res.status(400).json({ error: `Product refence ${ref} already exists` });
    }

    const product = await Product.create(data);

    return res.json(product);
  },

  async show(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({ error: `Not found product by id: ${id}.` });
    }

    return res.json(product);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = {
      ref, color, image_path, factory_id, cost, comments, age_id, gender_id
    } = req.body;

    if (!data.ref) {
      return res.status(400).json({ error: 'Ref is required!' });
    }
    if (!data.color) {
      return res.status(400).json({ error: 'Ref is required!' });
    }
    if (!data.factory_id) {
      return res.status(400).json({ error: 'Ref is required!' });
    }
    if (!data.age_id) {
      return res.status(400).json({ error: 'Ref is required!' });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(400).json({ error: `Not found product by id: ${id}.` });
    }

    const [productExists] = await Product.findOne({ where: { name } });
    if (productExists && productExists.id !== id) {
      return res.status(400).json({ error: 'Product already exists!' });
    }

    product.ref = name;

    await product.save();

    return res.json(product);
  },

  async delete(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({ error: `Not found product by id: ${id}.` });
    }

    await product.destroy();

    return res.json(`Product ${product.ref} was successfully deleted.`);
  },
};

