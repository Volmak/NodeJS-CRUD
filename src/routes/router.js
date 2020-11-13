const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const productsController = require('../controllers/Products');
router.get('/Products/', productsController.getAll);
router.get('/Products/:id', productsController.getById);
router.post('/Products/', productsController.post);
router.delete('/Products/:id', productsController.delete);
router.put('/Products/', productsController.put);
router.patch('/Products/', productsController.patch);
router.patch('/Products/:id', productsController.patchById);

const ordersController = require('../controllers/Orders');
router.get('/Orders/', ordersController.getAll);
router.get('/Orders/:id', ordersController.getById);
router.post('/Orders/', ordersController.post);
router.delete('/Orders/:id', ordersController.delete);
router.put('/Orders/', ordersController.put);
router.patch('/Orders/', ordersController.patch);
router.patch('/Orders/:id', ordersController.patchById);

const orderProductsController = require('../controllers/OrderProducts');
router.get('/Orders/:ordId/Products', orderProductsController.getAll);
router.get('/Orders/:ordId/Products/:prodId', orderProductsController.getById);
router.post('/Orders/:ordId/Products/', orderProductsController.addNewProduct);
router.post('/Orders/:ordId/Products/:prodId', orderProductsController.addExistingProduct);
router.delete('/Orders/:ordId/Products/:prodId', orderProductsController.delete.bind(orderProductsController));

module.exports = router;