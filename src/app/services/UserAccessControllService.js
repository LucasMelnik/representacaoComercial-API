const Permission = require('../models/Permission');
const Role = require('../models/Role');
const User = require('../models/User');

module.exports = {
  async create({ userId, roles, permissions }) {
    const user = await User.findByPk(userId);

    if (!user) {
      return 'User does not exist!';
    }

    const permissionsExists = permissions.map(async (permission) => {
      const query = await Permission.findByPk(permission);

      await user.addPermission(query);
    });

    const roleExists = roles.map(async (role) => {
      const query = await Role.findByPk(role);

      await user.addRole(query);
    });

    user.permissions = permissionsExists;
    user.roles = roleExists;

    return 'Permissions was successfully added!';
  },

  async delete({ userId, roles, permissions }) {
    const user = await User.findByPk(userId);

    if (!user) {
      return 'User does not exists';
    }

    permissions.map(async (permission) => {
      const query = await Permission.findByPk(permission);

      await user.removePermission(query);
    });

    roles.map(async (permission) => {
      const query = await Role.findByPk(permission);

      await user.removeRole(query);
    });

    return 'Permissions was successfully deleted!';
  },
};
