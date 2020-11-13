const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

/* TODO: modify the router to work with any controller */
/* TODO: get rid of the binding. Controllers do not need to be classes. 
Unite the router and the controllers and use CrudController as utility tool? */
const ProductsController = require('../controllers/Products');
const productsController = new ProductsController();
router.get('/Products/', productsController.get.bind(productsController));
router.get('/Products/:id', productsController.get.bind(productsController));
router.post('/Products/', productsController.post.bind(productsController));
router.delete('/Products/:id', productsController.delete.bind(productsController));
router.put('/Products/', productsController.put.bind(productsController));
router.patch('/Products/', productsController.patch.bind(productsController));

const OrdersController = require('../controllers/Orders');
const ordersController = new OrdersController();
router.get('/Orders/', ordersController.get.bind(ordersController));
router.get('/Orders/:id', ordersController.get.bind(ordersController));
router.post('/Orders/', ordersController.post.bind(ordersController));
router.delete('/Orders/:id', ordersController.delete.bind(ordersController));
router.put('/Orders/', ordersController.put.bind(ordersController));
router.patch('/Orders/', ordersController.patch.bind(ordersController));

const OrderProductsController = require('../controllers/OrderProducts');
const orderProductsController = new OrderProductsController();
router.get('/Orders/:id/Products', orderProductsController.get.bind(orderProductsController));
router.get('/Orders/:id/Products/:relId', orderProductsController.get.bind(orderProductsController));
router.post('/Orders/:id/Products/', orderProductsController.post.bind(orderProductsController));
router.post('/Orders/:id/Products/:relId', orderProductsController.post.bind(orderProductsController));
router.delete('/Orders/:id/Products/:relId', orderProductsController.delete.bind(orderProductsController));

module.exports = router;