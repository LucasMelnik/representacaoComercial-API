const Role = require('../models/Role');

module.exports = {
  // LIST ALL ROLES
  async index(req, res) {
    const roles = await Role.findAll();

    return res.json(roles);
  },

  async store(req, res) {
    const { name } = req.body;

    const role = await Role.create({ name });

    return res.json(role);
  },
};
