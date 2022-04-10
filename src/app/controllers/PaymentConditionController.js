const PaymentCondition = require('../models/PaymentCondition');

module.exports = {
  async index(req, res) {
    const payment_conditions = await PaymentCondition.findAll();

    return res.json(payment_conditions);
  },

  async show(req, res) {
    const { id } = req.params;

    const payment_conditions = await PaymentCondition.findByPk(id);

    if (!payment_conditions) {
      return res.status(400).json({ error: `Not found Payment Condition by id: ${id}.` });
    }

    return res.json(payment_conditions);
  },

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const payment_conditionExists = await PaymentCondition.findOne({ where: { name } });
    if (payment_conditionExists) {
      return res.status(400).json({ error: `Payment condition ${name} already exists!` });
    }

    const payment_conditions = await PaymentCondition.create({ name });

    return res.json(payment_conditions);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const payment_conditions = await PaymentCondition.findByPk(id);
    if (!payment_conditions) {
      return res.status(400).json({ error: `Not found payment_condition by id: ${id}.` });
    }

    const [payment_conditionExists] = await PaymentCondition.findAll({ where: { name } });
    if (payment_conditionExists && payment_conditionExists.id !== id) {
      return res.status(400).json({ error: 'Payment Condition already exists!' });
    }

    await payment_conditions.update({ name });

    return res.json(payment_conditions);
  },

  async delete(req, res) {
    const { id } = req.params;

    const payment_conditions = await PaymentCondition.findByPk(id);

    if (!payment_conditions) {
      return res.status(400).json({ error: `Not found payment_conditions by id: ${id}.` });
    }

    await payment_conditions.destroy();

    return res.json(`payment_conditions ${payment_conditions.name} was successfully deleted.`);
  },
};
