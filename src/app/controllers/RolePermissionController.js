const RolePermissionService = require('../services/RolePermissionService');

module.exports = {
  async add(req, res) {
    const { id } = req.params;
    const { permissions } = req.body;

    const roleId = Number(id);

    const result = await RolePermissionService.create({ roleId, permissions });

    return res.json(result);
  },

  async remove(req, res) {
    const { id } = req.params;
    const { permissions } = req.body;

    const roleId = Number(id);

    const result = await RolePermissionService.delete({ roleId, permissions });

    return res.json(result);
  },
};
