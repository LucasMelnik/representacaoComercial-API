const { Router } = require('express');
const AgeGroupController = require('./app/controllers/AgeGroupController');
const AuthController = require('./app/controllers/AuthController');
const GenderController = require('./app/controllers/GenderController');
const ProductController = require('./app/controllers/ProductController');
const RoleController = require('./app/controllers/RoleController');
const SizeController = require('./app/controllers/SizeController');
const UserController = require('./app/controllers/UserController');
const { authenticate } = require('./app/middlewares/authMiddleware');

const router = Router();

// ROLES
router.get('/roles', authenticate, RoleController.index);
router.get('/roles/:id', RoleController.show);
router.post('/roles', RoleController.store);
router.put('/roles/:id', RoleController.update);
router.delete('/roles/:id', RoleController.delete);

// USERS
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

// AUTHENTICATION
router.post('/auth', AuthController.authenticate);

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
