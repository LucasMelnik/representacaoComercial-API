const Order = require('../models/Order');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const orders = await Order.findAll({
      attributes: ['id', 'order_date', 'delivery_date', 'comments', 'discount', 'createdAt', 'updatedAt'],
      include: [
        { association: 'customer', attributes: ['corporate_name'] },
        { association: 'seller', attributes: ['nickname'] },
        { association: 'factory', attributes: ['fantasy_name'] },
        { association: 'payment_conditions', attributes: ['name'] },
        { association: 'commission', attributes: ['name'] },
      ],

    });

    return res.json(orders);
  },

  async show(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      attributes: ['id', 'order_date', 'delivery_date', 'comments', 'discount', 'createdAt', 'updatedAt'],
      include: [
        { association: 'customer', attributes: ['corporate_name'] },
        { association: 'seller', attributes: ['nickname'] },
        { association: 'factory', attributes: ['fantasy_name'] },
        { association: 'payment_conditions', attributes: ['name'] },
        { association: 'commission', attributes: ['name'] },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: `Not found order by id: ${id}` });
    }

    return res.json(order);
  },

  async store(req, res) {
    const {
      customer_id, factory_id, payment_conditions_id, commission_id,
      order_date, delivery_date, comments, discount,
    } = req.body;
    const user_id = req.userId;

    if (!customer_id) {
      return res.status(400).json({ error: 'customer_id is required!' });
    }

    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required!' });
    }

    if (!payment_conditions_id) {
      return res.status(400).json({ error: 'payment_conditions_id is required!' });
    }

    if (!commission_id) {
      return res.status(400).json({ error: 'commission_id is required!' });
    }

    if (!order_date) {
      return res.status(400).json({ error: 'order_date is required!' });
    }

    const order = await Order.create({
      customer_id,
      user_id,
      factory_id,
      payment_conditions_id,
      commission_id,
      order_date,
      delivery_date,
      comments,
      discount,
    });

    return res.json(order);
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      customer_id, user_id, factory_id, payment_conditions_id, commission_id,
      order_date, delivery_date, comments, discount,
    } = req.body;

    if (!customer_id) {
      return res.status(400).json({ error: 'customer_id is required!' });
    }

    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required!' });
    }

    if (!payment_conditions_id) {
      return res.status(400).json({ error: 'payment_conditions_id is required!' });
    }

    if (!commission_id) {
      return res.status(400).json({ error: 'commission_id is required!' });
    }

    if (!order_date) {
      return res.status(400).json({ error: 'order_date is required!' });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ error: `Not found order by id: ${id}` });
    }

    const seller = await User.findByPk(user_id);
    if (!seller) {
      return res.status(400).json({ error: `Not found seller by id: ${user_id}` });
    }

    await order.update({
      customer_id,
      user_id,
      factory_id,
      payment_conditions_id,
      commission_id,
      order_date,
      delivery_date,
      comments,
      discount,
    });

    return res.json(order);
  },

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: `Not found order by id: ${id}` });
    }

    await order.destroy();

    return res.json({ message: `Order ${id} was successfully deleted!` });
  },
};
