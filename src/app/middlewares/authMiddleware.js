const jwt = require('jsonwebtoken');

module.exports = {
  authenticate(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Request without token!' });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

      const { id } = data;

      res.userId = id;

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid Token!' });
    }
  },
};
