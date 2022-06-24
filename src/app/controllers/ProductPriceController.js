const ProductPrice = require('../models/ProductPrice');

module.exports = {
  async index(req, res) {
    const productPrices = await ProductPrice.findAll({
      include: ['payment_condition', 'product', 'commission'],
    });

    return res.json(productPrices);
  },

  // TODO: VERIFY IF ATRIBUTES EXISTS BEFORE CREATE OR UPDATE
  // TODO: VERIFY IF PRODUCT PRICE ALREADY EXISTS BEFORE CREATE OR UPDATE
  async store(req, res) {
    const {
      price, payment_condition_id, product_id, commission_id,
    } = req.body;

    if (!price) {
      return res.status(400).json({ error: 'Price is required!' });
    }

    const productPrice = await ProductPrice.create({
      price, payment_condition_id, product_id, commission_id,
    });

    return res.json(productPrice);
  },

  async show(req, res) {
    const { commission_id, payment_condition_id, product_id } = req.params;

    const productPrice = await ProductPrice.findOne({
      where: {
        commission_id, payment_condition_id, product_id,
      },
    });

    if (!productPrice) {
      return res.status(400).json({ error: 'Not found productPrice' });
    }

    return res.json(productPrice);
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      price, payment_condition_id, product_id, commission_id,
    } = req.body;

    if (!price) {
      return res.status(400).json({ error: 'Price is required!' });
    }

    const productPrice = await ProductPrice.findByPk(id);
    if (!productPrice) {
      return res.status(400).json({ error: `Not found productPrice by id: ${id}.` });
    }

    await productPrice.update({
      price, payment_condition_id, product_id, commission_id,
    });

    return res.json(productPrice);
  },

  async delete(req, res) {
    const { id } = req.params;

    const productPrice = await ProductPrice.findByPk(id);

    if (!productPrice) {
      return res.status(400).json({ error: `Not found productPrice by id: ${id}.` });
    }

    await productPrice.destroy();

    return res.json(`ProductPrice ${productPrice.id} was successfully deleted.`);
  },
};
