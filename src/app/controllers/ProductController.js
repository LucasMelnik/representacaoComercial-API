const Product = require('../models/Product');

module.exports = {
  async index(req, res) {
    const products = await Product.findAll({
      include: ['gender', 'ageGroup'],
    });

    return res.json(products);
  },

  // TODO: SET FACTORY NOT ALLOW NULL IN DATABASE
  // TODO: SET COST NOT ALLOW NULL IN DATABASE
  // TODO: NOT ALLOW TO CREATE THE SAME PRODUCT (REF, COLOR, FACTORY)
  async store(req, res) {
    const {
      ref, color, image_path, factory_id, cost, comments, age_id, gender_id,
    } = req.body;

    if (!ref) {
      return res.status(400).json({ error: 'Ref is required!' });
    }

    if (!color) {
      return res.status(400).json({ error: 'Color is required!' });
    }

    if (!factory_id) {
      return res.status(400).json({ error: 'factory_id is required!' });
    }

    if (!cost) {
      return res.status(440).json({ error: 'Cost is required!' });
    }

    const product = await Product.create({
      ref, color, image_path, factory_id, cost, comments, age_id, gender_id,
    });

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
    const {
      ref, color, image_path, factory_id, cost, comments, age_id, gender_id,
    } = req.body;

    if (!ref) {
      return res.status(400).json({ error: 'Ref is required!' });
    }

    if (!color) {
      return res.status(400).json({ error: 'Color is required!' });
    }

    if (!factory_id) {
      return res.status(400).json({ error: 'factory_id is required!' });
    }

    if (!cost) {
      return res.status(440).json({ error: 'Cost is required!' });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(400).json({ error: `Not found product by id: ${id}.` });
    }

    await product.update({
      ref, color, image_path, factory_id, cost, comments, age_id, gender_id,
    });

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
