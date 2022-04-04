const Permission = require('../models/Permission');

module.exports = {
  async index(req, res) {
    const permissions = await Permission.findAll();

    return res.json(permissions);
  },

  async show(req, res) {
    const { id } = req.params;

    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(400).json({ error: `Not found permission by id: ${id}` });
    }

    return res.json(permission);
  },

  async store(req, res) {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const [permissionExists] = await Permission.findAll({ where: { name } });
    if (permissionExists) {
      return res.status(400).json({ error: 'Permission already exists!' });
    }

    const permission = await Permission.create({ name, description });

    return res.json(permission);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    const idToNumber = Number(id);

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const permission = await Permission.findByPk(id);
    if (!permission) {
      return res.status(400).json({ error: `Not found permission by id: ${id}` });
    }

    const [permissionExists] = await Permission.findAll({ where: { name } });
    if (permissionExists && permissionExists.id !== idToNumber) {
      return res.status(400).json({ error: 'Permission already exists!', permissionExists });
    }

    await permission.update({ name, description });

    return res.json(permission);
  },

  async delete(req, res) {
    const { id } = req.params;

    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(400).json({ error: `Not found user permission by id: ${id}.` });
    }

    await permission.destroy();

    return res.json(`Permission ${permission.name} was successfully deleted.`);
  },
};
