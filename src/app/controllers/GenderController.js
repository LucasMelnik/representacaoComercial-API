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

    const [genderExists] = await Gender.findOne({ where: { name } });
    if (genderExists) {
      return res.status(400).json({ error: `Gender ${name} already exists` });
    }

    const gender = await Gender.create({
      name
    });

    return res.json(gender);
  },
};
