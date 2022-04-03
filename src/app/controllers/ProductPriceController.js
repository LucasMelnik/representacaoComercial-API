const ProductPrice = require('../models/ProductPrice');

module.exports = {
  async index(req, res) {
    const productPrices = await ProductPrice.findAll({
      include: ['paymentCondition', 'product', 'commission'],
    });

    return res.json(productPrices);
  },

  async store(req, res) {
    const data = {
      price, payment_condition_id, product_id, commission_id
    } = req.body;

    if (!data.price) {
      return res.status(400).json({ error: 'Price is required!' });
    }

    const productPrice = await ProductPrice.create(data);

    return res.json(productPrice);
  },

  async show(req, res) {
    const { id } = req.params;

    const productPrice = await ProductPrice.findByPk(id);

    if (!productPrice) {
      return res.status(400).json({ error: `Not found productPrice by id: ${id}.` });
    }

    return res.json(productPrice);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = {
      price, payment_condition_id, product_id, commission_id
    } = req.body;

    if (!data.price) {
      return res.status(400).json({ error: 'Price is required!' });
    }

    const productPrice = await ProductPrice.findByPk(id);
    if (!productPrice) {
      return res.status(400).json({ error: `Not found productPrice by id: ${id}.` });
    }

    productPrice.price = data.price;
    productPrice.payment_condition_id = data.payment_condition_id;
    productPrice.product_id = data.product_id;
    productPrice.commission_id = data.commission_id;
    
    await productPrice.save();

    return res.json(productPrice);
  },

  async delete(req, res) {
    const { id } = req.params;

    const productPrice = await ProductPrice.findByPk(id);

    if (!productPrice) {
      return res.status(400).json({ error: `Not found productPrice by id: ${id}.` });
    }

    await productPrice.destroy();

    return res.json(`ProductPrice ${productPrice.price} was successfully deleted.`);
  },
};

