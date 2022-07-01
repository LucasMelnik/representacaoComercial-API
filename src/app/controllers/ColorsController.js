const Colors = require('../models/Colors');

module.exports = {
  async getColorsByProduct(req, res) {
    const { product_id } = req.params;

    const colors = await Colors.findAll({ where: { product_id } });

    res.json(colors);
  },

  async show(req, res) {
    const { id } = req.params;

    const color = await Colors.findByPk(id);

    res.json(color);
  },

  async index(req, res) {
    const colors = await Colors.findAll();

    res.json(colors);
  },
};
