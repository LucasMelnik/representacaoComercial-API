const UserAccessControllService = require('../services/UserAccessControllService');

module.exports = {
  async add(req, res) {
    const { id } = req.params;
    const { roles, permissions } = req.body;

    const userId = Number(id);

    const result = await UserAccessControllService.create({ userId, roles, permissions });

    return res.json(result);
  },

  async remove(req, res) {
    const { id } = req.params;
    const { roles, permissions } = req.body;

    const userId = Number(id);

    const result = await UserAccessControllService.delete({ userId, roles, permissions });

    return res.json(result);
  },
};
