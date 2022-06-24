const Commission = require('../models/Commission');

module.exports = {
  async index(req, res) {
    const commissions = await Commission.findAll();

    return res.json(commissions);
  },

  async show(req, res) {
    const { id } = req.params;

    const commission = await Commission.findByPk(id);

    if (!commission) {
      return res.status(400).json({ error: `Not found commission by id: ${id}.` });
    }

    return res.json(commission);
  },

  // TODO: SET NAME UNIQUE IN DATABASE
  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Commission is required!' });
    }

    const [commissionExists] = await Commission.findAll({ where: { name : name } });
    if (commissionExists) {
      return res.status(400).json({ error: `Commission ${name} already exists!` });
    }

    const commission = await Commission.create({ name });

    return res.json(commission);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const commission = await Commission.findByPk(id);
    if (!commission) {
      return res.status(400).json({ error: `Not found commission by id: ${id}.` });
    }

    const [commissionExists] = await Commission.findAll({ where: { name : name } });
    if (commissionExists) {
      return res.status(400).json({ error: `Commission ${name} already exists!` });
    }

    await commission.update({ name });

    return res.json(commission);
  },

  async delete(req, res) {
    const { id } = req.params;

    const commission = await Commission.findByPk(id);

    if (!commission) {
      return res.status(400).json({ error: `Not found commission by id: ${id}.` });
    }

    await commission.destroy();

    return res.json(`Commission ${commission.name} was successfully deleted.`);
  },
};
