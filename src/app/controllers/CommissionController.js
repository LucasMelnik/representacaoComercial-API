const Commission = require('../models/Commission');

module.exports = {
  async index(req, res) {
    const commissions = await Commission.findAll({
      include: ['productPrices'],
    });

    return res.json(commissions);
  },

  async store(req, res) {
    const data = {
      commission
    } = req.body;

    if (!data.commission) {
      return res.status(400).json({ error: 'Commission is required!' });
    }

    const commission = await Commission.create(data);

    return res.json(commission);
  },

  async show(req, res) {
    const { id } = req.params;

    const commission = await Commission.findByPk(id);

    if (!commission) {
      return res.status(400).json({ error: `Not found commission by id: ${id}.` });
    }

    return res.json(commission);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = {
      commission
    } = req.body;

    if (!data.commission) {
      return res.status(400).json({ error: 'Commission is required!' });
    }

    const commission = await Commission.findByPk(id);
    if (!commission) {
      return res.status(400).json({ error: `Not found commission by id: ${id}.` });
    }

    commission.commission = data.commission;
    
    await commission.save();

    return res.json(commission);
  },

  async delete(req, res) {
    const { id } = req.params;

    const commission = await Commission.findByPk(id);

    if (!commission) {
      return res.status(400).json({ error: `Not found commission by id: ${id}.` });
    }

    await commission.destroy();

    return res.json(`Commission ${commission.price} was successfully deleted.`);
  },
};

