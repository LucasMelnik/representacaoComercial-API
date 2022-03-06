const { Router } = require('express');
const RoleController = require('./app/controllers/RoleController');

const router = Router();

router.get('/roles', RoleController.index);
router.post('/roles', RoleController.store);

module.exports = router;
