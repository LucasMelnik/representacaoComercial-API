const Permission = require('../models/Permission');
const Role = require('../models/Role');

module.exports = {
  async create({ roleId, permissions }) {
    const role = await Role.findByPk(roleId);

    if (!role) {
      return 'Role does not exist!';
    }

    permissions.map(async (permission) => {
      const query = await Permission.findByPk(permission);

      await role.addPermission(query);
    });

    return `Permissions was successfully added to role ${role.name}`;
  },

  async delete({ roleId, permissions }) {
    const role = await Role.findByPk(roleId);

    if (!role) {
      return 'Role does not exist!';
    }

    permissions.map(async (permission) => {
      const query = await Permission.findByPk(permission);

      await role.removePermission(query);
    });

    return `Permissions was successfully deleted from role ${role.name}`;
  },
};
