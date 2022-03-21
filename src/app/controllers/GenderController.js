const Gender = require('../models/Gender');

module.exports = {
  async index(req, res) {
    const genders = await Gender.findAll();
    return res.json(genders);
  },

  async store(req, res) {
    const {
      name
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const [genderExists] = await Gender.findOne({ where: { name } });
    if (genderExists) {
      return res.status(400).json({ error: `Gender ${name} already exists` });
    }

    const gender = await Gender.create({
      name
    });

    return res.json(gender);
  },

  async show(req, res) {
    const { id } = req.params;

    const gender = await Gender.findByPk(id);

    if (!gender) {
      return res.status(400).json({ error: `Not found gender by id: ${id}.` });
    }

    return res.json(gender);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const gender = await Gender.findByPk(id);
    if (!gender) {
      return res.status(400).json({ error: `Not found gender by id: ${id}.` });
    }

    const [genderExists] = await Gender.findOne({ where: { name } });
    if (genderExists && genderExists.id !== id) {
      return res.status(400).json({ error: 'Gender already exists!' });
    }

    gender.name = name;

    await gender.save();

    return res.json(gender);
  },

  async delete(req, res) {
    const { id } = req.params;

    const gender = await Gender.findByPk(id);

    if (!gender) {
      return res.status(400).json({ error: `Not found gender by id: ${id}.` });
    }

    await gender.destroy();

    return res.json(`Gender ${gender.name} was successfully deleted.`);
  },
};
