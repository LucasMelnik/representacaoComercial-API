const RefreshTokenVerifier = require('../services/RefreshTokenVerifier');

module.exports = {
  async handle(req, res) {
    const { refresh_token } = req.body;

    const token = await RefreshTokenVerifier.execute(refresh_token);

    return res.json({ token });
  },
};
