/* eslint-disable linebreak-style */
const { Router } = require('express');
const RoleController = require('./app/controllers/RoleController');
const UserController = require('./app/controllers/UserController');
const CustomerController = require('./app/controllers/CustomerController');
const Payment_ConditionsController = require('./app/controllers/Payment_ConditionsController');

const router = Router();

router.get('/roles', RoleController.index);
router.get('/roles/:id', RoleController.show);
router.post('/roles', RoleController.store);
router.put('/roles/:id', RoleController.update);
router.delete('/roles/:id', RoleController.delete);

router.get('/users', UserController.index);
router.post('/users', UserController.store);

router.get('/customer', CustomerController.index);
router.get('/customer/:id', CustomerController.show);
router.post('/customer', CustomerController.store);
router.put('/customer/:id', CustomerController.update);
router.delete('/customer/:id', CustomerController.delete);

router.get('/payment_conditions', Payment_ConditionsController.index);
router.get('/payment_conditions/:id', Payment_ConditionsController.show);
router.post('/payment_conditions', Payment_ConditionsController.store);
router.put('/payment_conditions/:id', Payment_ConditionsController.update);
router.delete('/payment_conditions/:id', Payment_ConditionsController.delete);

module.exports = router;
