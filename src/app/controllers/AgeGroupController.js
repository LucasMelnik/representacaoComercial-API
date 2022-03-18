const AgeGroup = require('../models/AgeGroup');

module.exports = {
  async index(req, res) {
    const ageGroups = await AgeGroup.findAll();

    return res.json(ageGroups);
  },

  async store(req, res) {
    const {
      name
    } = req.body;

    const [ageGroupExists] = await AgeGroup.findOne({ where: { name } });
    if (ageGroupExists) {
      return res.status(400).json({ error: `Age Group ${name} already exists` });
    }

    const ageGroup = await AgeGroup.create({
      name
    });

    return res.json(ageGroup);
  },
};
