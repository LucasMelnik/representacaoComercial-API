const User = require('../models/User');
// TODO: TIRAR PASSWORD DAS RESPONSES
module.exports = {
  async index(req, res) {
    const users = await User.findAll();

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
      firstname, lastname, email, password, nickname, phone,
    } = req.body;

    if (!firstname) {
      return res.status(400).json({ error: 'Firstname is required!' });
    }

    if (!lastname) {
      return res.status(400).json({ error: 'Lastname is required!' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required!' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required!' });
    }

    const [emailExists] = await User.findAll({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ error: `User with email ${email} already exists` });
    }

    const [phoneExists] = await User.findAll({ where: { phone } });
    if (phoneExists) {
      return res.status(400).json({ error: `User with phone ${phone} alerady exists` });
    }

    const user = await User.create({
      firstname, lastname, email, password, nickname, phone,
    });

    return res.json(user);
  },

  async update(req, res) {
    const { id } = req.params;
    const idToNumber = Number(id);
    const {
      firstname, lastname, email, password, nickname, phone,
    } = req.body;

    if (!firstname) {
      return res.status(400).json({ error: 'Firstname is required!' });
    }

    if (!lastname) {
      return res.status(400).json({ error: 'Lastname is required!' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required!' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required!' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ error: `Not found user by id: ${id}` });
    }

    const [emailExists] = await User.findAll({ where: { email } });
    if (emailExists && emailExists.id !== idToNumber) {
      return res.status(400).json({ error: 'This email is already in use' });
    }

    const [phoneExists] = await User.findAll({ where: { phone } });
    if (phoneExists && phoneExists.id !== idToNumber) {
      return res.status(400).json({ error: 'This phone is already in use' });
    }

    await user.update({
      firstname, lastname, email, password, nickname, phone,
    });

    return res.json(user);
  },

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: `Not found user by id: ${id}.` });
    }

    await user.destroy();

    return res.json(`User ${user.firstname} ${user.lastname} was successfully deleted.`);
  },
};
