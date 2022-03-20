const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll({
      include: { association: 'role' },
    });

    return res.json(users);
  },

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: `Not found user by id: ${id}.` });
    }

    return res.json(user);
  },

  async store(req, res) {
    const {
      firstname, lastname, email, password, nickname, phone, role_id,
    } = req.body;

    const [userExists] = await User.findAll({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: `User with email ${email} already exists` });
    }

    const user = await User.create({
      firstname, lastname, email, password, nickname, phone, role_id,
    });

    return res.json(user);
  },
};
