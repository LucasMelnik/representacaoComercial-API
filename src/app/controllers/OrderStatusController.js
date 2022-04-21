const OrderStatus = require('../models/OrderStatus');

module.exports = {
  async index(req, res) {
    const status = await OrderStatus.findAll();

    return res.json(status);
  },

  async show(req, res) {
    const { id } = req.params;

    const status = await OrderStatus.findByPk(id);

    if (!status) {
      return res.status(400).json({ error: `Not found status by id: ${id}` });
    }

    return res.json(status);
  },

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const [statusExists] = await OrderStatus.findAll({ where: { name } });
    if (statusExists) {
      return res.status(400).json({ error: `Status ${name} alerady exists!` });
    }

    const status = await OrderStatus.create({ name });

    return res.json(status);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const status = await OrderStatus.findByPk(id);
    if (!status) {
      return res.status(400).json({ error: `Not found status by id: ${id}` });
    }

    const [statusExists] = await OrderStatus.findAll({ where: { name } });
    if (statusExists) {
      return res.status(400).json({ error: `Status ${name} alerady exists!` });
    }

    await status.update({ name });

    return res.json(status);
  },

  async delete(req, res) {
    const { id } = req.params;

    const status = await OrderStatus.findByPk(id);

    if (!status) {
      return res.status(400).json({ error: `Not found status by id: ${id}.` });
    }

    await status.destroy();

    return res.json(`Status ${status.name} was successfully deleted.`);
  },
};
