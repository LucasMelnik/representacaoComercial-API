const dayjs = require('dayjs');
const RefreshToken = require('../models/RefreshToken');

module.exports = {
  async execute(user_id) {
    const expires_in = dayjs().add(15, 'second').unix();

    const generateRefreshToken = await RefreshToken.create({ user_id, expires_in });

    return generateRefreshToken;
  },
};
