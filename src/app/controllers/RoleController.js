const Role = require('../models/Role');

module.exports = {
  async index(req, res) {
    const roles = await Role.findAll();

    return res.json(roles);
  },

  async show(req, res) {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(400).json({ error: `Not found role by id: ${id}` });
    }

    return res.json(role);
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

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(400).json({ error: `Not found role by id: ${id}` });
    }

    role.name = name;

    await role.save();

    return res.json(role);
  },
};
