const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/User');
const GenerateRefreshToken = require('../provider/GenerateRefreshToken');
const GenerateToken = require('../provider/GenerateToken');

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

    const userId = user.id;

    const token = await GenerateToken.execute(userId);
    const refreshToken = await GenerateRefreshToken.execute(userId);

    return res.json({
      userId,
      email,
      token,
      refreshToken,
    });
  },
};
