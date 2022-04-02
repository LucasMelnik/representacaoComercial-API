const { Router } = require('express');
const AgeGroupController = require('./app/controllers/AgeGroupController');
const AuthController = require('./app/controllers/AuthController');
const GenderController = require('./app/controllers/GenderController');
const PermissionController = require('./app/controllers/PermissionController');
const ProductController = require('./app/controllers/ProductController');
const RefreshTokenController = require('./app/controllers/RefreshTokenController');
const RoleController = require('./app/controllers/RoleController');
const RolePermissionController = require('./app/controllers/RolePermissionController');
const SizeController = require('./app/controllers/SizeController');
const UserAccessControllController = require('./app/controllers/UserAccessControllController');
const UserController = require('./app/controllers/UserController');

// TODO: CREATE PERMISSIONS
// TODO: SET PERMISSIONS AT ROUTES
const { authenticate } = require('./app/middlewares/authMiddleware');
const { can, is } = require('./app/middlewares/PermissionMiddleware');

const router = Router();

// ROLES
router.get('/roles', authenticate, RoleController.index);
router.get('/roles/:id', RoleController.show);
router.post('/roles', RoleController.store);
router.put('/roles/:id', RoleController.update);
router.delete('/roles/:id', RoleController.delete);
// ROLES PERMISSION
router.post('/roles/:id/permissions', authenticate, is('REPRESENTANTE'), RolePermissionController.add);
router.delete('/roles/:id/permissions', authenticate, is(['REPRESENTANTE']), RolePermissionController.remove);

// USERS
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', authenticate, is('REPRESENTANTE'), can('create_user'), UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);
// USER ACCESS CONTROLL
router.post('/users/:id/access-controll', UserAccessControllController.add);
router.delete('/users/:id/access-controll', UserAccessControllController.remove);

// PERMISSIONS
router.get('/permissions', PermissionController.index);
router.get('/permissions/:id', PermissionController.show);
router.post('/permissions', PermissionController.store);
router.put('/permissions/:id', PermissionController.update);
router.delete('/permissions/:id', PermissionController.delete);

// AUTHENTICATION
router.post('/auth', AuthController.authenticate);
router.post('/refresh-token', RefreshTokenController.handle);

// GENDERS
router.get('/genders', GenderController.index);
router.post('/genders', GenderController.store);

// AGE GROUPS
router.get('/age_groups', AgeGroupController.index);
router.post('/age_groups', AgeGroupController.store);

// PRODUCTS
router.get('/products', ProductController.index);
router.post('/products', ProductController.store);

// SIZES
router.get('/sizes', SizeController.index);
router.get('/sizes/:id', SizeController.show);
router.post('/sizes', SizeController.store);
router.put('/sizes/:id', SizeController.update);
router.delete('/sizes/:id', SizeController.delete);

module.exports = router;
