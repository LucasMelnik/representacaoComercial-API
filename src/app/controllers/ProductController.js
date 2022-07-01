const { Op } = require('sequelize');
const Colors = require('../models/Colors');
const Product = require('../models/Product');
const ProductPrice = require('../models/ProductPrice');

module.exports = {
  async index(req, res) {
    const { factory_id, ref } = req.query;

    const whereCondition = {
      ...(factory_id && factory_id.length && { factory_id }),
      ...(ref && ref.length && {
        ref: {
          [Op.like]: `%${ref}%`,
        },
      }),
    };
    console.log(whereCondition);
    const products = await Product.findAll({
      include: ['gender', 'ageGroup', 'factory', 'colors'],
      where: whereCondition,
    });

    return res.json(products);
  },

  // TODO: SET FACTORY NOT ALLOW NULL IN DATABASE
  // TODO: VERIFY IF FACTORY, AGE GROUP AND GENDER EXISTS BEFORE TRY TO CREATE UR UPDATE A PRODUCT
  async store(req, res) {
    const {
      ref, colors, image_path, factory_id, cost, comments, age_id, gender_id, productPrices,
    } = req.body;

    if (!ref) {
      return res.status(400).json({ error: 'Ref is required!' });
    }

    if (!colors.length) {
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

    const productExists = await Product.findOne({ where: { ref, factory_id } });
    if (productExists) {
      return res.status(400).json({ error: `Product refence ${ref}  from factory ${factory_id} already exists` });
    }

    const product = await Product.create({
      ref, color: 'jorge', image_path, factory_id, cost, comments, age_id, gender_id,
    });
    const colorsObj = colors.map((color) => ({ name: color, product_id: product.getDataValue('id') }));
    const productPriceObj = productPrices.map((productPrice) => ({
      price: productPrice.price,
      payment_condition_id: productPrice.condition_id,
      commission_id: productPrice.commission_id,
      product_id: product.getDataValue('id'),
    }));
    Colors.bulkCreate(colorsObj, { ignoreDuplicates: true });
    ProductPrice.bulkCreate(productPriceObj, { ignoreDuplicates: true });

    return res.json(product);
  },

  async show(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: ['gender', 'ageGroup', 'factory', 'colors'],
    });

    if (!product) {
      return res.status(400).json({ error: `Not found product by id: ${id}.` });
    }

    return res.json(product);
  },

  async showByFactory(req, res) {
    const { id } = req.params;

    const products = await Product.findAll({ where: { factory_id: id }, include: ['gender', 'ageGroup', 'factory', 'colors'] });

    return res.json(products);
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
