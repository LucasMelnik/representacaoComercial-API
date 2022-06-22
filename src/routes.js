/* eslint-disable linebreak-style */
const { Router } = require('express');
const AgeGroupController = require('./app/controllers/AgeGroupController');
const AuthController = require('./app/controllers/AuthController');
const GenderController = require('./app/controllers/GenderController');
const PermissionController = require('./app/controllers/PermissionController');
const ProductController = require('./app/controllers/ProductController');
const CommissionController = require('./app/controllers/CommissionController');
const ProductPriceController = require('./app/controllers/ProductPriceController');
const RefreshTokenController = require('./app/controllers/RefreshTokenController');
const RoleController = require('./app/controllers/RoleController');
const RolePermissionController = require('./app/controllers/RolePermissionController');
const SizeController = require('./app/controllers/SizeController');
const UserAccessControllController = require('./app/controllers/UserAccessControllController');
const UserController = require('./app/controllers/UserController');
const CustomerController = require('./app/controllers/CustomerController');
const PaymentConditionController = require('./app/controllers/PaymentConditionController');

// TODO: CREATE PERMISSIONS
// TODO: SET PERMISSIONS AT ROUTES
// TODO: PROBLEM WITH 'CAN'
const { authenticate } = require('./app/middlewares/authMiddleware');
const { can, is } = require('./app/middlewares/PermissionMiddleware');
const FactoryController = require('./app/controllers/FactoryController');
const OrderStatusController = require('./app/controllers/OrderStatusController');
const OrderController = require('./app/controllers/OrderController');
const OrderItemController = require('./app/controllers/OrderItemController');

const router = Router();

// ROLES
router.get('/roles', RoleController.index);
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
router.post('/users', authenticate, is('REPRESENTANTE'), UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', authenticate, is('REPRESENTANTE'), UserController.delete);
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
router.get('/genders/:id', GenderController.show);
router.post('/genders', GenderController.store);
router.put('/genders/:id', GenderController.update);
router.delete('/genders/:id', GenderController.delete);

// AGE GROUPS
router.get('/age-groups', authenticate, AgeGroupController.index);
router.get('/age-groups/:id', AgeGroupController.show);
router.post('/age-groups', AgeGroupController.store);
router.put('/age-groups/:id', AgeGroupController.update);
router.delete('/age-groups/:id', AgeGroupController.delete);

// PRODUCTS
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);
router.post('/products/:id/sizes', ProductController.addSize);

// COMMISSIONS
router.get('/commissions', CommissionController.index);
router.get('/commissions/:id', CommissionController.show);
router.post('/commissions', CommissionController.store);
router.put('/commissions/:id', CommissionController.update);
router.delete('/commissions/:id', CommissionController.delete);

// PRODUCT PRICES
router.get('/product-prices', ProductPriceController.index);
router.get('/product-prices/:id', ProductPriceController.show);
router.post('/product-prices', ProductPriceController.store);
router.put('/product-prices/:id', ProductPriceController.update);
router.delete('/product-prices/:id', ProductPriceController.delete);

// SIZES
router.get('/sizes', SizeController.index);
router.get('/sizes/:id', SizeController.show);
router.post('/sizes', SizeController.store);
router.put('/sizes/:id', SizeController.update);
router.delete('/sizes/:id', SizeController.delete);

// CUSTOMERS
router.get('/customers', CustomerController.index);
router.get('/customers/:id', CustomerController.show);
router.post('/customers', CustomerController.store);
router.put('/customers/:id', CustomerController.update);
router.delete('/customers/:id', CustomerController.delete);

// ORDER
router.get('/orders', OrderController.index);
router.get('/orders/:id', OrderController.show);
router.post('/orders', OrderController.store); // IF THE SELLER IS THE USER AUTHENTICATED, SET AUTHENTICATED METHOD
router.put('/orders/:id', OrderController.update);
router.delete('/orders/:id', OrderController.delete);

// ORDER ITEM
router.get('/order-items', OrderItemController.index);
router.get('/order-items/:id', OrderItemController.show);
router.post('/order-items', OrderItemController.store);
router.put('/order-items/:id', OrderItemController.update);
router.delete('/order-items/:id', OrderItemController.delete);

// ORDER STATUS
router.get('/order-status', OrderStatusController.index);
router.get('/order-status/:id', OrderStatusController.show);
router.post('/order-status', OrderStatusController.store);
router.put('/order-status/:id', OrderStatusController.update);
router.delete('/order-status/:id', OrderStatusController.delete);

// PAYMENT CONDITIONS
router.get('/payment-condition', PaymentConditionController.index);
router.get('/payment-condition/:id', PaymentConditionController.show);
router.post('/payment-condition', PaymentConditionController.store);
router.put('/payment-condition/:id', PaymentConditionController.update);
router.delete('/payment-condition/:id', PaymentConditionController.delete);

// FACTORY
router.get('/factories', FactoryController.index);
router.get('/factories/:id', FactoryController.show);
router.post('/factories', FactoryController.store);
router.put('/factories/:id', FactoryController.update);
router.delete('/factories/:id', FactoryController.delete);

module.exports = router;
