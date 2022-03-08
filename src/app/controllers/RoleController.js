const Role = require('../models/Role');

module.exports = {
  async index(req, res) {
    const roles = await Role.findAll();

    return res.json(roles);
  },

  async store(req, res) {
    const { name } = req.body;

    const [roleExists] = await Role.findAll({ where: { name } });
    if (roleExists) {
      return res.status(400).json({ error: 'Role already exists!' });
    }

    const role = await Role.create({ name });

    return res.json(role);
  },
};
