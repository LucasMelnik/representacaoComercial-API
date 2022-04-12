const User = require('../models/User');

// TODO: APPLICATION BROKES WHEN TRY TO LIST USERS IF USER IS NOT AUTHENTICATED
module.exports = {
  can(permissionsRoutes) {
    return async (req, res, next) => {
      const { userId } = req;

      const user = await User.findByPk(
        userId,
        {
          include: { association: 'permissions' },
        },
      );

      const userHasPermissions = user.permissions
        .map((permission) => permission.name)
        .some((permission) => permissionsRoutes.includes(permission));

      if (!userHasPermissions) {
        if (!req.userVerified) {
          req.userVerified = true;
        } else {
          return res.status(401).end();
        }
      }

      return next();
    };
  },

  is(rolesRoutes) {
    return async (req, res, next) => {
      const { userId } = req;

      const user = await User.findByPk(
        userId,
        {
          include: { association: 'roles' },
        },
      );

      const userHasRoles = user.roles
        .map((role) => role.name)
        .some((role) => rolesRoutes.includes(role));

      // if (!userHasRoles) {
      //   if (!req.userVerified) {
      //     req.userVerified = true;
      //   } else {
      //     return res.status(401).end();
      //   }
      // }

      if (!userHasRoles) {
        return res.status(401).end();
      }

      return next();
    };
  },
};
