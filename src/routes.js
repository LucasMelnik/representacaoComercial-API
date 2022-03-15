const { Router } = require('express');
const RoleController = require('./app/controllers/RoleController');
const UserController = require('./app/controllers/UserController');

const router = Router();

router.get('/roles', RoleController.index);
router.get('/roles/:id', RoleController.show);
router.post('/roles', RoleController.store);

router.get('/users', UserController.index);
router.post('/users', UserController.store);

module.exports = router;
