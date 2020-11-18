const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(bodyParser.json());
router.use(cookieParser());

const AuthMW = require('../Middlewares/Auth');

const UserController = require('../controllers/User');
router.post('/login', UserController.login);

const productsController = require('../controllers/Products');
router.get('/Products/', productsController.getAll);
router.get('/Products/:id', productsController.getById);
router.post('/Products/', AuthMW.authenticate, productsController.post);
router.delete('/Products/:id', AuthMW.authenticate, productsController.delete);
router.put('/Products/', AuthMW.authenticate, productsController.put);
router.patch('/Products/', AuthMW.authenticate, productsController.patch);
router.patch('/Products/:id', AuthMW.authenticate, productsController.patchById);

const ordersController = require('../controllers/Orders');
router.get('/Orders/', AuthMW.authenticate, ordersController.getAll);
router.get('/Orders/:id', AuthMW.authenticate, ordersController.getById);
router.post('/Orders/', AuthMW.authenticate, ordersController.post);
router.delete('/Orders/:id', AuthMW.authenticate, ordersController.delete);
router.put('/Orders/', AuthMW.authenticate, ordersController.put);
router.patch('/Orders/', AuthMW.authenticate, ordersController.patch);
router.patch('/Orders/:id', AuthMW.authenticate, ordersController.patchById);

const orderProductsController = require('../controllers/OrderProducts');
router.get('/Orders/:ordId/Products', AuthMW.authenticate, orderProductsController.getAll);
router.get('/Orders/:ordId/Products/:prodId', AuthMW.authenticate, orderProductsController.getById);
router.post('/Orders/:ordId/Products/', AuthMW.authenticate, orderProductsController.addNewProduct);
router.post('/Orders/:ordId/Products/:prodId', AuthMW.authenticate, orderProductsController.addExistingProduct);
router.delete('/Orders/:ordId/Products/:prodId', AuthMW.authenticate, orderProductsController.delete);

module.exports = router;