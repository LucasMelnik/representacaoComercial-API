const RefreshToken = require('../models/RefreshToken');
const GenerateToken = require('../provider/GenerateToken');

module.exports = {
  async execute(refresh_token) {
    const refreshToken = await RefreshToken.findOne({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      return 'Invalid Refresh Token!';
    }

    const token = GenerateToken.execute(refreshToken.user_id);

    return token;
  },
};
