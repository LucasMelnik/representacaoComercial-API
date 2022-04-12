const Product = require('../models/Product');

module.exports = {
  async index(req, res) {
    const products = await Product.findAll({
      include: ['gender', 'ageGroup', 'factory'],
    });

    return res.json(products);
  },

  // TODO: SET FACTORY NOT ALLOW NULL IN DATABASE
  // TODO: VERIFY IF FACTORY, AGE GROUP AND GENDER EXISTS BEFORE TRY TO CREATE UR UPDATE A PRODUCT
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

    if (!age_id) {
      return res.status(400).json({ error: 'age_id is required!' });
    }

    if (!gender_id) {
      return res.status(400).json({ error: 'gender_id is required!' });
    }

    const productExists = await Product.findOne({ where: { ref, color, factory_id } });
    if (productExists) {
      return res.status(400).json({ error: `Product refence ${ref} with color ${color} from factory ${factory_id} already exists` });
    }

    const product = await Product.create({
      ref, color, image_path, factory_id, cost, comments, age_id, gender_id,
    });

    return res.json(product);
  },

  async show(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: ['gender', 'ageGroup', 'factory'],
    });

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

    if (!age_id) {
      return res.status(400).json({ error: 'age_id is required!' });
    }

    if (!gender_id) {
      return res.status(400).json({ error: 'gender_id is required!' });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(400).json({ error: `Not found product by id: ${id}.` });
    }
    const productExists = await Product.findOne({ where: { ref, color, factory_id } });
    if (productExists && productExists.id !== product.id) {
      return res.status(400).json({ error: `Product refence ${ref} with color ${color} from factory ${factory_id} already exists` });
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

    return res.json(`Product ${product.id} was successfully deleted.`);
  },
};
