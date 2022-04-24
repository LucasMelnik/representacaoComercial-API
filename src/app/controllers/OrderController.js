const Order = require('../models/Order');
const User = require('../models/User');
const Customer = require('../models/Customer');
const Factory = require('../models/Factory');
const PaymentCondition = require('../models/PaymentCondition');
const Commission = require('../models/Commission');
const OrderStatus = require('../models/OrderStatus');

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
        { association: 'status', attributes: ['name'] },
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
        { association: 'status', attributes: ['name'] },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: `Not found order by id: ${id}` });
    }

    return res.json(order);
  },
  // TODO: VERIFY IF ATRIBUTES EXISTS
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

    const customerExists = await Customer.findByPk(customer_id);
    if (!customerExists) {
      return res.status(400).json({ error: `Not found customer by id: ${customer_id}` });
    }

    const userExists = await User.findByPk(user_id);
    if (!userExists) {
      return res.status(400).json({ error: `Not found user by id: ${user_id}` });
    }

    const factoryExists = await Factory.findByPk(factory_id);
    if (!factoryExists) {
      return res.status(400).json({ error: `Not found factory by id: ${factory_id}` });
    }

    const paymentConditionExists = await PaymentCondition.findByPk(payment_conditions_id);
    if (!paymentConditionExists) {
      return res.status(400).json({ error: `Not found payment conditions by id: ${payment_conditions_id}` });
    }

    const commissionExisits = await Commission.findByPk(commission_id);
    if (!commissionExisits) {
      return res.status(400).json({ error: `Not found commission by id: ${commission_id}` });
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
      order_date, delivery_date, comments, discount, order_status_id,
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

    if (!order_status_id) {
      return res.status(400).json({ error: 'order_status_id is required!' });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ error: `Not found order by id: ${id}` });
    }

    const seller = await User.findByPk(user_id);
    if (!seller) {
      return res.status(400).json({ error: `Not found seller by id: ${user_id}` });
    }

    const customerExists = await Customer.findByPk(customer_id);
    if (!customerExists) {
      return res.status(400).json({ error: `Not found customer by id: ${customer_id}` });
    }

    const userExists = await User.findByPk(user_id);
    if (!userExists) {
      return res.status(400).json({ error: `Not found user by id: ${user_id}` });
    }

    const factoryExists = await Factory.findByPk(factory_id);
    if (!factoryExists) {
      return res.status(400).json({ error: `Not found factory by id: ${factory_id}` });
    }

    const paymentConditionExists = await PaymentCondition.findByPk(payment_conditions_id);
    if (!paymentConditionExists) {
      return res.status(400).json({ error: `Not found payment conditions by id: ${payment_conditions_id}` });
    }

    const commissionExisits = await Commission.findByPk(commission_id);
    if (!commissionExisits) {
      return res.status(400).json({ error: `Not found commission by id: ${commission_id}` });
    }

    const statusExists = await OrderStatus.findByPk(order_status_id);
    if (!statusExists) {
      return res.status(400).json({ error: `Not found status by id: ${order_status_id}` });
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
      order_status_id,
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
