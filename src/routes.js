const { Router } = require('express');
const AgeGroupController = require('./app/controllers/AgeGroupController');
const GenderController = require('./app/controllers/GenderController');
const ProductController = require('./app/controllers/ProductController');
const RoleController = require('./app/controllers/RoleController');
const UserController = require('./app/controllers/UserController');

const router = Router();

router.get('/roles', RoleController.index);
router.get('/roles/:id', RoleController.show);
router.post('/roles', RoleController.store);
router.put('/roles/:id', RoleController.update);
router.delete('/roles/:id', RoleController.delete);

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);

router.get('/genders', GenderController.index);
router.post('/genders', GenderController.store);

router.get('/age_groups', AgeGroupController.index);
router.post('/age_groups', AgeGroupController.store);

router.get('/products', ProductController.index);
router.post('/products', ProductController.store);

module.exports = router;
