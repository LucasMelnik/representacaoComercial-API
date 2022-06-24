const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const ProductPrice = require('../models/ProductPrice');
const Size = require('../models/Size');

module.exports = {
  async index(req, res) {
    const orderItems = await OrderItem.findAll({
      attributes: ['id', 'quantity', 'createdAt', 'updatedAt', 'order_id'],
      include: [
        { association: 'product_price', attributes: ['price'], include: { association: 'product', attributes: ['ref', 'color', 'image_path'] } },
        { association: 'size', attributes: ['name'] },
      ],
    });

    return res.json(orderItems);
  },

  async show(req, res) {
    const { order_id } = req.params;

    const orderItems = await OrderItem.findAll({
      where: { order_id },
      include: [
        { association: 'product_price', attributes: ['price'], include: { association: 'product', attributes: ['ref', 'color'] } },
        { association: 'size', attributes: ['name'] },
      ],
    });

    return res.json(orderItems);
  },

  async store(req, res) {
    const {
      order_id, product_price_id, size_id, quantity,
    } = req.body;

    // console.log(order_id, product_price_id, size_id, quantity);

    if (!order_id) {
      return res.status(400).json({ error: 'Order id is required' });
    }

    if (!product_price_id) {
      return res.status(400).json({ error: 'Product price id is required' });
    }

    if (!quantity) {
      return res.status(400).json({ error: 'Quantity id is required' });
    }

    if (!size_id) {
      return res.status(400).json({ error: 'Size id is required' });
    }

    const orderExists = await Order.findByPk(order_id);
    if (!orderExists) {
      return res.status(400).json({ error: `Not found order by id: ${order_id}` });
    }

    const productPriceExists = await ProductPrice.findByPk(product_price_id);
    if (!productPriceExists) {
      return res.status(400).json({ error: `Not found product price by id: ${product_price_id}` });
    }

    const sizeExists = await Size.findByPk(size_id);
    if (!sizeExists) {
      return res.status(400).json({ error: `Not found size by id: ${size_id}` });
    }

    const orderItem = await OrderItem.create({
      order_id, product_price_id, quantity, size_id,
    });

    return res.json(orderItem);
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      order_id, product_price_id, size_id, quantity,
    } = req.body;

    if (!order_id) {
      return res.status(400).json({ error: 'Order id is required' });
    }

    if (!product_price_id) {
      return res.status(400).json({ error: 'Product price id is required' });
    }

    if (!quantity) {
      return res.status(400).json({ error: 'Quantity id is required' });
    }

    if (!size_id) {
      return res.status(400).json({ error: 'Size id is required' });
    }

    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      return res.status(404).json({ error: `Not found order item by id: ${id}` });
    }

    const orderExists = await Order.findByPk(order_id);
    if (!orderExists) {
      return res.status(400).json({ error: `Not found order by id: ${order_id}` });
    }

    const productPriceExists = await ProductPrice.findByPk(product_price_id);
    if (!productPriceExists) {
      return res.status(400).json({ error: `Not found product price by id: ${product_price_id}` });
    }

    const sizeExists = await Size.findByPk(size_id);
    if (!sizeExists) {
      return res.status(400).json({ error: `Not found size by id: ${size_id}` });
    }

    await orderItem.update({
      order_id, product_price_id, size_id, quantity,
    });

    res.json(orderItem);
  },

  async delete(req, res) {
    const { id } = req.params;

    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      return res.status(404).json({ error: `Not found order item by id: ${id}` });
    }

    await orderItem.destroy();

    return res.json(`Order item ${id} was successfully deleted!`);
  },
};
