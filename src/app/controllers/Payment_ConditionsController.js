/* eslint-disable linebreak-style */
/* eslint-disable object-property-newline */
/* eslint-disable linebreak-style */
const Payment_Conditions = require('../models/Payment_Conditions');

module.exports = {
  async index(req, res) {
    const payment_conditions = await Payment_Conditions.findAll();

    return res.json(payment_conditions);
  },

  async show(req, res) {
    const { id } = req.params;

    const payment_conditions = await Payment_Conditions.findByPk(id);

    if (!payment_conditions) {
      return res.status(400).json({ error: `Not found Payment Condition by id: ${id}.` });
    }

    return res.json(payment_conditions);
  },

  async store(req, res) {
    const { condition } = req.body;

    if (!condition) {
      return res.status(400).json({ error: 'condition is required!' });
    }

    const [payment_conditionExists] = await Payment_Conditions.findAll({ where: { condition } });
    if (payment_conditionExists) {
      return res.status(400).json({ error: 'Payment Condition already exists!' });
    }

    const payment_conditions = await Payment_Conditions.create({ condition });

    return res.json(payment_conditions);
  },

  async update(req, res) {
    const { id } = req.params;
    const { condition } = req.body;

    if (!condition) {
      return res.status(400).json({ error: 'condition is required!' });
    }

    const payment_conditions = await Payment_Conditions.findByPk(id);
    if (!payment_conditions) {
      return res.status(400).json({ error: `Not found payment_condition by id: ${id}.` });
    }

    const [payment_conditionExists] = await Payment_Conditions.findAll({ where: { condition } });
    if (payment_conditionExists && payment_conditionExists.id !== id) {
      return res.status(400).json({ error: 'Payment Condition already exists!' });
    }

    payment_conditions.condition = condition;

    await payment_conditions.save();

    return res.json(payment_conditions);
  },

  async delete(req, res) {
    const { id } = req.params;

    const payment_conditions = await Payment_Conditions.findByPk(id);

    if (!payment_conditions) {
      return res.status(400).json({ error: `Not found payment_conditions by id: ${id}.` });
    }

    await payment_conditions.destroy();

    return res.json(`payment_conditions ${payment_conditions.condition} was successfully deleted.`);
  },
};
