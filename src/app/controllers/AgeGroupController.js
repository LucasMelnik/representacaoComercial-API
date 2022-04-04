const AgeGroup = require('../models/AgeGroup');

module.exports = {
  async index(req, res) {
    const ageGroups = await AgeGroup.findAll();

    return res.json(ageGroups);
  },

  async store(req, res) {
    const {
      name,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const [ageGroupExists] = await AgeGroup.findAll({ where: { name } });
    if (ageGroupExists) {
      return res.status(400).json({ error: `Age Group ${name} already exists` });
    }

    const ageGroup = await AgeGroup.create({
      name,
    });

    return res.json(ageGroup);
  },

  async show(req, res) {
    const { id } = req.params;

    const ageGroup = await AgeGroup.findByPk(id);

    if (!ageGroup) {
      return res.status(400).json({ error: `Not found ageGroup by id: ${id}.` });
    }

    return res.json(ageGroup);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const ageGroup = await AgeGroup.findByPk(id);
    if (!ageGroup) {
      return res.status(400).json({ error: `Not found Age group by id: ${id}.` });
    }

    const [ageGroupExists] = await AgeGroup.findAll({ where: { name } });
    if (ageGroupExists && ageGroupExists.id !== id) {
      return res.status(400).json({ error: 'Age group already exists!' });
    }

    ageGroup.name = name;

    await ageGroup.save();

    return res.json(ageGroup);
  },

  async delete(req, res) {
    const { id } = req.params;

    const ageGroup = await AgeGroup.findByPk(id);

    if (!ageGroup) {
      return res.status(400).json({ error: `Not found ageGroup by id: ${id}.` });
    }

    await ageGroup.destroy();

    return res.json(`Age group ${ageGroup.name} was successfully deleted.`);
  },
};
