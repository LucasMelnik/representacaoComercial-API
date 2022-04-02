const jwt = require('jsonwebtoken');

module.exports = {
  async execute(userId) {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' });
    return token;
  },

};
