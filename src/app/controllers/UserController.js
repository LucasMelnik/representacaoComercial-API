const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { firstname } = req.body;

    const user = await User.create({ firstname });

    return res.json(user);
  },
};
