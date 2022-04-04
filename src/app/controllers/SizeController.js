const Size = require('../models/Size');

module.exports = {
  async index(req, res) {
    const sizes = await Size.findAll();

    return res.json(sizes);
  },

  async show(req, res) {
    const { id } = req.params;

    const size = await Size.findByPk(id);

    if (!size) {
      return res.status(400).json({ error: `Not found size by id ${id}` });
    }

    return res.json(size);
  },

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const [sizeExists] = await Size.findAll({ where: { name } });
    if (sizeExists) {
      return res.status(400).json({ error: 'Size already exists!' });
    }

    const size = await Size.create({ name });

    return res.json(size);
  },

  async update(req, res) {
    const { id } = req.params;
    const idToNumber = Number(id);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const size = await Size.findByPk(id);
    if (!size) {
      return res.status(400).json({ error: `Not found size by id: ${id}` });
    }

    const [sizeExists] = await Size.findAll({ where: { name } });
    if (sizeExists && sizeExists.id !== idToNumber) {
      return res.status(400).json({ error: 'Size already exists!' });
    }

    if (sizeExists && sizeExists.name === name) {
      return res.status(400).json({ error: `The size name is already ${name}!` });
    }

    await size.update({ name });

    return res.json(size);
  },

  async delete(req, res) {
    const { id } = req.params;

    const size = await Size.findByPk(id);

    if (!size) {
      return res.status(400).json({ error: `Not found size by id: ${id}.` });
    }

    await size.destroy();

    return res.json(`Syze ${size.name} was successfully deleted.`);
  },
};
