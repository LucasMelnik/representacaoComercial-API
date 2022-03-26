const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '30s' });

    const userId = user.id;

    return res.json({
      userId,
      email,
      token,
    });
  },
};
